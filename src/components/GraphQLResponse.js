import React from 'react';
import ReactJson from 'react-json-view';

const GraphQLResponse = (props) => {

  return (
    <div id='graphql-res' >
      {props.log
        ?
        <div className="graphql">
          <p className='graphql-p'><h2>Response:</h2></p>
          <span className='graphql-span'>
            <ReactJson
              src={props.log.res}
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
