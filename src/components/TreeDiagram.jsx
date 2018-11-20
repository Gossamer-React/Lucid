import React from 'react';
import Tree from 'react-d3-tree';


const myTreeData = [
  {
    name: 'Top Level',
    children: [
      {
        name: 'A',
        children: [{name: 'Level 3'}]
      },
      {
        name: 'B',
        children: [
        {
          name: 'level 3',
          children: [{name: 'Level 4'}]
        }],
      },
      {
        name: 'C'
      }
    ],
  },
];


 /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */

const TreeDiagram = (props) => {
  console.log(props.appState, 'is props here?')
  return (
  <div id="treeWrapper" style={{width: '100%', height: '100vh'}}>
  {
    (props.appState.length !== 0) ?
    <Tree
      data={props.appState}
      orientation={'vertical'}
    /> : <p> Loading ... </p>
  }
  </div>
  );
}

export default TreeDiagram;
