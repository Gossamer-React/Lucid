import React from 'react';

const GraphQLResponse = ({ logs }) => {

  let response = JSON.stringify(logs[logs.length - 1].res);
  console.log('--response:', response);
  
  return (
    <div id="graphql" >
      {logs.length !== 0
        ?
        <div className="graphql">
          <p className="graphql-p">
            <b>Response:</b> {response}
          </p>
        </div>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
