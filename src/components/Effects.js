import React from 'react';
import GraphQLServer from './GraphQLServer';
import GraphQLData from './GraphQLData';

const Effects = ({ logs }) => {
  
  // console.log('Effects', logs[logs.length - 1]);

  return (
    <div>
      <GraphQLServer />
      <GraphQLData logs={ logs } />
    </div>
  )
}

export default Effects;
