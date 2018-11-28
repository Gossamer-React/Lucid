import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs }) => {

  return (
    <div id='stateDiff-container'>
      {stateDiffs.map((el, i) => {
        return (
          <div class='stateDiff-div' key={i}><pre>{JSON.stringify(el, null, 2)}</pre></div>
        )
      })}
    </div>
  )
}

export default StateContainer;