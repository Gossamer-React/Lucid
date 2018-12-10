import React from 'react';
import Log from './../components/Log/Log.jsx';

const LogContainer = props => {
  let logs = props.logs.map((log, i) => {
    let text = JSON.parse(log.req.postData.text);
    return (
      <Log
        key={i}
        operationName={text.operationName}
        query={text.query}
        variables={text.variables}
        logId={i}
        logChange={props.logChange}
      />
    );
  });

  logs.reverse();
  return (
    <div>
      {logs.length > 0 ? (
        <div id='log-container'>
          <div id='log-header'>
            <h2>Request Log</h2>
            <button className='appButton' data-log='req-log' onClick={(e) => { props.clearLog(e); }}>Clear</button>
          </div>
          <div id='logs'>{logs}</div>
        </div>
      ) : ('')}
    </div>
  );
};

export default LogContainer;
