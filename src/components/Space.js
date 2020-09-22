import React from "react"
import "../styles/space.css"

class Space extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      
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
    boardSpace: {
      'border': '2px black solid',
      'backgroundColor': '#FFE7AD',
      'borderRadius': '50px',
      'marginTop':0,
      'padding':0,
      'height': '95px',
    }
  }

  changeColor = () => {
    (this.props.findLowestFreeSpace(this.styles.boardSpace["backgroundColor"], this.props.col, this.props.row))
  }

  render() {
    return (
      <div className='col-md-1' style={this.styles.boardColumn}>
        <div className='col-md-12 board-space' 
          id={this.props.id}
          style={this.styles.boardSpace}
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