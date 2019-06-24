import React, { Component } from 'react'
import RAF from '../../core/raf'

import css from './index.module.css'

export default class AnimatedText extends Component {
  constructor(props) {
    super(props)

    this.time = 0
    this.string = this.props.children
    this.currentText = ''
    this.isPerforming = true

    this.state = {
      currentStep: 0
    }
  }

  componentDidMount() {
    RAF.add('animatedText', this.update.bind(this))
  }

  componentWillUnmount() {
    RAF.remove('animatedText')
  }

  update() {
    this.time++

    if (this.time % 5 === 0 && this.string[this.state.currentStep]) {
      if (this.string[this.state.currentStep] === '.') {
        this.currentText += '<br />'
      } else {
        this.currentText += this.string[this.state.currentStep]
      }
      this.setState({
        currentStep: this.state.currentStep + 1
      })
    } else if (this.isPerforming === true && !this.string[this.state.currentStep]) {
      this.isPerforming = false
      var event = new Event('text:ended')
      window.dispatchEvent(event)
    }
  }

  render() {
    const text = this.props.children
    return <p className={css.text} dangerouslySetInnerHTML={{ __html: this.currentText }} />
  }
}
