import React from 'react';
import LogContainer from './../LogContainer/LogContainer.jsx';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import GraphQLSchema from '../../components/GraphQLSchema/GraphQLSchema';
import styles from './GraphQLTab.css';

const tabChange = (prevProps, nextProps) => {
  if (nextProps.tab !== 'Graphql') return true;

  return false;
};

const GraphQLTab = props => {
  return (
    <div id='graphQLTab'>
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
      ) : (
          <h2>No requests have been made yet.</h2>
        )}
    </div>
  );
};

export default React.memo(GraphQLTab, tabChange);
