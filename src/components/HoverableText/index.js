import React, { Component } from 'react'

export default class HoverableText extends Component {
  componentDidMount() {
    this.refs.target.addEventListener('mouseenter', this.emitEnter.bind(this))
    this.refs.target.addEventListener('mouseleave', this.emitLeave.bind(this))
  }

  emitEnter() {
    console.log('enter')
    var event = new Event('image:see')
    event.imageKey = this.props.imageKey
    window.dispatchEvent(event)
  }

  emitLeave() {
    console.log('enter')
    var event = new Event('image:hide')
    window.dispatchEvent(event)
  }

  render() {
    return <span ref="target">{this.props.children}</span>
  }
}
