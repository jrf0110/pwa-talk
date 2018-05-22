const _ = require('lodash')

const normalize = (x, MIN, MAX) => (x - MIN) / (MAX - MIN)
const denormalize = (x, MIN, MAX) => x * (MAX - MIN) + MIN

const normalizeObj = (x, min, max) => {
  return Object
    .keys(x)
    .map(k => ({ [k]: normalize(x[k], min[k], max[k]) }))
    .reduce((item, result) => Object.assign(result, item))
}

const flattenObj = (obj, prefix = '') => {
  const result = {}

  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      Object.assign(result, flattenObj(obj[k], `${k}.`))
    } else {
      result[`${prefix}${k}`] = obj[k]
    }
  }

  return result
}

const unFlattenObj = (obj, delimeter = '.') => {
  const result = {}

  for (const key in obj) {
    _.set(result, key, obj[key])
  }

  return result
}

const normalizeSet = set => {
  const min = {}
  const max = {}

  for (let k in set[0]) {
    min[k] = Infinity
    max[k] = -Infinity
  }

  for (let i = set.length - 1, k; i >= 0; i--) {
    for (k in set[i]) {
      if (set[i][k] < min[k]) min[k] = set[i][k]
      else if (set[i][k] > max[k]) max[k] = set[i][k]
    }
  }

  return {
    set: set.map(x => normalizeObj(x, min, max)),
    min,
    max,
  }
}

const Distance = {
  euclidean: (x1, x2) => {
    return Math.sqrt(
      Object
        .keys(x1)
        .map(k => {
          if (typeof x1[k] === 'object') {
            return Distance.euclidean(x1[k], x2[k])
          } else {
            return x1[k] - x2[k]
          }
        })
        .map(v => Math.pow(v, 2))
        .reduce((a, b) => a + b)
    )
  },

  taxicab: (x1, x2) => {
    return Object
      .keys(x1)
      .map(k => {
        if (typeof x1[k] === 'object') {
          return Distance.taxicab(x1[k], x2[k])
        } else {
          return Math.abs(x1[k] - x2[k])
        }
      })
      .reduce((a, b) => a + b, 0)
  }
}

const knn = (set, solveFor) => {
  set = set.map(obj => flattenObj(obj))

  const normalizedSet = normalizeSet(set)
  
  normalizedSet.set = normalizedSet.set.map(obj => {
    Object.assign(obj, {
      lat_lng: { x: obj['lat_lng.x'], y: obj['lat_lng.y'] }
    })

    delete obj['lat_lng.x']
    delete obj['lat_lng.y']

    return obj
  })

  const sortFn = (a, b)=> a.distance > b.distance ? 1 : -1

  return (k, x1, distanceAlg) => {
    distanceAlg = distanceAlg || 'euclidean'

    const normalizedX1 = unFlattenObj(
      normalizeObj(flattenObj(x1), normalizedSet.min, normalizedSet.max)
    )

    const distancizer = x2 => Object.assign({
      distance: Distance[distanceAlg](normalizedX1, x2)
    }, x2)

    let closest = Array.apply(null, Array(k))
      .map((undef, i) => distancizer(normalizedSet.set[i]))
      .sort(sortFn)

    let x2

    for (let i = k; i < normalizedSet.set.length; i++) {
      x2 = distancizer(normalizedSet.set[i])

      if (closest.some(closeX => x2.distance < closeX.distance)) {
        closest.pop()
        closest.push(x2)
        closest = closest.sort(sortFn)
      }
    }

    const normalizedResult = closest
      .map(property => property[solveFor])
      .reduce((solveField, total) => solveField + total) / k 

    return denormalize(
      normalizedResult,
      normalizedSet.min.price,
      normalizedSet.max.price
    )
  }
}

module.exports = knn