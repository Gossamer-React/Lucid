import React from 'react';

const GraphQLData = ({ logs }) => {

  let reqText = JSON.parse(logs[logs.length - 1].req.postData.text);
  console.log('reqText', reqText);
  let operationName = JSON.stringify(reqText.operationName);
  let variables = JSON.stringify(reqText.variables);
  let url = logs[logs.length - 1].req.url;
  let method = logs[logs.length - 1].req.method;

  return (
    <div>
      { logs.length !== 0 
      ? 
      <div className="details">
        <p className="details-p">
          <b>Operation Name:</b> {operationName}
        </p>
        <p className="details-p">
          <b>URL:</b> {url}
        </p>
        <p className="details-p">
          <b>Method:</b> {method}
        </p>
        <p className="details-p">
          <b>Variables:</b> {JSON.stringify(variables)}
        </p>
      </div>
      : 
      null }
    </div>
  )
}

export default GraphQLData;
