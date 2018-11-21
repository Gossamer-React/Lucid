import React from 'react';
import Tree from 'react-d3-tree';

const styles = {
  nodes: {
    node: {
      circle: {
        fill: 'steelblue',
        fontSize: '20',
      }
    },
    attributes: {
      fill: 'green',
      fontSize: '20,'
    },
    leafNode: {
      circle: {
        fill:'red',
        fontSize:'20',
      },
      attributes: {
        fill: 'green',
        fontSize: '20'
      }
    }
  }
};

const TreeDiagram = (props) => {
  console.log(props.appState, 'is props here?')
  return (
  <div id="treeWrapper" style={{width: '100%', height: '100vh'}}>
  {(props.appState.length !== 0) ?
    <Tree
      data={props.appState}
      nodeSize={{x:200, y:200}}
      orientation={'vertical'}
      styles={styles}
    /> : <p> Tree Loading ... </p>}
  </div>
  );
}

export default TreeDiagram;
