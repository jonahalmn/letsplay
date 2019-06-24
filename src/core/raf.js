class RAF {
  constructor() {
    this.methods = {}

    this.update()
  }

  add(name, f) {
    if (typeof f === 'function') {
      this.methods[name] = f
    }
  }

  remove(name) {
    delete this.methods[name]
  }

  update() {
    const keys = Object.keys(this.methods)
    keys.forEach(key => this.methods[key]())
    requestAnimationFrame(this.update.bind(this))
  }
}

export default new RAF()
