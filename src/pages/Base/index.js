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
  }

  render() {
    return (
      <div className={css.container}>
        <div>
          <AnimatedText>Hello.I'm Jonah Alle Monne.I'm french & I'm 22Years Old.I'm really in love with</AnimatedText>
          <div className={css.interactions}>Photography, music, programmation & computer graphics</div>
        </div>
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.textCTA}>
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
