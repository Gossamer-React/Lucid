import React from 'react';

const Schema = ({ key, name }) => {

  return (
    <div>
      <div>Schema component</div>
      <div key={key} >{name}</div>
    </div>
  )
}

export default Schema;
