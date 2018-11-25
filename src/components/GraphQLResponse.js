import React from 'react';

const GraphQLResponse = ({ logs }) => {

  let response = logs[logs.length - 1].res;
  console.log('--response:', response);
  
  return (
    <div id="graphql" >
      {logs.length !== 0
        ?
        <div className="graphql">
          <b>Response:</b> 
          <pre className="graphql-p">
            {JSON.stringify(response, undefined, 2)}
          </pre>
        </div>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
