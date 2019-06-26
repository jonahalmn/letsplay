import React, { Component } from 'react'

export default class HoverableText extends Component {
  componentDidMount() {
    this.refs.target.addEventListener('mouseenter', this.emitEnter.bind(this))
    this.refs.target.addEventListener('mouseleave', this.emitLeave.bind(this))
  }

  emitEnter() {
    var event = new Event('image:see')
    event.imageKey = this.props.imageKey
    window.dispatchEvent(event)
  }

  emitLeave() {
    var event = new Event('image:hide')
    window.dispatchEvent(event)
  }

  render() {
    return (
      <span style={{ textDecoration: 'underline' }} ref="target">
        {this.props.children}
      </span>
    )
  }
}
