import React from 'react';

const QueryString = ({ logs }) => {
  
  let query = JSON.parse(logs[logs.length - 1].req.postData.text).query;
  
  return (
    <div>
      <div>QueryString tab</div>
      { logs.length !== 0 ? <div>{query}</div> : null }
    </div>
  )
}

export default QueryString;
