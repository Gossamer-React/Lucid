import React from 'react';
import { buildClientSchema, printSchema } from 'graphql';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const GraphQLSchema = ({ schema }) => {

  if (schema !== 'GraphQL schema not available.') {

    let schemaObj = buildClientSchema(JSON.parse(schema));
    let schemaSDL = printSchema(schemaObj);

    return (
      <div id='graphql-schema'>
        <div>
          <p className='graphql-p'><h2>Schema:</h2></p>
          <span className='graphql-span'>
            <GraphqlCodeBlock
              className='GraphqlCodeBlock'
              queryBody={schemaSDL}
            />
          </span>
        </div>
      </div>
    )

  } else {

    return (
      <div id='graphql'>
        <div>
          <p className='graphql-p'>
            No GraphQL data available.
          </p>
        </div>
      </div>
    )
  }
}

export default GraphQLSchema;
