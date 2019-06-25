import { Howl, Howler } from 'howler'
import intro from '../assets/sounds/intro.webm'
import depth from '../assets/sounds/depth.webm'
import end from '../assets/sounds/end.webm'

import intro_mp3 from '../assets/sounds/intro.mp3'
import depth_mp3 from '../assets/sounds/depth.mp3'
import end_mp3 from '../assets/sounds/end.mp3'

class SoundManager {
  constructor() {
    this.currentSound = 0
    this.sounds = []
    this.soundShouldChange = false
    this.setSounds()
    this.listen()
  }

  listen() {
    window.addEventListener('sound:start', this.startSequence.bind(this))
    window.addEventListener('sound:next', this.changeSound.bind(this))
  }

  changeSound() {
    this.soundShouldChange = true
  }

  setSounds() {
    this.sounds = [
      new Howl({
        src: [intro, intro_mp3],
        loop: true,
        onend: this.onLoop.bind(this)
      }),
      new Howl({
        src: [depth, depth_mp3],
        loop: true,
        onend: this.onLoop.bind(this)
      }),
      new Howl({
        src: [end, end_mp3],
        loop: false,
        onend: this.onLoop.bind(this)
      })
    ]
  }

  onLoop() {
    if (this.soundShouldChange) {
      this.sounds[this.currentSound].stop()
      this.currentSound += 1
      this.sounds[this.currentSound].play()
      this.soundShouldChange = false
    }
  }

  startSequence() {
    this.sounds[this.currentSound].play()
  }
}

export default new SoundManager()
