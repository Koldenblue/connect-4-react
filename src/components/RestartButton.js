import React from "react";

const RestartButton = (props) => {
  return (
    <button
      type='button'
      className='btn btn-success'
      onClick={props.restart}
    >
      Restart the game?
    </button>
  )
}

export default RestartButton;