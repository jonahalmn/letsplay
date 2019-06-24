import React, { Component } from 'react'
import RAF from '../../core/raf'
import AnimatedText from '../../components/AnimatedText'
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

    var soundEvent = new Event('sound:start')
    window.dispatchEvent(soundEvent)
  }

  render() {
    return (
      <div className={css.container}>
        <AnimatedText>
          I think that.Humans are like music.Both Music & Humans.Can be described as multiples layers.We are going to discover it together
        </AnimatedText>
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.cta}>
          <button onClick={this.nextPage.bind(this)} className={css.playNow}>
            Let's create our music
          </button>
          <p>(You should use your headphones)</p>
        </div>
      </div>
    )
  }
}
