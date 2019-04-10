import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

const lengthsAreEqual = (prevProps, nextProps) => {
  if (prevProps.stateDiffs.length === nextProps.stateDiffs.length) return true;

  return false;
};

const StateContainer = ({ stateDiffs, clearLog }) => {
  return (
    <div id='stateDiff-container'>
      <div id='state-header'>
        <h2>State Log</h2>
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

export default React.memo(StateContainer, lengthsAreEqual);
