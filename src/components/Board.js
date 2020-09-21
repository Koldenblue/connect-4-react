import React from "react";
import Space from "./Space"

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myState: null
    }
  }

  styles = {
    boardRow: {
    'height' :'100px',
    'marginTop' :'0',
    'padding' :'0',
    'position' : 'relative',
    'right' : '50px',
    }
  }


  rowArr = new Array(this.props.rows).fill(null);
  colArr = new Array(this.props.columns).fill(null);

  render() {
    return (
      <div>
        {this.rowArr.map((item) => (

          <div className='row' style={this.styles.boardRow}>
          {this.colArr.map((item) => (
            <Space />
          ))}
        </div>
        ))}
      </div>
    )
  }
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

//   /*** Checks the board array at the end of each turn to see if a player has won.
//    * @param {Board} board Board object needed to access boardArray
//    * @param {Position} newLocation The location where the new piece has been placed */
//   checkWin = (newPiece, playerColor) => {

//       // a connect 4 is possible in 4 directions - left-right, up-down, and diagonally each way
//       // Given that the new piece location is known, only the pieces surrounding the new piece need be checked.
//       // start at the new piece. subtract 3 from rows, columns, and rows and columns. then have to check row + 7, column +7,

//       // check for vertical wins:
//       let r = newPiece.row - 3;
//       r < 0 ? r = 0 : r = r;
//       let winCounter = 0;
//       for (r; r < ROWS; r++) {
//           if (this.boardArray[r][newPiece.column].color === playerColor) {
//               winCounter += 1;
//               console.log("win++")
//               if (winCounter === 4) {
//                   return true;
//               }
//           }
//           else {
//               winCounter = 0;
//           }
//       }

//       // check columns for horizontal wins:
//       let c = newPiece.column - 3;
//       c < 0 ? c = 0 : c = c;
//       winCounter = 0;
//       for (c; c < COLUMNS; c++) {
//           if (this.boardArray[newPiece.row][c].color === playerColor) {
//               winCounter += 1;
//               if (winCounter === 4) {
//                   return true;
//               }
//           }
//           else {
//               winCounter = 0;
//           }
//       }

//       // check for diagonal wins top left to bottom right
//       // first offset row and column by up to -3 from current position
//       r = newPiece.row;
//       c = newPiece.column;
//       let offsetCounter = 0;
//       while (r > 0 && c > 0 && offsetCounter < 3) {
//           r--;
//           c--;
//           offsetCounter++;
//       }
//       winCounter = 0;
//       for (r, c; r < ROWS && c < COLUMNS; r++, c++) {
//           if (this.boardArray[r][c].color === playerColor) {
//               winCounter += 1;
//               if (winCounter === 4) {
//                   return true;
//               }
//           }
//           else {
//               winCounter = 0;
//           }
//       }

//       // last check for diagonal wins, bottom left to top right
//       r = newPiece.row;
//       c = newPiece.column;
//       offsetCounter = 0;
//       // r < ROWS - 1 because max row is excluded
//       while (r < ROWS -1 && c > 0 && offsetCounter < 3) {
//           r++;
//           c--;
//           offsetCounter++;
//       }
//       winCounter = 0;
//       // r >= 0 because row 0 is included
//       for (r, c; r >= 0 && c < COLUMNS; r--, c++) {
//           if (this.boardArray[r][c].color === playerColor) {
//               winCounter += 1;
//               if (winCounter === 4) {
//                   return true;
//               }
//           }
//           else {
//               winCounter = 0;
//           }
//       }
//       return false;
//   }
// }