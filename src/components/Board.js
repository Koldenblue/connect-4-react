// importing createRef function so we can get refs of components
import React, { createRef } from "react";
import Space from "./Space"
import WinBoard from "./WinBoard"
import RestartButton from "./RestartButton"


const util = require("util")

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.boardRef = createRef()
    this.state = {
      player1Turn: true,    // keeps track of current player
      color: 'red',         // the current player's color
      playerHasWon: null,   // set to the color of a player who has won
      emptySpacesLeft: this.props.rows * this.props.columns,     // number of spaces left until a tie occurs
      visible: true
    }

    // number of rows that a piece will fall
    // todo: also make a second piece for the background neutral
    // todo: have a piece bounce when it lands
    let rowsToFall = (this.props.rows * 100) + 'px'
    // first populate the row and column arrays with numbers 0-6 or 0-5
    this.populateColArr();
    this.populateRowArr();
  }


  // creating new arrays the size of rows and columns, so that they can be mapped to Spaces below
  rowArr = new Array(this.props.rows);
  colArr = new Array(this.props.columns);
  // adds in values to the array, 0 to array.length, to be used in the ids
  populateColArr = () => {
    for (let c = 0, j = this.colArr.length; c < j; c++) {
      this.colArr[c] = c;
    }
  }
  populateRowArr = () => {
    for (let r = 0, j = this.rowArr.length; r < j; r++) {
      this.rowArr[r] = r;
    }
  }


  // promisifying the setState method because it is asynchronous
  // otherwise the state gets returned before it gets set
  // which honestly works too, but this way makes sure the state is changed, then sent to the space, in order
  asyncState = util.promisify(this.setState);

  takeTurn = () => {
    return new Promise((resolve, reject) => {
      console.log("a", this.state)
      if (this.state.player1Turn) {
        this.asyncState({
          color: 'blue',
          player1Turn: !this.state.player1Turn
        }).then(() => {
          console.log("b", this.state)
          resolve(this.state.color);
        })
      }
      else {
        this.asyncState({
          color: 'red',
          player1Turn: !this.state.player1Turn
        }).then(() => {
          console.log("c", this.state)
          resolve(this.state.color);
        })
      }
      // here, this is logged before the state is actually changed!
      console.log("d", this.state)
      // resolve(this.state.color);
    })
  }

  findLowestFreeSpace = (spaceColor, col, row) => {
    let lowestRow = this.props.rows - 1;
    let emptySpace;
    let emptyRow;
    console.log(lowestRow);
    // for loop to find the space with the id element where the color is neutral
    for (let r = lowestRow; r >= 0; r--) {
      let myColor = (document.getElementById(`row-${r}-col-${col}`).style.backgroundColor)
      // if the color of the space is neutral, store that space as emptySpace, then break
      if (myColor === 'rgb(255, 231, 173)') {
        emptySpace = (document.getElementById(`row-${r}-col-${col}`));
        emptyRow = r;
        break;
      }
    }
    if (emptySpace) {
      this.takeTurn().then((color) => {
        emptySpace.style.backgroundColor = color;
        emptySpace.style.transition = 'transform 1s';
        emptySpace.style.transformStyle = 'preserve-3d';
        emptySpace.style.top = '-700px';
        emptySpace.style.transform = 'translateY(700px)';
        let won = this.checkWin(emptySpace, color, col, emptyRow)
        if (won) {
          console.log(`${color} won`)
          this.setState({
            playerHasWon: color,
            visible: false
          })
        }
      })
    }
  }

  styles = {
    boardRow: {
      'height': '100px',
      'marginTop': '0',
      'padding': '0',
      'position': 'relative',
      'right': '50px',
    }
  }

  /** Checks the board array at the end of each turn to see if a player has won. */
  // a connect 4 is possible in 4 directions - left-right, up-down, and diagonally each way
  // Given that the new piece location is known, only the pieces surrounding the new piece need be checked.
  // start at the new piece. subtract 3 from rows, columns, and rows and columns. then have to check row + 7, column +7,
  checkWin = (newSpace, playerColor, col, emptyRow) => {
    console.log(playerColor)
    // check for vertical wins:
    let r = emptyRow - 3;
    r < 0 ? r = 0 : r = r;
    let winCounter = 0;
    for (r; r < this.props.rows; r++) {
      if (document.getElementById(`row-${r}-col-${col}`).style.backgroundColor === playerColor) {
        winCounter += 1;
        console.log("win++")
        if (winCounter === 4) {
          return true;
        }
      }
      else {
        winCounter = 0;
      }
    }

    // check columns for horizontal wins:
    let c = col - 3;
    c < 0 ? c = 0 : c = c;
    winCounter = 0;
    for (c; c < this.props.columns; c++) {
      if (document.getElementById(`row-${emptyRow}-col-${c}`).style.backgroundColor === playerColor) {
        winCounter += 1;
        if (winCounter === 4) {
          return true;
        }
      }
      else {
        winCounter = 0;
      }
    }

    // check for diagonal wins top left to bottom right
    // first offset row and column by up to -3 from current position
    r = emptyRow;
    c = col;
    let offsetCounter = 0;
    while (r > 0 && c > 0 && offsetCounter < 3) {
      r--;
      c--;
      offsetCounter++;
    }
    winCounter = 0;
    for (r, c; r < this.props.rows && c < this.props.columns; r++, c++) {
      if (document.getElementById(`row-${r}-col-${c}`).style.backgroundColor === playerColor) {
        winCounter += 1;
        if (winCounter === 4) {
          return true;
        }
      }
      else {
        winCounter = 0;
      }
    }

    // last check for diagonal wins, bottom left to top right
    r = emptyRow;
    c = col;
    offsetCounter = 0;
    // r < ROWS - 1 because max row is excluded
    while (r < this.props.rows - 1 && c > 0 && offsetCounter < 3) {
      r++;
      c--;
      offsetCounter++;
    }
    winCounter = 0;
    // r >= 0 because row 0 is included
    for (r, c; r >= 0 && c < this.props.columns; r--, c++) {
      if (document.getElementById(`row-${r}-col-${c}`).style.backgroundColor === playerColor) {
        winCounter += 1;
        if (winCounter === 4) {
          return true;
        }
      }
      else {
        winCounter = 0;
      }
    }
    return false;
  }

  restart = () => {
    console.log("restarting")
    window.location.reload()
  }

  componentDidMount = () => {

  }

  // renders a row for each item in the row array. Then, inside each row, renders a Space for each item in the col array
  render() {
    // conditionally render the WinBoard
    let winDisp;
    if (this.state.playerHasWon) {
      winDisp = <WinBoard playerWhoWon={this.state.playerHasWon} />
    }

    // creating a ref here => so hopefully we can find the element by ref, instead of doc.getelem
    // may have to put spaces into an array, instead of the map being used below
    // instead of doc.getelem, may also have to lift state up
    const reference = this.boardRef.current
    console.log("ref is", reference)

    // conditionally render the Board
    let Board;
    // if (!this.state.playerHasWon) {
    Board = (
      this.rowArr.map((r) => (
        <div key={`row-${r}`} className='row' style={this.styles.boardRow}>
        <div className='col-sm-3'></div>
          {this.colArr.map((c) => (
            <Space
              // ref here to try and find the piece, instead of using document.getelement
              ref={this.boardRef}
              color={this.state.color}
              id={`row-${r}-col-${c}`}
              col={c}
              row={r}
              key={`row-${r}-col-${c}`}
              findLowestFreeSpace={this.findLowestFreeSpace}
              visible={this.state.visible}
            />
          ))}
        </div>
      ))
    )
    // }

    return (
      <main className='container'>
        <div className='row'>
          {winDisp}
        </div>
          {Board}
        <RestartButton
          restart={this.restart}
        />
      </main>
    )
  }
}

export default Board;