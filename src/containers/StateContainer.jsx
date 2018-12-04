import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const StateContainer = ({ stateDiffs, clearLog }) => {
  return (
    <div id='stateDiff-container'>
      <div id='state-header'>
        <h2>State Changes</h2>
        <button
          className='appButton' 
          data-log='state-log'
          onClick={e => {
            clearLog(e);
          }}
        >
          Clear
        </button>
      </div>
      
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
                collapsed={1}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StateContainer;
