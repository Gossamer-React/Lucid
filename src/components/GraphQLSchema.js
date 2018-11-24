import React from 'react';
import { buildClientSchema, printSchema } from 'graphql';

const GraphQLSchema = ({ logs, schema }) => {

  // let response = JSON.stringify(logs[logs.length - 1].res);
  let schemaObj = JSON.parse(schema);

  console.log('--schemaObj:', schemaObj);
  console.log('--schemaSDL:', printSchema(buildClientSchema(schemaObj)));

  return (
    <div>
      <p className="schema-p">
        <b>Schema:</b> {JSON.stringify(printSchema(buildClientSchema(schemaObj)))}
      </p>
    </div>
  )
}

export default GraphQLSchema;
