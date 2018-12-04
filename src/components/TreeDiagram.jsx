import React from 'react';
import Tree from 'react-d3-tree';
import Tool from './Tool';
import filterComponents from '../filterComponents';

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
      orientation: 'vertical',
<<<<<<< HEAD
      foreignObjectWrapper: {x: 10, y: 4},
      nodeSize: {x: 85, y: 85},
=======
      foreignObjectWrapper: {y: -5, x: 10},
      nodeSize: {x: 75, y: 75},
>>>>>>> 9609025ded6a6f44d16730207d255bd1cb9c8d90
    };
    this.handleFlip = this.handleFlip.bind(this);
  }


  componentDidMount() {
    //from reactD3 library *centering
    const dimensions = this.treeContainer.getBoundingClientRect();

    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      },
    });
  }

<<<<<<< HEAD

=======
>>>>>>> 9609025ded6a6f44d16730207d255bd1cb9c8d90
  handleFlip() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    if(this.state.orientation === 'vertical') {
      this.setState({
        orientation: 'horizontal',
        foreignObjectWrapper: {x: 5, y: 8},
        nodeSize: {x: 120, y:120},
        translate: {
          x: dimensions.width / 8,
          y: dimensions.height / 2
        }
      })
    } else {
      this.setState({
        orientation: 'vertical',
        foreignObjectWrapper: {x: 10, y: 4},
        nodeSize: {x: 85, y: 85},
        translate: {
          x: dimensions.width / 2,
          y: dimensions.height / 8
        }
      });
    }
  }  

  render() {
    const styles = {
      nodes: {
        node: {
          circle: {
            fill: "black",
            fontSize: "0.1",
            strokeWidth: 2
          }
        },
        attributes: {
          fill: "white",
          fontSize: "10",
          strokeWidth: 1
        },
        leafNode: {
          circle: {
            fill: "none",
            fontSize: "0.1",
            strokeWidth: 2
          },
          attributes: {
            fill: "white",
            fontSize: "10",
            strokeWidth: 1
          }
        }
      }
    };

<<<<<<< HEAD

    return (
      <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}>
        <button onClick={() => {this.handleFlip()}}> {this.state.orientation[0].toUpperCase() + this.state.orientation.slice(1)} </button>
        <button onClick={(e) => { this.props.handleFilter(e, filterComponents.reduxComponents) }}>Filter Redux</button>
        <button onClick={(e) => { this.props.handleFilter(e, filterComponents.reactRouterComponents) }}>Filter React-Router</button>
        <button onClick={(e) => { this.props.handleFilter(e, filterComponents.apolloComponents) }}>Filter Apollo-GraphQL</button>
     
        {this.props.appState.length !== 0 ? (
          <Tree
            data={this.props.appState}
            nodeSize={this.state.nodeSize}
=======
    return (
      <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}>
        <button onClick={() => {this.handleFlip()}}> {this.state.orientation[0].toUpperCase() + this.state.orientation.slice(1)} </button>
        <button onClick={() => { this.props.handleFilter(filterComponents.reduxComponents) }}>Filter Redux</button>
        <button onClick={() => { this.props.handleFilter(filterComponents.reactRouterComponents) }}>Filter React-Router</button>
        <button onClick={() => { this.props.handleFilter(filterComponents.apolloComponents) }}>Filter Apollo-GraphQL</button>
     
        {/* when appState has a length we populate tree */}
        {this.props.appState.length !== 0 ? (
          <Tree
            data={this.props.appState}
            nodeSize={{ x: 75, y: 75 }}
>>>>>>> 9609025ded6a6f44d16730207d255bd1cb9c8d90
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
