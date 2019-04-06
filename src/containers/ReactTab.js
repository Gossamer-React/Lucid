import React from 'react';
import styles from './../../public/app.css';
// * Components 
import StatePropsBox from './../components/StatePropsBox';
import StateContainer from './StateContainer.jsx';
import TreeDiagram from './../components/TreeDiagram.jsx';

const tabChange = (prevProps, nextProps) => {
  if (prevProps.tab === 'React') return false;

  return true;
};

const reactTab = (props) => {
  return (
    //* If this.state.appState has not been populated by reactTraverser.js, show a message asking users to setState(), else render Tree
    <div>
      {props.appStateLength === 0 ? (
        <div id='reactLoader' class={props.tab === 'React' ? 'show' : 'hide'}>
          <img
            src='./lucidlogo-card-transparent.png'
            alt='devtool logo'
          />
          <h1>
            Please trigger a setState() to see the React Component
            Tree/State Log.
      </h1>
          <p>
            Note: Lucid requires React Devtools to run and works best on
            local apps using React v16+ in dev mode
      </p>
        </div>
      ) : (
          <div class='reactTab'>
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
    </div>
  )
}

export default React.memo(reactTab, tabChange);