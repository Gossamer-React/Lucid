import React from 'react';
import { buildClientSchema } from 'graphql';
import Schema from './Schema';

const GraphQLSchema = ({ logs, schema }) => {

  let response = JSON.stringify(logs[logs.length - 1].res);
  let schemaObj = JSON.parse(schema);

  console.log('schemaObj', schemaObj);

  let typesArray = schemaObj.__schema.types;
  let schemaQueriesArray = typesArray[0].fields;
  let schemaMutationsArray = typesArray[4].fields;

  let schemaQueries = schemaQueriesArray.map((element, i) => {
    return (
      <Schema
        key={i}
        name={element.name}
        element={element}
        schemaObj={schemaObj}
      />
    );
  });

  let schemaMutations = schemaMutationsArray.map((element, i) => {
    return (
      <Schema
        key={i}
        name={element.name}
        element={element}
        schemaObj={schemaObj}
      />
    );
  });

  return (
    <div>
      <p className="schema-p">
        <b>Schema Queries:</b> {schemaQueries}
      </p>
      <p className="schema-p">
        <b>Schema Mutations:</b> {schemaMutations}
      </p>
    </div>
  )
}

export default GraphQLSchema;
