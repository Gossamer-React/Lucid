import React from 'react';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQLContainer = ({ schema, log }) => {
  return (
    <div>
      {log ? (
        <div id='graphql-container'>
          <GraphQLResponse log={log} />
          <GraphQLSchema schema={schema} />
        </div>
      ) : (
          <h2>No requests have been made yet.</h2>
        )}
    </div>
  );
};

export default GraphQLContainer;
