import React, { Component } from 'react'
import css from './index.module.css'

import Scene from './webgl/Scene'

export default class Background extends Component {
  constructor(props) {
    super(props)
    this.scene = new Scene()
  }

  componentDidMount() {
    this.refs.target.appendChild(this.scene.canvas)
  }

  componentWillUnmount() {
    this.scene.dispose()
  }

  render() {
    return <div ref="target" className={css.container} />
  }
}
