import React from "react"
import { Animated } from "react-animated-css";

class WinBoard extends React.Component {
  state = {
    playerWhoWon: null,
  }

  styles = {
    winStyle: {
      'backgroundColor' : 'white',
      'fontSize': '5em',
      'position': 'fixed'
    }
  }

  render() {
    return (
      <Animated animationIn={this.state.animationIn} isVisible={true} style={this.styles.winStyle}>
        {this.props.playerWhoWon} has won!!!!
      </Animated>
    )
  }
}

export default WinBoard;