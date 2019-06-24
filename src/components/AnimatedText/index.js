import React, { Component } from 'react'
import RAF from '../../core/raf'

export default class AnimatedText extends Component {
  constructor(props) {
    super(props)

    this.time = 0
    this.string = this.props.children
    this.currentText = ''

    this.state = {
      currentStep: 0
    }

    RAF.add('animatedText', this.update.bind(this))
  }

  componentWillUnmount() {
    RAF.remove('animatedText')
  }

  update() {
    this.time++

    if (this.time % 60 && this.string[this.state.currentStep]) {
      if (this.string[this.state.currentStep] === '.') {
        this.currentText += '<br />'
      } else {
        this.currentText += this.string[this.state.currentStep]
      }
      this.setState({
        currentStep: this.state.currentStep + 1
      })
    }
  }

  render() {
    const text = this.props.children
    return <p dangerouslySetInnerHTML={{ __html: this.currentText }} />
  }
}
