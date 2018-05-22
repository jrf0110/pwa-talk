require('impress.js')
const EventEmitter = require('events').EventEmitter
var hljs = require('highlight.js')
const Easing = require('./tween').Easing
const Tween = require('./tween')

const slideEmitter = new EventEmitter()
const presentation = window.impress()

hljs.initHighlightingOnLoad()

let pingPongShouldRun = true
let pingPongTween
let slide
let $slide
document.addEventListener('DOMContentLoaded', () => {
  presentation.init()

  Array.prototype.slice
    .call(document.querySelectorAll('.chart-label-y'))
    .forEach(el => {
      el.style.marginTop = `${-parseInt(el.offsetWidth / 2)}px`
    })

  const onHashChange = () => {
    if (slide) {
      slideEmitter.emit(`${slide}:exit`, $slide)
    }

    pingPongShouldRun = false

    if (pingPongTween && pingPongTween.stop) {
      pingPongTween.stop()
      pingPongTween = undefined
    }

    slide = window.location.hash.substring(2)
    $slide = document.getElementById(slide)

    Array.prototype.slice
      .call($slide.querySelectorAll('video[autoplay]') || [])
      .forEach(el => {
        el.currentTime = 0
        el.play()
      })

    slideEmitter.emit(slide, $slide)
  }

  window.addEventListener('hashchange', onHashChange)

  onHashChange()
})

slideEmitter.on('slide-what-are-they-1', $el => {
  if (pingPongTween && pingPongTween.stop) {
    pingPongTween.stop()
    pingPongTween = undefined
  }

  pingPongShouldRun = true

  const $container = $el.querySelector('.laundry-list')
  $container.scrollTop = 0
  $container.scrollLeft = 0

  function ping() {
    pingPongTween = new Tween()
      .duration(21 * 1000)
      .start(0)
      .end($container.scrollHeight)
      .easing(Easing.inOutQuad)
      .onTick(v => ($container.scrollTop = v))
      .execute(() => pingPongShouldRun && setTimeout(pong, 2000))
  }

  function pong() {
    pingPongTween = new Tween()
      .duration(21 * 1000)
      .end(0)
      .start($container.scrollHeight)
      .easing(Easing.inOutQuad)
      .onTick(v => ($container.scrollTop = v))
      .execute(() => pingPongShouldRun && setTimeout(ping, 2000))
  }

  ping()
})
