import React from 'react';
// import Schema from './Schema';

const GraphQLServer = ({ logs }) => {

  // let response = JSON.stringify(logs[logs.length - 1].res);
  // if (response.data.__schema) {
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
      {/* <div>{schemaQueries}</div>
      <div>{schemaMutations}</div> */}
    </div>
  )
}

export default GraphQLServer;
