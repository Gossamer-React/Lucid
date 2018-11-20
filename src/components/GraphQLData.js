import React from 'react';
import QueryString from './QueryString';
import QueryResult from './QueryResult';

const GraphQLData = ({ logs }) => {

  console.log('GraphQLData', logs[logs.length - 1]);
  
  return (
    <div>
      <QueryString logs={ logs } />
      <QueryResult />
    </div>
  )
}

export default GraphQLData;
