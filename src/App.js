import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      runs: 0,
      wins: 0,
      losses: 0
    }
  }
  zonk = () => {
    // Make the doors
    let doors = ['zonk','zonk','zonk']
    doors[Math.floor(Math.random() * 3)] = 'win!'

    // Choose a door
    const choice = Math.floor(Math.random() * 3)

    // Remove that door from the possible outcomes, because we're switching
    doors.splice(choice, 1)

    // Remove 1 zonk from remaining doors
    const zonk = doors.indexOf('zonk')
    doors.splice(zonk, 1)

    // Is the remaining door a zonk?
    const didwewin = doors[0] !== 'zonk'

    // Update the state
    this.updateWinRate(didwewin)
  }
  zonkSimple = () => {
    // When you boil down the maths, it's basically this simple:
    // Did you choose the right door from the start?  If so, you lose.
    const win = Math.floor(Math.random() * 3),
      choice = Math.floor(Math.random() * 3)

    this.updateWinRate(win !== choice)
  }
  updateWinRate = win => {
    let state = this.state
    if (win) {
      state.wins++
    } else {
      state.losses++
    }
    state.runs++
    this.setState(state)
  }
  componentDidMount() {
    this.keepZonking = setInterval(this.zonk, 100)
  }
  componentWillUnmount() {
    clearInterval(this.keepZonking)
  }
  render() {
    let rateClass = 'grey', rate = 0
    if (this.state.runs) {
      rate = Math.round((this.state.wins / this.state.runs) * 100)
      rateClass = rate > 50 ? 'green' : (rate === 50 ? 'grey' : 'red')
    }
    return (
      <div className="App">
        <header>
          <h1>Zonks!</h1>
        </header>
        <p>
          A simple test of the <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">Monty Hall Problem</a>.<br />
          Does switching doors give you a better percent chance of winning?
        </p>
        <div className="container">
          <div className="wins">Wins<br /><span>{this.state.wins}</span></div>
          <div className="losses">Losses<br /><span>{this.state.losses}</span></div>
        </div>
        <div className="percent">
          <span className={rateClass}>{rate}</span>% win rate
        </div>
      </div>
    );
  }
}

export default App;
