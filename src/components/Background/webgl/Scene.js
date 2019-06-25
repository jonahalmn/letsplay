export default class Scene {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.height = window.innerHeight * 2
    this.canvas.width = window.innerHeight * 2

    this.canvas.style.height = window.innerHeight + 'px'
    this.canvas.style.width = window.innerHeight + 'px'

    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')

    this.positionAttribLoc = this.gl.getAttribLocation()
  }

  compileShader(type, src) {
    let shader = this.gl.createShader(type)
    this.gl.shaderSource(shader, src)
    this.gl.compileShader(shader)

    let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)

    if (success) {
      return shader
    }

    console.warn('cannot compile', this.gl.getShaderInfoLog(shader))
  }

  createProgram(v, f) {
    let program = this.gl.createProgram()
    this.gl.attachShader(program, v)
    this.gl.attachShader(program, f)
    this.gl.linkProgram(program)

    let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS)

    if (success) {
      return program
    }

    console.warn('cannot link', this.gl.getProgramInfoLog(program))
  }
}
