import React from 'react';
import Tree from 'react-d3-tree';
import Tool from './Tool';

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
      fontSize: '20',
    },
    leafNode: {
      circle: {
        fill:'gray',
        fontSize:'20',
      },
      attributes: {
        fill: 'green',
        fontSize: '20',
      }
    }
  }
};

const TreeDiagram = (props) => {
  console.log(props.appState, 'props here in Tree Diagram?')
  console.log(props.toggleTool, 'boolean status')
  return (
  <div id="treeWrapper" style={{width: '100%', height: '100vh'}}>
  {/* when appState has a length we populate tree */}
  {(props.appState.length !== 0) ?
    <Tree
      data={props.appState}
      nodeSize={{x:150, y:150}}
      orientation={'vertical'}
      styles={styles}
      separation= {{siblings:.5, nonSiblings:.5}}
      onClick={(nodeData) => {
        props.handleNodeClick(nodeData)
      }}
    />  : <p> Tree Loading ... </p>}

    {/* if toggle is true then load the tooltip, this is triggered by onClick in Tree */}
  {(props.toggleTool === true) ? 
    <Tool 
    //pass props down to Tool
    {...props}
    /> : null
  }
  </div>
  );
}

export default TreeDiagram;
