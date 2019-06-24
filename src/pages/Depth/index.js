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
          <AnimatedText>I just need to transmit.emotions with technology.Here is some of them</AnimatedText>
        </div>
        <InfiniteSkills />
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.textCTA}>
          Continueblablala <br />
          We should
          <button onClick={this.nextPage.bind(this)} className={css.playNow}>
            add depth
          </button>
        </div>
      </div>
    )
  }
}
