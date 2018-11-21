import React from 'react';

const QueryString = ({ logs }) => {
  
  // if (logs.length !== 0) {
  //   console.log('QueryString', logs[logs.length - 1].query);
  // }
  
  return (
    <div>
      <div>QueryString tab</div>
      { logs.length !== 0 ? <div>{logs[logs.length - 1].query}</div> : null }
    </div>
  )
}

export default QueryString;
