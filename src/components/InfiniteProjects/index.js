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
    if (this.refs.list) {
      this.setState({
        scroll: this.state.scroll - 1
      })
    }
  }

  render() {
    const scroll = this.refs.list ? (this.state.scroll % (this.refs.list.offsetWidth / 2)) - this.refs.list.offsetWidth / 2 : 0

    return (
      <div className={css.container}>
        <h1>For now, you can look 👀 at some of my projects</h1>
        <ul style={{ transform: `translate(${scroll}px, 0px)` }} ref="list" className={css.projectList}>
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a rel="noopener noreferrer" className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
                <p className={css.skillUsed}>{project.skills}</p>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a rel="noopener noreferrer" className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
                <p className={css.skillUsed}>{project.skills}</p>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a rel="noopener noreferrer" className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
                <p className={css.skillUsed}>{project.skills}</p>
              </li>
            )
          })}
          {projects.map((project, key) => {
            return (
              <li key={key} className={css.project}>
                <a rel="noopener noreferrer" className={css.projectLink} target="_blank" href={project.url}>
                  {project.name}
                </a>
                <p className={css.skillUsed}>{project.skills}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
