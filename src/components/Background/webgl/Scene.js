import v_shader from './glsl/index.vert'
import f_shader from './glsl/index.frag'

import image from '../../../assets/images/cgbig.jpg'
import photo from '../../../assets/images/image2.jpg'

import RAF from '../../../core/raf'

import { TweenLite, Power4 } from 'gsap'

let images = [{ key: 'cg', url: image, scale: 2 }, { key: 'photo', url: photo, scale: 1 }]

export default class Scene {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.height = window.innerHeight * 2
    this.canvas.width = window.innerWidth * 2

    this.canvas.style.height = window.innerHeight + 'px'
    this.canvas.style.width = window.innerWidth + 'px'

    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')

    this.v = this.compileShader(this.gl.VERTEX_SHADER, v_shader)
    this.f = this.compileShader(this.gl.FRAGMENT_SHADER, f_shader)

    this.program = this.createProgram(this.v, this.f)

    this.gl.useProgram(this.program)

    this.positionAttribLoc = this.gl.getAttribLocation(this.program, 'a_position')

    this.textureUniformLoc = this.gl.getUniformLocation(this.program, 'u_texture')
    this.scaleUniformLoc = this.gl.getUniformLocation(this.program, 'u_scale')
    this.scaleModelUniformLoc = this.gl.getUniformLocation(this.program, 'u_scaleModel')
    this.mouseUniformLoc = this.gl.getUniformLocation(this.program, 'u_mouseN')
    this.timeUniformLoc = this.gl.getUniformLocation(this.program, 'u_time')
    this.imageOpacityUniformLoc = this.gl.getUniformLocation(this.program, 'u_imageOpacity')
    this.transitionUniformLoc = this.gl.getUniformLocation(this.program, 'u_transition')
    this.transitionOpacityUniformLoc = this.gl.getUniformLocation(this.program, 'u_transitionOpacity')

    this.sendPositionData()
    this.imageFormats = {}
    this.imageFormat = { x: 0, y: 0 }
    this.mousePosition = { x: 0, y: 0 }
    this.texture = null
    this.textures = {}
    this.createTextures()

    this.time = 0
    this.scale = 2
    this.imageOpacity = 0

    this.transition = 0
    this.transitionOpacity = 0

    this.listen()
  }

  createTextures() {
    images.forEach(img => {
      let texture = this.loadTexture(img.url, img.key)
      this.textures[img.key] = { glTexture: texture, scale: img.scale }
    })

    this.texture = this.textures.cg.glTexture
  }

  start() {
    RAF.add('webgl', this.draw.bind(this))
  }

  pause() {
    RAF.remove('webgl')
  }

  listen() {
    this.mouseMoveHandler = this.onMouseMove.bind(this)
    this.imageChangeHandler = this.onImageChange.bind(this)
    this.imageQuitHandler = this.onImageQuit.bind(this)
    this.transitionHandler = this.onTransition.bind(this)
    window.addEventListener('mousemove', this.mouseMoveHandler)
    window.addEventListener('image:see', this.imageChangeHandler)
    window.addEventListener('image:hide', this.imageQuitHandler)
    window.addEventListener('gl:transition', this.transitionHandler)
    window.addEventListener('gl:pause', this.pause.bind(this))
    window.addEventListener('gl:start', this.start.bind(this))
  }

  unlisten() {
    window.removeEventListener('mousemove', this.mouseMoveHandler)
  }

  onImageChange(e) {
    this.texture = this.textures[e.imageKey].glTexture
    this.scale = this.textures[e.imageKey].scale
    this.imageFormat = this.imageFormats[e.imageKey]
    TweenLite.to(this, 0.2, { imageOpacity: 1 })
    //this.imageOpacity = 1
  }

  onImageQuit() {
    TweenLite.to(this, 0.2, { imageOpacity: 0 })
  }

  onMouseMove(e) {
    this.mousePosition.x = e.clientX
    this.mousePosition.y = e.clientY
  }

  onTransition(e) {
    switch (e.step) {
      case 0:
        TweenLite.to(this, 0.2, { transitionOpacity: 1 })
        break
      case 1:
        TweenLite.to(this, 0.2, { transitionOpacity: 1 })
        TweenLite.to(this, 1, { ease: Power4.easeOut, transition: 1, delay: 1 })
        break
      default:
        console.log('default b')
        break
    }

    setTimeout(() => {
      TweenLite.to(this, 0.2, { transitionOpacity: 0 })
    }, 2950)
  }

  createQuadData() {
    // prettier-ignore
    let data = [
        -1, -1,
        -1, 1,
        1, 1,

        1, 1,
        1, -1,
        -1, -1
      ]

    return data
  }

  loadTexture(url, key) {
    const texture = this.gl.createTexture()
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0
    const internalFormat = this.gl.RGBA
    const width = 1
    const height = 1
    const border = 0
    const srcFormat = this.gl.RGBA
    const srcType = this.gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([0, 0, 255, 255]) // opaque blue
    this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

    const image = new Image()
    image.onload = () => {
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
      this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)
      this.imageFormats[key] = { x: image.width, y: image.height }
      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        this.gl.generateMipmap(this.gl.TEXTURE_2D)
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)
      }
    }
    image.src = url

    return texture
  }

  dispose() {
    RAF.remove('webgl')
    this.unlisten()
  }

  sendPositionData() {
    let buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.createQuadData()), this.gl.STATIC_DRAW)

    this.gl.enableVertexAttribArray(this.positionAttribLoc)
    this.gl.vertexAttribPointer(this.positionAttribLoc, 2, this.gl.FLOAT, false, 0, 0)
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

  draw() {
    this.time++
    this.gl.activeTexture(this.gl.TEXTURE0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
    this.gl.uniform1f(this.textureUniformLoc, 0)

    this.gl.uniform2f(this.scaleUniformLoc, this.imageFormat.x / window.innerWidth, this.imageFormat.y / window.innerHeight)
    this.gl.uniform1f(this.timeUniformLoc, this.time)
    this.gl.uniform1f(this.scaleModelUniformLoc, this.scale)
    this.gl.uniform1f(this.imageOpacityUniformLoc, this.imageOpacity)
    this.gl.uniform2f(this.mouseUniformLoc, this.mousePosition.x / window.innerWidth, this.mousePosition.y / window.innerHeight)

    this.gl.uniform1f(this.transitionOpacityUniformLoc, this.transitionOpacity)
    this.gl.uniform1f(this.transitionUniformLoc, this.transition)

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
  }
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0
}
