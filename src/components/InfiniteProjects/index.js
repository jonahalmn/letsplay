import React, { Component } from 'react'
import projects from '../../data/projects'

import css from './index.module.css'
import RAF from '../../core/raf'

export default class InfiniteProjects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scroll: 0
    }
  }

  componentDidMount() {
    RAF.add('projects', this.update.bind(this))
  }

  componentWillUnmount() {
    RAF.remove('projects')
  }

  update() {
    // if (this.refs.list) {
    //   this.setState({
    //     scroll: ((this.state.scroll + 1) % this.refs.list.offsetWidth) - this.refs.list.offsetWidth
    //   })
    // }
  }

  render() {
    return (
      <div className={css.container}>
        <ul style={{ transform: `translate(${this.state.scroll}px, 0px)` }} ref="list" className={css.projectList}>
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
