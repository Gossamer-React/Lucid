import React from 'react';
import GraphQLContainer from './GraphQLContainer';
import LogContainer from './LogContainer.jsx';
import styles from './../../public/app.css';

const tabChange = (prevProps, nextProps) => {
  if (prevProps.tab === 'Graphql') return false;

  return true;
};

const GraphQLTab = (props) => {
  return (
    <div class='graphQLTab' class={props.tab === 'Graphql' ? 'show' : 'hide'}>
      <LogContainer
        logs={props.logs}
        clearLog={props.clearLog}
        logChange={props.logChange}
      />
      <GraphQLContainer
        schema={props.schema}
        log={props.log}
      />
    </div>
  )
}

export default GraphQLTab;