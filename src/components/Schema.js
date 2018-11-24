import React from 'react';
import { buildClientSchema } from 'graphql';

const Schema = ({ key, name, element, schemaObj }) => {

  return (
    <div>
      <p key={key} className="schema-p">
        <b>{name}:</b> {JSON.stringify(buildClientSchema(schemaObj))}
      </p>
    </div>
  )
}

export default Schema;
