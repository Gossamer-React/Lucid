import React from 'react';
import GraphQLQuery from '../components/GraphQLQuery';
import GraphQLResponse from '../components/GraphQLResponse';
import GraphQLData from '../components/GraphQLData';
import GraphQLSchema from '../components/GraphQLSchema';

const Effects = ({ logs, schema }) => {
  
  return (
    <div>
      <GraphQLQuery logs={logs} />
      <GraphQLResponse logs={logs} />
      <GraphQLData logs={logs} />
      <GraphQLSchema logs={logs} schema={schema} />
    </div>
  )
}

export default Effects;
