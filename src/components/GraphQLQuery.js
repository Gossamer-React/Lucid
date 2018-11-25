import React from 'react';

const GraphQLQuery = ({ logs }) => {
  
  let query = JSON.parse(logs[logs.length - 1].req.postData.text).query;
  
  return (
    <div id="graphql" >
      { logs.length !== 0 
      ? 
        <div className="graphql">
          <p className="graphql-p">
            <b>Query:</b> {query}
          </p>
        </div>
      : 
      null }
    </div>
  )
}

export default GraphQLQuery;
