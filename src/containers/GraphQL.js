import React from 'react';
import GraphQLQuery from '../components/GraphQLQuery';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLData from '../components/GraphQLData';
import GraphQLSchema from '../components/GraphQLSchema';
import styles from '../../public/graphql.css';

const GraphQL = ({ logs, schema }) => {
  
  return (
    <div id="graphql-container">
      <GraphQLQuery logs={logs} />
      <hr id="graphql-hr" />
      <GraphQLResponse logs={logs} />
      <hr id="graphql-hr" />
      <GraphQLData logs={logs} />
      <hr id="graphql-hr" />
      <GraphQLSchema logs={logs} schema={schema} />
    </div>
  )
}

export default GraphQL;
