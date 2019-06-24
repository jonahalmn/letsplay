import React, { Component } from 'react'
import pages from '../pages'

import css from './styles/router.module.css'

export default class Router extends Component {
  constructor(props) {
    super(props)

    this.currentStep = 0

    this.state = {
      currentPage: pages[0],
      opacity: 1
    }

    this.listen()
  }

  listen() {
    window.addEventListener('page:next', this.nextPage.bind(this))
  }

  componentDidMount() {
    this.setState({
      currentPage: pages[this.currentStep]
    })
  }

  animateOut() {
    return new Promise(resolve => {
      this.setState({
        opacity: 0
      })
      setTimeout(resolve, 500)
    })
  }

  animateIn() {
    this.setState({
      opacity: 1
    })
  }

  async nextPage() {
    await this.animateOut()
    if (this.currentStep + 1 < pages.length) {
      this.currentStep += 1
      this.setState({
        currentPage: pages[this.currentStep]
      })
    }
    this.animateIn()
  }

  componentDidUpdate() {}

  render() {
    const Page = this.state.currentPage
    return (
      <div className={css.container} style={{ transition: 'all .3s', opacity: this.state.opacity }}>
        <Page />
      </div>
    )
  }
}
