import React from 'react';
import LogContainer from './../LogContainer/LogContainer';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import GraphQLSchema from '../../components/GraphQLSchema/GraphQLSchema';
import styles from './GraphQLTab.css';

const tabChange = (prevProps, nextProps) => {
  if (prevProps.tab === 'React' && nextProps.tab === 'Graphql') {
    return false;
  } else if (prevProps.tab === 'React' && nextProps.tab === 'React') {
    return true;
  } else if (prevProps.tab === 'Graphql' && nextProps.tab === 'React') {
    return false;
  }
};

const GraphQLTab = props => {
  return (
    <div id='graphQLTab' className={props.tab !== 'Graphql' ? 'hide' : ''}>
      <LogContainer
        logs={props.logs}
        clearLog={props.clearLog}
        logChange={props.logChange}
      />

      {/* Checks to see it there was a request made. */}
      {props.log ? (
        <div id='graphql-container'>
          <GraphQLResponse log={props.log} />
          <GraphQLSchema schema={props.schema} />
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(GraphQLTab, tabChange);
