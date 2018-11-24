import React from 'react';
// import Schema from './Schema';

const GraphQLServer = ({ logs }) => {

<<<<<<< HEAD
  // let response = JSON.stringify(logs[logs.length - 1].res);
  // if (response.data.__schema) {
=======
  let response = JSON.stringify(logs[logs.length - 1].res);
  console.log('response', response)
  // if (response.data.__schema !== null) {
  // // if (Object.keys(response.data).includes('__schema')) {
>>>>>>> 0baffc9ad4f5020ef5dc4e53fbb9cd6756583ed5
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
<<<<<<< HEAD
      {/* <div>{schemaQueries}</div>
      <div>{schemaMutations}</div> */}
=======
      {/* {response.data.__schema ? <div>{schemaQueries}</div> : 'No schema available'}
      {response.data.__schema ? <div>{schemaMutations}</div> : 'No schema available'} */}
>>>>>>> 0baffc9ad4f5020ef5dc4e53fbb9cd6756583ed5
    </div>
  )
}

export default GraphQLServer;
