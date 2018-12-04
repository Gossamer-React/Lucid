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
          <div id='req-res'>
            <GraphQLRequest logs={logs} log ={log}/>
            <GraphQLResponse logs={logs} log ={log}/>
          </div>
          <hr />
          <GraphQLSchema schema={schema} />
        </div>
      ) : (
        <p>No requests have been made yet.</p>
      )}
    </div>
  );
};

export default GraphQLContainer;
