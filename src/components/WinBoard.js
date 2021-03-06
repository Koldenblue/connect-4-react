import React from "react"
import { Animated } from "react-animated-css";

/** The "player has won" display */
class WinBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerWhoWon: null,
      animationIn: "bounceInDown"
    }
    console.log("animation", this.state.animationIn)
  }


  styles = {
    winStyle: {
      'backgroundColor': 'white',
      'fontSize': '5em',
      'position': 'fixed',
      borderRadius: '20px'
    }
  }

  render() {
    return (
      <>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <Animated animationIn={this.state.animationIn} isVisible={true} style={this.styles.winStyle}>
            {this.props.playerWhoWon} has won!!!!
          </Animated>
        </div>
        <div className='col-md-3'></div>
      </>
    )
  }
}

export default WinBoard;