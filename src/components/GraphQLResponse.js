import React from 'react';

const GraphQLResponse = ({ logs }) => {

  let response = JSON.stringify(logs[logs.length - 1].res);
  console.log('--response:', response);
  
  return (
    <div>
      {logs.length !== 0
        ?
        <p className="query-p">
          <b>Response:</b> {response}
        </p>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
