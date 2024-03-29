import React, { Component } from 'react'
import css from './index.module.css'
import RAF from '../../core/raf'

import AnimatedText from '../../components/AnimatedText'

export default class Home extends Component {
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

  update() {}

  render() {
    return (
      <div className={css.container}>
        <div>
          <h1>
            <AnimatedText>I think.We could make a project together</AnimatedText>
          </h1>
          <button style={{ opacity: this.state.textEnded ? 1 : 0 }} className={css.play} onClick={this.nextPage.bind(this)}>
            Start our first project
          </button>
        </div>
      </div>
    )
  }
}
