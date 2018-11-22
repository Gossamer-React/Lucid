import React from 'react';

const QueryResult = ({ logs }) => {

  let response = JSON.stringify(logs[logs.length - 1].res);
  
  return (
    <div>
      <div>QueryResult tab</div>
      { logs.length !== 0 ? <div>{response}</div> : null }
    </div>
  )
}

export default QueryResult;
