import React from 'react';
import GraphQLServer from '../components/GraphQLServer';
import GraphQLData from '../components/GraphQLData';

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
