import React from 'react';
import QueryString from './QueryString';
import QueryResult from './QueryResult';
import QueryDetails from './QueryDetails';
import GraphQLServer from './GraphQLServer';

const GraphQLData = ({ logs }) => {
  
  return (
    <div>
      <QueryString logs={ logs } />
      <QueryResult logs={ logs } />
      <QueryDetails logs={ logs } />
      <GraphQLServer logs={ logs } />
    </div>
  )
}

export default GraphQLData;
