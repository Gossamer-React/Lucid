import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs }) => {

  return (
    <div id='state-container'>
      <pre>{JSON.stringify(stateDiffs, null, 2)}</pre>
      {/* <ReactJson src={stateDiffs} /> */}
    </div>
  )
}

export default StateContainer;