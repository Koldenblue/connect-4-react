import React from "react"

class WinBoard extends React.Component {
  state = {
    playerWhoWon: null,
  }

  styles = {
    winStyle: {
      'backgroundColor' : 'white',
      'fontSize': '5em'
    }
  }

  render() {
    return (
      <section style={this.styles.winStyle}>
        {this.props.playerWhoWon} has won!!!!
      </section>
    )
  }
}

export default WinBoard;