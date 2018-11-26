import React from 'react';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs }) => {

  return (
    <div id='state-container'>
      <pre>{JSON.stringify(stateDiffs, null, 2)}</pre>
    </div>
  )
}

export default StateContainer;