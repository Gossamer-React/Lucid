import React from 'react';
import ReactJson from 'react-json-view';

const GraphQLResponse = ({ logs, log }) => {

  let response = log === null ? logs[logs.length - 1].res : log.res;

  return (
    <div id='graphql-res' >
      {logs.length !== 0
        ?
        <div className="graphql">
          <p className='graphql-p'><b>Response:</b></p>
          <span className='graphql-span'>
            <ReactJson
              src={response}
              name={null}
              iconStyle='triangle'
              indentWidth={1}
              collapsed={3}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
            />
          </span>
        </div>
        :
        null}
    </div>
  )
}

export default GraphQLResponse;
