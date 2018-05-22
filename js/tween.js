var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var easing = {
  outQuad: function(step, target, duration) {
    return -target * step * (step - 2)
  },
  inQuad: function(step, target, duration) {
    return target * step * step
  },
  inOutQuad: function(step, target, duration) {
    if (step < 0.5) return easing.inQuad(step, target, duration)
    return easing.outQuad(step, target, duration)
  },
  linear: function(step, target, duration) {
    return target * step
  },
}
function defaults(a, b) {
  var result = {}
  for (var k in a) {
    result[k] = a[k]
  }
  for (var k in b) {
    if (result[k] === undefined) result[k] = b[k]
  }
  return result
}
/**
 * Represents a Tween. If we need to, we'll make this generic
 */
var Tween = /** @class */ (function() {
  function Tween(options) {
    if (options === void 0) {
      options = {}
    }
    this.currentStep = 0
    this.listeners = []
    this.isStopped = false
    this.options = defaults(options, Tween.defaults)
  }
  Tween.prototype.stop = function() {
    this.isStopped = true
    if (this.options.loop && this.options.onComplete) {
      this.options.onComplete()
    }
    return this
  }
  /**
   * The start value
   */
  Tween.prototype.start = function(val) {
    this.options.startValue = val
    return this
  }
  /**
   * The ending value
   */
  Tween.prototype.end = function(val) {
    this.options.endValue = val
    return this
  }
  /**
   * How long the tween runs for
   */
  Tween.prototype.duration = function(val) {
    this.options.duration = val
    return this
  }
  /**
   * How long to wait before starting
   */
  Tween.prototype.delay = function(val) {
    this.options.delay = val
    return this
  }
  /**
   * The easing function to use for tweening
   */
  Tween.prototype.easing = function(val) {
    this.options.easing = val
    return this
  }
  /**
   * Whether or not to loop the tween
   */
  Tween.prototype.loop = function(val) {
    if (val === void 0) {
      val = true
    }
    this.options.loop = val
    return this
  }
  Tween.prototype.onTick = function(callback) {
    this.listeners.push(callback)
    return this
  }
  Tween.prototype.execute = function(callback) {
    this.isStopped = false
    this.options.onComplete = callback
    this.startTime = this.options.now() + this.options.delay
    this.next()
    return this
  }
  Tween.prototype.next = function() {
    var _this = this
    this.options.timingFunction(function(now) {
      return _this._onTick(now)
    })
  }
  Tween.prototype._onTick = function(now) {
    var onComplete = this.options.onComplete
    // If the user manually stopped by calling .stop()
    if (this.isStopped) {
      if (typeof onComplete === 'function' && !this.options.loop) {
        onComplete()
      }
      return
    }
    var timeStep = Math.min(now - this.startTime, this.options.duration)
    this.currentValue =
      this.options.startValue +
      this.options.easing(
        timeStep / this.options.duration,
        this.options.endValue - this.options.startValue,
        this.options.duration,
      )
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i](this.currentValue, this.currentStep)
    }
    this.currentStep++
    if (timeStep === this.options.duration) {
      if (this.options.loop) {
        this.currentStep = 0
        return this.execute()
      }
      if (typeof onComplete === 'function') {
        onComplete()
      }
      return
    }
    this.next()
  }
  Tween.defaults = {
    duration: 300,
    delay: 0,
    loop: false,
    easing: easing.linear,
  }
  return Tween
})()

function createTween(options) {
  return new Tween(options)
}
var BrowserTween = (module.exports = /** @class */ (function(_super) {
  __extends(BrowserTween, _super)
  function BrowserTween(options) {
    if (options === void 0) {
      options = {}
    }
    var _this = this
    var now =
      'performance' in window
        ? performance.now.bind(performance)
        : (function(start) {
            return function() {
              return start - new Date().valueOf()
            }
          })(new Date().valueOf())
    _this =
      _super.call(
        this,
        defaults(options, {
          now: now,
          timingFunction:
            'requestAnimationFrame' in window
              ? requestAnimationFrame.bind(window)
              : function(callback) {
                  return setTimeout(function() {
                    return callback(now())
                  }, 0)
                },
        }),
      ) || this
    return _this
  }
  return BrowserTween
})(Tween))
module.exports.Easing = easing
