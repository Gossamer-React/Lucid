import React from 'react';
import GraphQLQuery from '../components/GraphQLQuery';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLData from '../components/GraphQLData';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQLContainer = ({ logs, schema }) => {

  return (
    <div id="graphql-container">
      {
        logs.length !== 0 ?
          <div>
            <div id='req-res'>
              <GraphQLQuery logs={logs} />
              <hr id="#vr-log" />
              <GraphQLResponse logs={logs} />
            </div>
            <hr />
            <GraphQLSchema logs={logs} schema={schema} />
            <GraphQLData logs={logs} />
          </div> :
          <h1>No requests have been made yet.</h1>
      }
    </div>
  )
}

export default GraphQLContainer;
