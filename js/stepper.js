const EventEmitter = require('events').EventEmitter
const _ = require('lodash')

class Stepper extends EventEmitter {
  constructor(options = {}) {
    super()

    this.options = _.defaults(options, {
      numSteps: 1
    })

    this.step = 0
  }

  next() {
    if (this.step < this.options.numSteps - 1) {
      this.step++;
      this.emit('change');
    }

    return this
  }

  prev() {
    if (this.step > 0) {
      this.step--;
      this.emit('change');
    }

    return this
  }
}

module.exports = Stepper