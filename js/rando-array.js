module.exports = (array, length) => {
  const randoArray = []
  const didPick = {}
  let randI

  while (randoArray.length < length) {
    do {
      randI = parseInt(Math.random() * array.length - 1)
    } while (randI in didPick)

    didPick[randI] = true
    randoArray.push(array[randI])
  }

  return randoArray
}