import React from 'react';
import Tree from 'react-d3-tree';



 /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */

//  const myTreeData = [
//   {
//     name: 'Top Level',
//     attributes: {
//       keyA: 'val A',
//       keyB: 'val B',
//       keyC: 'val C',
//     },
//     children: [
//       {
//         name: 'A',
//         attributes: {
//           keyA: 'val A',
//           keyB: 'val B',
//           keyC: 'val C',
//         },
//         children: [{name: 'Level 3'}]
//       },
//       {
//         name: 'B',
//         children: [
//         {
//           name: 'level 3',
//           children: [{name: 'Level 4'}],
//         }],
//       },
//       {
//         name: 'C'
//       },
//     ],
//   },
// ];

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
