import React from 'react';
import { buildClientSchema, printSchema } from 'graphql';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const GraphQLSchema = ({ logs, schema }) => {

  // let response = JSON.stringify(logs[logs.length - 1].res);

  if (schema !== 'GraphQL schema not available.') {

    let schemaObj = buildClientSchema(JSON.parse(schema));
    let schemaSDL = printSchema(schemaObj);
    console.log('--schemaObj:', schemaObj);
    console.log('--schemaSDL:', schemaSDL);

    return (
      <div id="graphql" >
        <div className="graphql">
          <b>Schema:</b> 
          {/* <pre className="graphql-p">
            {schemaSDL}
          </pre> */}
          <GraphqlCodeBlock
            className="GraphqlCodeBlock"
            queryBody={schemaSDL}
          />
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
