import React from "react";
import ReactJson from 'react-json-view';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const Log = props => {

  return (
    <div className="log">
      <p className="log-p">
        <b>Request:</b> {props.logId}
      </p>
      <p className="log-p">
        <b>Operation Name:</b> {props.operationName}
      </p>
      <p className="log-p">
        <b>Query:</b> 
        {/* <pre className='pre-json'>{props.query}</pre> */}
        <GraphqlCodeBlock
          className="GraphqlCodeBlock"
          queryBody={props.query}
        />
      </p>
      <p className="log-p">
        <b>Variables:</b> 
        {/* <pre className='pre-json'>{JSON.stringify(props.variables, null, 2)}</pre> */}
        <ReactJson 
          src={props.variables} 
          name={null}
          iconStyle='triangle' 
          indentWidth={2} 
          collapseStringsAfterLength={5} 
          enableClipboard={false}
          displayDataTypes={false}
        />
      </p>
    </div>
  );
};

export default Log;
