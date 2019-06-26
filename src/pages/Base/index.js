import React, { Component } from 'react'
import RAF from '../../core/raf'
import AnimatedText from '../../components/AnimatedText'
import HoverableText from '../../components/HoverableText'
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

  componentDidMount() {
    var eventG = new Event('gl:start')
    window.dispatchEvent(eventG)

    var event = new Event('gl:transition')
    event.step = 0
    window.dispatchEvent(event)
    this.setState({
      titleOpacity: 1
    })

    setTimeout(() => {
      var eventG = new Event('gl:pause')
      window.dispatchEvent(eventG)
      this.setState({
        titleOpacity: 0
      })
    }, 3500)
  }

  componentWillUnmount() {
    window.removeEventListener('text:ended', this.textEndHandler)
  }

  onTextEnd() {
    var eventG = new Event('gl:start')
    window.dispatchEvent(eventG)
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

  render() {
    return (
      <div className={css.container}>
        <div style={{ opacity: this.state.titleOpacity }} className={css.title}>
          1 - The Base
        </div>
        <div>
          <AnimatedText delay={3500}>Hello 👋.I'm Jonah Alle Monne.I'm french & I'm 22 years old.I'm really in love with</AnimatedText>
          <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.interactions}>
            <HoverableText imageKey="photo">Photography</HoverableText> , <HoverableText imageKey="music">music</HoverableText>,{' '}
            <HoverableText imageKey="code">programmation</HoverableText> & <HoverableText imageKey="cg">computer graphics</HoverableText>
          </div>
        </div>
        <div style={{ opacity: this.state.displayCTA ? 1 : 0 }} className={css.textCTA}>
          Now we have the basics <br />
          We should
          <button onClick={this.nextPage.bind(this)} className={css.playNow}>
            add depth
          </button>
        </div>
      </div>
    )
  }
}
