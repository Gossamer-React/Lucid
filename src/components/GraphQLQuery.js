import React from 'react';

const GraphQLQuery = ({ logs }) => {
  
  let query = JSON.parse(logs[logs.length - 1].req.postData.text).query;
  
  return (
    <div>
      { logs.length !== 0 
      ? 
        <p className="query-p">
          <b>Query:</b> {query}
        </p>
      : 
      null }
    </div>
  )
}

export default GraphQLQuery;
