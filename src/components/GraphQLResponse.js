import React from 'react';
import ReactJson from 'react-json-view';

const GraphQLResponse = ({ logs }) => {

  let response = logs[logs.length - 1].res;
  console.log('--response:', response);

  return (
    <div id='graphql-res' >
      {logs.length !== 0
        ?
        <div className='graphql'>
          <b>Response:</b>
          <p>
            <ReactJson
              src={response}
              name={null}
              iconStyle='triangle'
              indentWidth={2}
              enableClipboard={false}
            />
          </p>
        </div>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
