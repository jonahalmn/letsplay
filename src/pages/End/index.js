import React, { Component } from 'react'
import RAF from '../../core/raf'
import AnimatedText from '../../components/AnimatedText'
import InfiniteSkills from '../../components/infiniteSkills'
import InfiniteProjects from '../../components/InfiniteProjects'
import css from './index.module.css'

export default class Experience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textEnded: false
    }

    this.textEndHandler = this.onTextEnd.bind(this)

    window.addEventListener('text:ended', this.textEndHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('text:ended', this.textEndHandler)
  }

  onTextEnd() {
    setTimeout(() => {
      this.setState({
        textEnded: true,
        titleOpacity: 0
      })
    }, 200)
  }

  nextPage() {
    var event = new Event('page:next')
    window.dispatchEvent(event)
  }

  componentDidMount() {
    var event = new Event('gl:transition')
    event.step = 2
    window.dispatchEvent(event)

    this.setState({
      titleOpacity: 1
    })

    setTimeout(() => {
      this.setState({
        titleOpacity: 0
      })
    }, 3000)
  }

  render() {
    return (
      <div className={css.container}>
        <div style={{ opacity: this.state.titleOpacity }} className={css.title}>
          3 - We made it !
        </div>
        <div>
          <AnimatedText delay={3500}>
            Now, you can listen.To the music we’ve made together.I’m exited, it’s our first project together.Maybe we can
          </AnimatedText>
          <a className={css.link} style={{ opacity: this.state.textEnded ? 1 : 0 }} href="mailto:jonah.allemonne@icloud.com">
            create something else
          </a>
        </div>
        <div style={{ opacity: this.state.textEnded ? 1 : 0 }}>
          <InfiniteProjects />
        </div>
      </div>
    )
  }
}
