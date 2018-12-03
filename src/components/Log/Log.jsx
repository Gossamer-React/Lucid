import React from 'react';
import ReactJson from 'react-json-view';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const Log = props => {
  return (
    <div className='log'>
      <button onClick={() => {props.logChange(props.logId)}}>view</button>
      <p className='log-p'>
        <b>Request:</b> {props.logId}
      </p>
      <p className='log-p'>
        <b>Operation Name:</b> {props.operationName}
      </p>
      <p className='log-p'>
        <b>Query:</b>
        <GraphqlCodeBlock
          className='GraphqlCodeBlock log-span'
          queryBody={props.query}
        />
      </p>
      <p className='log-p'>
        <b>Variables:</b>
        <span className='log-span'>
          <ReactJson
            src={props.variables}
            name={null}
            iconStyle='triangle'
            indentWidth={1}
            enableClipboard={false}
            displayDataTypes={false}
          />
        </span>
      </p>
    </div>
  );
};

export default Log;
