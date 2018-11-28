import React from 'react';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const GraphQLQuery = ({ logs }) => {
  
  let query = JSON.parse(logs[logs.length - 1].req.postData.text).query;
  console.log('query', query);
  
  return (
    <div id="graphql" >
      { logs.length !== 0 
      ? 
        <div className="graphql">
          <b>Query:</b> 
          {/* <pre className="graphql-p">
            {query}
          </pre> */}
          <GraphqlCodeBlock
            className="GraphqlCodeBlock"
            queryBody={query}
          />
        </div>
      : 
      null }
    </div>
  )
}

export default GraphQLQuery;
