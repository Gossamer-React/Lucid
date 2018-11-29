import React from 'react';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import ReactJson from 'react-json-view';

const GraphQLRequest = ({ logs }) => {
  let req = JSON.parse(logs[logs.length - 1].req.postData.text);
  let query = req.query;
  let variables = req.variables;
  let operation = req.operationName;
  let url = logs[logs.length - 1].req.url;
  let method = logs[logs.length - 1].req.method;

  return (
    <div id='graphql'>
      {logs.length !== 0 ? (
        <div className='graphql'>
          <p className='graphql-p'>
            <b>Request:</b>
          </p>
          <p className='graphql-p'>
            <b>URL:</b> {url}
          </p>
          <p className='graphql-p'>
            <b>Method:</b> {method}
          </p>
          <p className='graphql-p'>
            <b>Operation Name: {operation ? operation : null}</b>
          </p>
          <p className='graphql-p'>
            <b>Query:</b>
          </p>
          <GraphqlCodeBlock className='GraphqlCodeBlock graphql-span' queryBody={query} />
          <p className='graphql-p'><b>Variables:</b></p>
          <span className='graphql-span'>
            <ReactJson
              src={variables}
              name={null}
              iconStyle='triangle'
              indentWidth={1}
              collapseStringsAfterLength={5}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default GraphQLRequest;
