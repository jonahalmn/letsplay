import React, { Component } from 'react'
import RAF from '../../core/raf'
import AnimatedText from '../../components/AnimatedText'
import InfiniteSkills from '../../components/infiniteSkills'
import css from './index.module.css'

export default class Experience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textEnded: false
    }

    this.textEndHandler = this.onTextEnd.bind(this)

    window.addEventListener('text:ended', this.textEndHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('text:ended', this.textEndHandler)
  }

  onTextEnd() {
    this.setState({
      textEnded: true
    })
  }

  nextPage() {
    var event = new Event('page:next')
    window.dispatchEvent(event)
  }

  render() {
    return (
      <div className={css.container}>
        <div>
          <AnimatedText>Now, you can listen.To the music we’ve made together.I’m exited, it’s our first project together.Maybe we can.create something else</AnimatedText>
        </div>
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.textCTA}>
        With some simple things<br />
        We can
        </div>
      </div>
    )
  }
}
