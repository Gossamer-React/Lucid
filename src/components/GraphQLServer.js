import React from "react";
// import Schema from './Schema';

const GraphQLServer = ({ logs }) => {
  let response = JSON.stringify(logs[logs.length - 1].res);
  console.log("response", response);

  return (
    <div>
      <div>GraphQLServer tab</div>
      {/* {response.data.__schema ? <div>{schemaQueries}</div> : 'No schema available'}
      {response.data.__schema ? <div>{schemaMutations}</div> : 'No schema available'} */}
    </div>
  );
};

export default GraphQLServer;
