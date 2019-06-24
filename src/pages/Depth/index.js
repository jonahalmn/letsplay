import React, { Component } from 'react'
import RAF from '../../core/raf'
import AnimatedText from '../../components/AnimatedText'
import InfiniteSkills from '../../components/infiniteSkills'
import css from './index.module.css'

export default class Experience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textEnded: false,
      displayCTA: false,
      titleOpacity: 0
    }

    this.textEndHandler = this.onTextEnd.bind(this)

    window.addEventListener('text:ended', this.textEndHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('text:ended', this.textEndHandler)
  }

  onTextEnd() {
    setTimeout(() => {
      this.setState({
        textEnded: true
      })
    }, 200)

    setTimeout(() => {
      this.setState({
        displayCTA: true
      })
    }, 2000)
  }

  nextPage() {
    var event = new Event('page:next')
    window.dispatchEvent(event)

    var soundEvent = new Event('sound:next')
    window.dispatchEvent(soundEvent)
  }

  componentDidMount() {
    this.setState({
      titleOpacity: 1
    })

    setTimeout(() => {
      this.setState({
        titleOpacity: 0
      })
    }, 3000)
  }

  render() {
    return (
      <div className={css.container}>
        <div style={{ opacity: this.state.titleOpacity }} className={css.title}>
          2 - Let's go deeper
        </div>
        <div>
          <AnimatedText delay={3500}>I just need to transmit.emotions with technology.Here is some of them</AnimatedText>
        </div>
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.infinite}>
          <InfiniteSkills />
        </div>
        <div style={{ opacity: this.state.displayCTA ? 1 : 0 }} className={css.textCTA}>
          With some simple things
          <br />
          We can
          <button onClick={this.nextPage.bind(this)} className={css.playNow}>
            construct projects
          </button>
        </div>
      </div>
    )
  }
}
