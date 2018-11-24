import React from 'react';
import GraphQLQuery from '../components/GraphQLQuery';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLData from '../components/GraphQLData';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQL = ({ logs, schema }) => {
  
  return (
<<<<<<< HEAD
    <div>
      {/* <GraphQLQuery logs={logs} /> */}
      <GraphQLResponse logs={logs} />
      {/* <GraphQLData logs={logs} /> */}
=======
    <div id="graphql-container">
      <GraphQLQuery logs={logs} />
      <hr id="graphql-hr" />
      <GraphQLResponse logs={logs} />
      <hr id="graphql-hr" />
      <GraphQLData logs={logs} />
      <hr id="graphql-hr" />
>>>>>>> cc8d15fb6a81634fc8b7094510aaf0f2a1dddff6
      <GraphQLSchema logs={logs} schema={schema} />
    </div>
  )
}

export default GraphQL;
