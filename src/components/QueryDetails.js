import React from 'react';

const QueryDetails = ({ logs }) => {

  let reqText = JSON.parse(logs[logs.length - 1].req.postData.text);
  console.log('reqText', reqText);
  let operationName = JSON.stringify(reqText.operationName);
  let variables = JSON.stringify(reqText.variables);
  let url = logs[logs.length - 1].req.url;
  let method = logs[logs.length - 1].req.method;

  return (
    <div>
      <div>QueryDetails tab</div>
        { logs.length !== 0 ? 
        <div>
          <div>operation name: {operationName}</div>
          <div>url: {url}</div>
          <div>method: {method}</div>
          <div>variables: {variables}</div>
        </div> : 
        null }
    </div>
  )
}

export default QueryDetails;
