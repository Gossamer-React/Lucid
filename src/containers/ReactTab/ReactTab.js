import React from 'react';
import styles from './ReactTab.css';
// * Components
import StatePropsBox from './../../components/StatePropsBox';
import StateContainer from './../StateContainer.jsx';
import TreeDiagram from './../../components/TreeDiagram.jsx';

const tabChange = (prevProps, nextProps) => {
  if (prevProps.tab === 'Graphql' && nextProps.tab === 'React'){
    return false;
  }else if(prevProps.tab === 'Graphql' && nextProps.tab === 'Graphql'){
    return true;
  }else if (prevProps.tab === 'React' && nextProps.tab === 'Graphql'){
    return false;
  }
};

const reactTab = props => {
  return (
    //* If this.state.appState has not been populated by reactTraverser.js, show a message asking users to setState(), else render Tree
    <React.Fragment>
      {props.appStateLength === 0 ? (
        <div id='reactLoader' className={props.tab !== 'React' ? 'hide' : ''}>
          <img src='./lucidlogo-card-transparent.png' alt='devtool logo' />
          <h1>
            Please trigger a setState() to see the React Component Tree/State
            Log.
          </h1>
          <p>
            Note: Lucid requires React Devtools to run and works best on local
            apps using React v16+ in dev mode
          </p>
        </div>
      ) : (
        <div id='reactTab' className={props.tab !== 'React' ? 'hide' : ''}>
          <StateContainer
            clearLog={props.clearLog}
            stateDiffs={props.stateDiffs}
          />
          <TreeDiagram
            appState={props.appState}
            handleMouseOver={props.handleMouseOver}
            handleFilter={props.handleFilter}
          />
          <StatePropsBox nodeData={props.nodeData} />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(reactTab, tabChange);
