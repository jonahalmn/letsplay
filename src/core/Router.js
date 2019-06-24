import React, { Component } from 'react'
import pages from '../pages'

export default class Router extends Component {
  constructor(props) {
    super(props)

    this.currentStep = 0

    this.state = {
      currentPage: pages[0]
    }
  }

  componentDidMount() {
    this.setState({
      currentPage: pages[this.currentStep]
    })
  }

  nextPage() {
    if (this.currentStep + 1 < pages.length) {
      this.currentStep += 1
      this.setState({
        currentPage: pages[this.currentStep]
      })
    }
  }

  componentDidUpdate() {}

  render() {
    const Page = this.state.currentPage
    return <Page />
  }
}
