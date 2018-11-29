import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs }) => {

  return (
    <div id='stateDiff-container'>
      {stateDiffs.map((el, i) => {
        return (
          <ReactJson
            className='stateDiff-div'
            key={i}
            src={el}
            name={null}
            iconStyle='triangle'
            indentWidth={2}
            groupArraysAfterLength={20}
            enableClipboard={false}
            collapsed={2}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        )
      })}
    </div>
  )
}

export default StateContainer;