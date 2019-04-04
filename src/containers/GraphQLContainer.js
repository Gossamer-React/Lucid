import React from 'react';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQLContainer = ({ logs, schema, log }) => {
  console.log('GraphQL Container');
  return (
    <div>
      {logs.length !== 0 ? (
        <div id='graphql-container'>
          <GraphQLResponse logs={logs} log={log} />
          <GraphQLSchema schema={schema} />
        </div>
      ) : (
          <h2>No requests have been made yet.</h2>
        )}
    </div>
  );
};

export default GraphQLContainer;
