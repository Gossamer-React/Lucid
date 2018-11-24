import React from 'react';
import { buildClientSchema, printSchema } from 'graphql';

const GraphQLSchema = ({ logs, schema }) => {

  // let response = JSON.stringify(logs[logs.length - 1].res);
  let schemaObj = JSON.parse(schema);

  console.log('--schemaObj:', schemaObj);
  console.log('--schemaSDL:', printSchema(buildClientSchema(schemaObj)));

  return (
    <div id="graphql" >
      <div className="graphql">
        <p className="graphql-p">
          <b>Schema:</b> {JSON.stringify(printSchema(buildClientSchema(schemaObj)))}
        </p>
      </div>
    </div>
  )
}

export default GraphQLSchema;
