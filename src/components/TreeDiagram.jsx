import React from 'react';
import Tree from 'react-d3-tree';
import Tool from './Tool';

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
      orientation: 'Vertical',
      foreignObjectWrapper: {y: -5, x: 10},
      nodeSize: {x: 75, y: 75}
    };
    this.handleFlip = this.handleFlip.bind(this);
  }


  componentDidMount() {
    //from reactD3 library *centering
    const dimensions = this.treeContainer.getBoundingClientRect();
    console.log(dimensions, 'these are the dimensions')
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      },
    });
  }

  handleFlip() {
    if(this.state.orientation === 'Vertical') {
      this.setState({
        orientation: 'Horizontal',
        foreignObjectWrapper: {y: 10, x: 10},
        nodeSize:{y:85, x:90}
      })
    } else {
      this.setState({
        orientation: 'Vertical',
        foreignObjectWrapper: {y: -5, x: 10}
      })
    }
  }


  render() {
    const styles = {
      nodes: {
        node: {
          circle: {
            fill: "black",
            fontSize: "0.1",
            strokeWidth: 0.5
          }
        },
        attributes: {
          fill: "white",
          fontSize: "10",
          strokeWidth: 0.5
        },
        leafNode: {
          circle: {
            fill: "none",
            fontSize: "0.1",
            strokeWidth: 0.5
          },
          attributes: {
            fill: "white",
            fontSize: "10",
            strokeWidth: 0.5
          }
        }
      }
    };
    
    return (
      <div
        id="treeWrapper"
        ref={tc => (this.treeContainer = tc)}
      >
        <button onClick={() => {this.handleFlip()}}> {this.state.orientation} </button>
        {/* when appState has a length we populate tree */}
        {this.props.appState.length !== 0 ? (
          <Tree
            data={this.props.appState}
            nodeSize={this.state.nodeSize}
            orientation={this.state.orientation}
            styles={styles}
            translate={this.state.translate}
            separation={{ siblings: 1, nonSiblings: 1 }}
            allowForeignObjects
            nodeLabelComponent={{
              render: <Tool handleMouseOver = {this.props.handleMouseOver} />,
              foreignObjectWrapper: this.state.foreignObjectWrapper
            }}
          />
        ) : (
          <p> Tree Loading ... </p>
        )}
      </div>
    );
  }
}

export default TreeDiagram;
