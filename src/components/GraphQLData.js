import React from 'react';
import ReactJson from 'react-json-view';

const GraphQLData = ({ logs }) => {

  let reqText = JSON.parse(logs[logs.length - 1].req.postData.text);
  console.log('--reqText:', reqText);
  let variables = reqText.variables;
  let url = logs[logs.length - 1].req.url;
  let method = logs[logs.length - 1].req.method;

  return (
    <div id="graphql-details" >
      { logs.length !== 0 
      ? 
        <div className="graphql">
          <p className="graphql-p">
            <b>URL:</b> {url}
          </p>
          <p className="graphql-p">
            <b>Method:</b> {method}
          </p>
          <p className="graphql-p">
            <b>Variables:</b> 
            <ReactJson
              src={variables}
              name={null}
              iconStyle='triangle'
              indentWidth={1}
              collapseStringsAfterLength={5}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </p>
        </div>
      : 
      null }
    </div>
  )
}

export default GraphQLData;
