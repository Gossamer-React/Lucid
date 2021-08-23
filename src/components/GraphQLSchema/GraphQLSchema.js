import React from 'react';
import { buildClientSchema, printSchema } from 'graphql/utilities';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import styles from './GraphQLSchema.css';

const GraphQLSchema = ({ schema }) => {

  if (schema !== 'GraphQL schema not available.') {

    let schemaObj = buildClientSchema(JSON.parse(schema));
    let schemaSDL = printSchema(schemaObj);

    return (
      <div id='graphql-schema'>
        <div>
          <h2 className='graphql-heading'>Schema:</h2>
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
