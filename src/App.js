import React from 'react'
import logo from './logo.svg'
import './App.css'
import Router from './core/Router'
import SoundManager from './core/SoundManager'
import Background from './components/Background'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.router = React.createRef()
  }

  nextPage() {
    this.router.current.nextPage()
  }

  render() {
    return (
      <div className="masterApp">
        <div className="frame" />
        <Background />
        <Router ref={this.router} />
        {/* <button onClick={this.nextPage.bind(this)}>Next</button> */}
      </div>
    )
  }
}

export default App
