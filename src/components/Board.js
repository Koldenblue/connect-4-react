import React from "react";
import Space from "./Space"
const util = require("util")

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1Turn: true,
      color: 'red',
    }

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
      console.log(this.state)
      if (this.state.player1Turn) {
        this.asyncState({ 
          color: 'blue',
          player1Turn: !this.state.player1Turn
        }).then(() => {
          resolve(this.state.color);
        })
      }
      else {
        this.asyncState({
          color: 'red',
          player1Turn: !this.state.player1Turn
        }).then(() => {
          resolve(this.state.color);
        })
      }
      console.log(this.state)
      // resolve(this.state.color);
    })
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

  componentDidMount = () => {
    console.log(this.state)
  }

  // /*** Checks the board array at the end of each turn to see if a player has won.
  // * @param {Board} board Board object needed to access boardArray
  // * @param {Position} newLocation The location where the new piece has been placed */
  // checkWin = (newPiece, playerColor) => {
  //   // a connect 4 is possible in 4 directions - left-right, up-down, and diagonally each way
  //   // Given that the new piece location is known, only the pieces surrounding the new piece need be checked.
  //   // start at the new piece. subtract 3 from rows, columns, and rows and columns. then have to check row + 7, column +7,

  //   // check for vertical wins:
  //   let r = newPiece.row - 3;
  //   r < 0 ? r = 0 : r = r;
  //   let winCounter = 0;
  //   for (r; r < ROWS; r++) {
  //     if (this.boardArray[r][newPiece.column].color === playerColor) {
  //       winCounter += 1;
  //       console.log("win++")
  //       if (winCounter === 4) {
  //         return true;
  //       }
  //     }
  //     else {
  //       winCounter = 0;
  //     }
  //   }

  //   // check columns for horizontal wins:
  //   let c = newPiece.column - 3;
  //   c < 0 ? c = 0 : c = c;
  //   winCounter = 0;
  //   for (c; c < COLUMNS; c++) {
  //     if (this.boardArray[newPiece.row][c].color === playerColor) {
  //       winCounter += 1;
  //       if (winCounter === 4) {
  //         return true;
  //       }
  //     }
  //     else {
  //       winCounter = 0;
  //     }
  //   }

  //   // check for diagonal wins top left to bottom right
  //   // first offset row and column by up to -3 from current position
  //   r = newPiece.row;
  //   c = newPiece.column;
  //   let offsetCounter = 0;
  //   while (r > 0 && c > 0 && offsetCounter < 3) {
  //     r--;
  //     c--;
  //     offsetCounter++;
  //   }
  //   winCounter = 0;
  //   for (r, c; r < ROWS && c < COLUMNS; r++, c++) {
  //     if (this.boardArray[r][c].color === playerColor) {
  //       winCounter += 1;
  //       if (winCounter === 4) {
  //         return true;
  //       }
  //     }
  //     else {
  //       winCounter = 0;
  //     }
  //   }

  //   // last check for diagonal wins, bottom left to top right
  //   r = newPiece.row;
  //   c = newPiece.column;
  //   offsetCounter = 0;
  //   // r < ROWS - 1 because max row is excluded
  //   while (r < ROWS - 1 && c > 0 && offsetCounter < 3) {
  //     r++;
  //     c--;
  //     offsetCounter++;
  //   }
  //   winCounter = 0;
  //   // r >= 0 because row 0 is included
  //   for (r, c; r >= 0 && c < COLUMNS; r--, c++) {
  //     if (this.boardArray[r][c].color === playerColor) {
  //       winCounter += 1;
  //       if (winCounter === 4) {
  //         return true;
  //       }
  //     }
  //     else {
  //       winCounter = 0;
  //     }
  //   }
  //   return false;
  // }


  // renders a row for each item in the row array. Then, inside each row, renders a Space for each item in the col array
  render() {
    return (
      <div>
        {this.rowArr.map((r) => (
          <div key={`row-${r}`} className='row' style={this.styles.boardRow}>
            {this.colArr.map((c) => (
              <Space
                color={this.state.color}
                id={`row-${r}-col-${c}`}
                key={`row-${r}-col-${c}`}
                takeTurn={this.takeTurn}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }


  /** This function is called after the function is rendered */
  // componentDidMount() {
  //   this.populateRowArr();
  //   this.populateColArr();
  //   console.log(this.rowArr)
  // }
}

export default Board;



// class oldBoard {
//   constructor(rows, columns) {
//       this.rows = rows;
//       this.columns = columns;
//       // board array is a 2D array, where there are ROWS indices, and each row array has COLUMNS number of columns.
//       // So boardArray[rows][columns]
//       this.boardArray = [];
//       this.idList = [];

//       // for each board space (class='board-space') add an id. Board spaces in the html will be in the order of 
//       // row 0 col 0, row 0 col 1, row 0 col 2, etc.
//       let spaces = document.getElementsByClassName('board-space');
//       let spaceNum = 0;

//       for (let r = 0; r < this.rows; r++) {
//           let rowArray = [];
//           for (let c = 0; c < this.columns; c++) {
//               // add a nullpiece for each column in the row
//               // console.log("spaces[spacenum] is " + spaces[spaceNum]);
//               let nullPiece = new Piece(r, c, null);
//               // can access any piece row with myBoard.boardArray[0][0].position.row
//               rowArray.push(nullPiece);

//               // add an id to each class="board-space" in the html
//               spaces[spaceNum].setAttribute("id", "row-" + r + "-col-" + c);
//               spaces[spaceNum].setAttribute("data-row", r);
//               spaces[spaceNum].setAttribute("data-column", c);

//               // also add the id names to an array
//               this.idList.push("row-" + r + "-col-" + c);

//               // next add an event listener to each empty class=board-space
//               spaces[spaceNum].addEventListener("click", (event) => {
//                   // console.log(this)
//                   // console.log(event.target)
//                   let targetSpace = event.target;
//                   let targetColumn = Number(targetSpace.getAttribute("data-column"));
//                   // console.log(targetColumn)
//                   this.move(targetColumn);
//               });
//               spaceNum++;
//           }
//           // put the row array, consisting of the 7 column spaces, into the 2D board array
//           this.boardArray.push(rowArray);
//       }
//   }

//   /** moves a piece. If move is invalid, return false. 
//    * targetColumn is assigned by the event listener created in the Board constructor, and depends on the space clicked.*/
//   move = (targetColumn) => {
//       // arrow function binds board object to this function
//       console.log("you clicked " + this);

//       // run turn function upon board click
//       if (player1Turn) {
//           player1.turn(targetColumn, this, player1);
//       }
//       else {
//           player2.turn(targetColumn, this, player2);
//       }
//       // pass appropriate col parameter to turn function, along with current player and the board state
//   }


// }