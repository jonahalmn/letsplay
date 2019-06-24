import React, { Component } from 'react'
import css from './index.module.css'
import RAF from '../../core/raf'

import AnimatedText from '../../components/AnimatedText'

export default class Home extends Component {
  constructor(props) {
    super(props)

    RAF.add('home', this.update.bind(this))
  }

  componentWillUnmount() {
    RAF.remove('home')
  }

  nextPage() {
    var event = new Event('page:next')
    window.dispatchEvent(event)
  }

  update() {
    console.log('updating')
  }

  render() {
    return (
      <div className={css.container}>
        <div>
          <h1>
            <AnimatedText>I think.We could play together</AnimatedText>
          </h1>
          <button className={css.play} onClick={this.nextPage.bind(this)}>
            Play with me
          </button>
        </div>
      </div>
    )
  }
}
