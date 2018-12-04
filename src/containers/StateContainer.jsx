import React from 'react';
import ReactJson from 'react-json-view';
import styles from '../../public/stateContainer.css';

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

              {/* <div key={i}>
                <div><b>{el.component}: </b>{Object.keys(el.oldState)[0]}</div>
                <div><b>Old: </b>{el.oldState[Object.keys(el.oldState)[0]]}</div>
                  {/* <ReactJson
                  src={el.oldState[Object.keys(el.oldState)[0]]}
                  name={null}
                  iconStyle='triangle'
                  indentWidth={1}
                  groupArraysAfterLength={20}
                  enableClipboard={false}
                  collapsed={1}
                  displayDataTypes={false}
                  displayObjectSize={false}
                  /> */}
                <div><b>New: </b>{el.newState[Object.keys(el.newState)[0]]}</div>
                  {/* <ReactJson
                  src={el.newState[Object.keys(el.newState)[0]]}
                  name={null}
                  iconStyle='triangle'
                  indentWidth={1}
                  groupArraysAfterLength={20}
                  enableClipboard={false}
                  collapsed={1}
                  displayDataTypes={false}
                  displayObjectSize={false}
                  /> */}
              </div> */}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StateContainer;
