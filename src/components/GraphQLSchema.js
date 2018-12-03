import React from 'react';
import { buildClientSchema, printSchema } from 'graphql';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const GraphQLSchema = ({ schema }) => {

  if (schema !== 'GraphQL schema not available.') {

    let schemaObj = buildClientSchema(JSON.parse(schema));
    let schemaSDL = printSchema(schemaObj);
    console.log('--schemaObj:', schemaObj);
    console.log('--schemaSDL:', schemaSDL);

    return (
      <div id='graphql-schema'>
        <div className='graphql'>
          <p className='graphql-p'><b>Schema:</b></p>
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
        <div className='graphql'>
          <p className='graphql-p'>
            No GraphQL data available.
          </p>
        </div>
      </div>
    )
  }
}

export default GraphQLSchema;
