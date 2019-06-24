import React, { Component } from 'react'
import skills from '../../data/skills.js'
import css from './index.module.css'

import RAF from '../../core/raf'

export default class InfiniteSkills extends Component {
  constructor(props) {
    super(props)

    this.state = {
      strings: [],
      scroll: [0, 0, 0]
    }
    this.strings = []
  }

  componentDidMount() {
    RAF.add('infinite', this.update.bind(this))
    this.setTextes()
  }

  componentWillUnmount() {
    RAF.remove('infinite')
  }

  update() {
    if (this.refs.skillsdiv0) {
      console.log(this.refs.skillsdiv0.offsetWidth)
      console.log(((this.state.scroll[0] + 1) % (this.refs.skillsdiv0.offsetWidth)))
    
    this.setState({
      scroll: [
        ((this.state.scroll[0] + 1) % (this.refs.skillsdiv0.offsetWidth)) - (this.refs.skillsdiv0.offsetWidth),
        ((this.state.scroll[1] - 1) % (this.refs.skillsdiv1.offsetWidth)) - (this.refs.skillsdiv1.offsetWidth),
        ((this.state.scroll[2] + 1) % (this.refs.skillsdiv2.offsetWidth)) - (this.refs.skillsdiv2.offsetWidth),
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
                <div style={{ transform: `translate(${scroll}px, 0px)` }}>
                  {string}
                </div>
                <div style={{ transform: `translate(${scroll}px, 0px)` }}>{string}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
