import React from 'react';

const QueryDetails = ({ logs }) => {

  let url = JSON.parse(logs[logs.length - 1].req.postData.text).url;
  let method = JSON.parse(logs[logs.length - 1].req.postData.text).method;

  return (
    <div>
      <div>QueryDetails tab</div>
        { logs.length !== 0 ? 
        <div>
          <div>url: {url}</div>
          <div>method: {method}</div>
        </div> : 
        null }
    </div>
  )
}

export default QueryDetails;
