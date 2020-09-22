import React from "react"
import "../styles/space.css"

class Space extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      boardSpace: {
        'border': '2px black solid',
        'backgroundColor': '#FFE7AD',
        'borderRadius': '50px',
        'marginTop':0,
        'padding':0,
        'height': '95px',
      }
    }
  }

  styles = {
    boardColumn: {
      'backgroundImage': 'linear-gradient(to bottom left, #FCC85F, #F3752B)',
      'border': '2px black solid',
      'marginTop': 0,
      'padding': 0,
      'borderRadius': '8px'
      },
    
  }

  changeColor = () => {
    // if this space is a neutral color
    if (this.props.findLowestFreeSpace(this.state.boardSpace["backgroundColor"], this.props.col, this.props.row)) {
      // then set the state to blue or red, depending on turn
      // this.props.takeTurn().then(color => {
      //   this.setState({
      //     boardSpace: {
      //       'border': '2px black solid',
      //       'backgroundColor': color,
      //       'borderRadius': '50px',
      //       'marginTop':0,
      //       'padding':0,
      //       'height': '95px'
      //     }
      //   })
      // })
    }
    // else we have to change the state of a different space
  }

  render() {
    return (
      <div className='col-md-1' style={this.styles.boardColumn}>
        <div className='col-md-12 board-space' 
          id={this.props.id}
          style={this.state.boardSpace}
          onClick={this.changeColor}
          col={this.props.col}
          row={this.props.row}
        >

        </div>
      </div>
    )
  }
}

export default Space;