import React from 'react';
import Tree from 'react-d3-tree';

// this.state = {
//   test: '',
//   documentObj: {
//     Provider: {
//       State: 'providerstate',
//       Props: 'providerprop',
//       Children: [{
//         App: {
//           State: 'appstate',
//           Props: 'appprop',
//           Children: [{
//             MainContainer: {
//               State: 'mcstate',
//               Props: 'mcprops',
//               Children: [{
//                 TotalsDisplay: {
//                   State: 'totalsdisplaystate',
//                   Props: 'totalsdisplayprops',
//                   Children: []  
//                 },
//                 MarketsContainer: {
//                   State: 'marketscontainerstate',
//                   Props: 'marketscontainerprops',
//                   Children: []
//                 }
//               }
//               ]
//             }
//           }
            
//           ]
//         }
//       }
//       ]
//     }
//   }
// }


const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
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

class TreeDiagram extends React.Component {
  render() {

    return (
      <div id="treeWrapper" style={{width: '100%', height: '100vh'}}>
        <Tree
          data={myTreeData}
          orientation={'vertical'}
        />

      </div>
    );
  }
}

export default TreeDiagram;
