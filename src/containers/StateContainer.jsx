import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs }) => {

  return (
    <div id='stateDiff-container'>
      {stateDiffs.map((el, i) => {
        return (
          <div className='stateDiff-div'>
            <span className='state-span'>
              <ReactJson
                key={i}
                src={el}
                name={null}
                iconStyle='triangle'
                indentWidth={1}
                groupArraysAfterLength={20}
                enableClipboard={false}
                collapsed={2}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default StateContainer;