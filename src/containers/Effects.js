import React from 'react';
import GraphQLData from '../components/GraphQLData';

const Effects = ({ logs }) => {
  
  // console.log('Effects', logs[logs.length - 1]);

  return (
    <div>
      <GraphQLData logs={ logs } />
    </div>
  )
}

export default Effects;
