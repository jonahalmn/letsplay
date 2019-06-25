import React, { Component } from 'react'
import skills from '../../data/skills.js'
import css from './index.module.css'
import { TweenLite } from 'gsap'

import RAF from '../../core/raf'

export default class InfiniteSkills extends Component {
  constructor(props) {
    super(props)

    this.state = {
      strings: [],
      scroll: [0, 0, 0]
    }
    this.speed = 10
    this.strings = []

    this.textEndHandler = this.onTextEnd.bind(this)

    window.addEventListener('text:ended', this.textEndHandler)
  }

  onTextEnd() {
    TweenLite.to(this, 4, { speed: 1 })
  }

  componentDidMount() {
    RAF.add('infinite', this.update.bind(this))
    this.setTextes()
  }

  componentWillUnmount() {
    RAF.remove('infinite')
    window.removeEventListener('text:ended', this.textEndHandler)
  }

  update() {
    if (this.refs.skillsdiv0) {
      this.setState({
        scroll: [
          ((this.state.scroll[0] + this.speed) % this.refs.skillsdiv0.offsetWidth) - this.refs.skillsdiv0.offsetWidth,
          ((this.state.scroll[1] - this.speed) % this.refs.skillsdiv1.offsetWidth) - this.refs.skillsdiv1.offsetWidth,
          ((this.state.scroll[2] + this.speed) % this.refs.skillsdiv2.offsetWidth) - this.refs.skillsdiv2.offsetWidth
        ]
      })
    }
  }

  setTextes() {
    let strings = []
    skills.forEach(skillsList => {
      let string = ''
      skillsList.forEach(skill => {
        string += `${skill} - `
      })
      strings.push(string)
    })

    console.log('strings', strings)
    this.setState({
      strings: strings
    })
  }

  logDivs() {}

  render() {
    return (
      <div className={css.container}>
        <ul>
          {this.state.strings.map((string, key) => {
            const scroll = this.state.scroll[key]
            return (
              <li className={css.skills} key={key}>
                <div ref={`skillsdiv${key}`} style={{ transform: `translate(${scroll}px, 0px)` }}>
                  {string}
                </div>
                <div style={{ transform: `translate(${scroll}px, 0px)` }}>{string}</div>
                <div style={{ transform: `translate(${scroll}px, 0px)` }}>{string}</div>
                <div style={{ transform: `translate(${scroll}px, 0px)` }}>{string}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
