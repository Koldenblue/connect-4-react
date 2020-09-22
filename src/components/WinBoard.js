import React from "react"

class WinBoard extends React.Component {
  state = {
    playerWhoWon: null,
    displayState: 'none'
  }

  styles = {
    winStyle: {
      'display': this.state.displayState,
      'backgroundColor' : 'white',
      'fontSize': '5em'
    }
  }

  render() {
    return (
      <section>
        {this.props.playerWhoWon} has won!!!!
      </section>
    )
  }
}

export default WinBoard;