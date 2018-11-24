import React from 'react';

const GraphQLData = ({ logs }) => {

  let reqText = JSON.parse(logs[logs.length - 1].req.postData.text);
  console.log('--reqText:', reqText);
  let variables = JSON.stringify(reqText.variables);
  let url = logs[logs.length - 1].req.url;
  let method = logs[logs.length - 1].req.method;

  return (
    <div id="graphql" >
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
            <b>Variables:</b> {JSON.stringify(variables)}
          </p>
        </div>
      : 
      null }
    </div>
  )
}

export default GraphQLData;
