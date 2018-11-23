import React from 'react';
import Schema from './Schema';

const GraphQLServer = ({ logs }) => {

  let response = JSON.stringify(logs[logs.length - 1].res);
  console.log('response', response)
  // if (response.data.__schema !== null) {
  // // if (Object.keys(response.data).includes('__schema')) {
  //   let typesArray = JSON.stringify(logs[logs.length - 1].res.data.__schema.types);
  //   let schemaQueriesArray = typesArray[0].fields;
  //   let schemaMutationsArray = typesArray[4].fields;

  //   let schemaQueries = schemaQueriesArray.map((q, i) => {
  //     return (
  //       <Schema
  //         key={i}
  //         name={q.name}
  //       />
  //     );
  //   });

  //   let schemaMutations = schemaMutationsArray.map((m, i) => {
  //     return (
  //       <Schema
  //         key={i}
  //         name={m.name}
  //       />
  //     );
  //   });
  // }

  return (
    <div>
      <div>GraphQLServer tab</div>
      {/* {response.data.__schema ? <div>{schemaQueries}</div> : 'No schema available'}
      {response.data.__schema ? <div>{schemaMutations}</div> : 'No schema available'} */}
    </div>
  )
}

export default GraphQLServer;
