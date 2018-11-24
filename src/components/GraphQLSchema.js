import React from 'react';
<<<<<<< HEAD
import { buildClientSchema } from 'graphql';
=======
import { buildClientSchema, printSchema } from 'graphql';
>>>>>>> cc8d15fb6a81634fc8b7094510aaf0f2a1dddff6

const GraphQLSchema = ({ logs, schema }) => {

  // let response = JSON.stringify(logs[logs.length - 1].res);

  if (schema !== 'GraphQL schema not available.') {

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

  } else {
    
    return (
      <div id="graphql" >
        <div className="graphql">
          <p className="graphql-p">
            No GraphQL data available.
          </p>
        </div>
      </div>
    )
  }
}

export default GraphQLSchema;
