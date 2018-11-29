import React from 'react';
import GraphQLRequest from '../components/GraphQLRequest';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQLContainer = ({ logs, schema }) => {
  return (
    <div id='graphql-container'>
      {logs.length !== 0 ? (
        <div>
          <div id='req-res'>
            <GraphQLRequest logs={logs} />
            <GraphQLResponse logs={logs} />
          </div>
          <hr />
          <GraphQLSchema logs={logs} schema={schema} />
        </div>
      ) : (
        <h1>No requests have been made yet.</h1>
      )}
    </div>
  );
};

export default GraphQLContainer;
