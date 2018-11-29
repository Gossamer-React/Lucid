import React from 'react';
import ReactJson from 'react-json-view';

const GraphQLResponse = ({ logs }) => {

  let response = logs[logs.length - 1].res;
  console.log('--response:', response);
  
  return (
    <div id="graphql" >
      {logs.length !== 0
        ?
        <div className="graphql">
          <b>Response:</b> 
          <ReactJson
            src={response}
            name={null}
            iconStyle='triangle'
            indentWidth={1}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </div>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
