import React from 'react';
import GraphQLRequest from '../components/GraphQLRequest';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQLContainer = ({ logs, schema, log }) => {
  return (
    <div id='graphql-container'>
      {logs.length !== 0 ? (
        <div>
          <GraphQLResponse logs={logs} log={log} />
          <GraphQLSchema schema={schema} />
        </div>
      ) : (
          <h1>No requests have been made yet.</h1>
        )}
    </div>
  );
};

export default GraphQLContainer;
