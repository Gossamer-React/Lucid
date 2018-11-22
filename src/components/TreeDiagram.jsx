import React from 'react';
import Tree from 'react-d3-tree';
import Tool from './Tool';

const styles = {
  nodes: {
    node: {
      circle: {
        fill: 'steelblue',
        fontSize: '10',
      }
    },
    attributes: {
      fill: 'green',
      fontSize: '10',
    },
    leafNode: {
      circle: {
        fill:'gray',
        fontSize:'10',
      },
      attributes: {
        fill: 'green',
        fontSize: '10',
      }
    }
  }
};

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
    }
  }

  componentDidMount() {
    //from reactD3 library *centering
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width/2,
        y: dimensions.height/8
      }
    })
  }


  
  render(){
    console.log(this.props.toggleTool, 'boolean status');
    return (
      <div id="treeWrapper" style={{width: '100%', height: '100vh'}} ref={tc => this.treeContainer = tc}>
      {/* when appState has a length we populate tree */}
      {(this.props.appState.length !== 0) ?
        <Tree
          data={this.props.appState}
          nodeSize={{x:75, y:75}}
          orientation={'vertical'}
          styles={styles}
          translate = {this.state.translate}
          separation= {{siblings:1, nonSiblings:1}}
          onClick={(nodeData) => {
            this.props.handleNodeClick(nodeData)
          }}
        />  : <p> Tree Loading ... </p>}
    
        {/* if toggle is true then load the tooltip, this is triggered by onClick in Tree */}
      {(this.props.toggleTool === true) ? 
        <Tool 
        //pass props down to Tool
        clickData = {this.props.clickData}
        /> : null
      }
      </div>
    );
  }
}

export default TreeDiagram;
