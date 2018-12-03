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
      foreignObjectWrapper: {y: -5, x: 10},
      nodeSize: {x: 75, y: 75},
    };
    this.handleFlip = this.handleFlip.bind(this);
  }


  componentDidMount() {
    //from reactD3 library *centering
   console.log(this.props.appState, 'did appState arrive to Tree Diagram?')
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      },
    });
  }


  handleFlip() {
    if(this.state.orientation === 'vertical') {
      this.setState({
        orientation: 'horizontal',
        foreignObjectWrapper: {y: 10, x: 5},
        nodeSize:{y:85, x:150},
        translate: {
          x: dimensions.width / 8,
          y: dimensions.height / 8
        }
      })
    } else {
      this.setState({
        orientation: 'vertical',
        foreignObjectWrapper: {y: -5, x: 10},
        nodeSize: {x: 75, y: 75},
        translate: {
          x: dimensions.width / 2,
          y: dimentinos.height / 8
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


    //* eterna's initial code 
    // let data = this.props.appState;

    // if (this.state.componentsToFilter.length) {
    //   let result = [];
    //   filter(data, this.state.componentsToFilter, result);
    //   data = result;
    // }

    return (
      <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}>
        <button onClick={() => {this.handleFlip()}}> {this.state.orientation[0].toUpperCase() + this.state.orientation.slice(1)} </button>
        <button id='redux-button' onClick={() => { this.props.handleFilter(filterComponents.reduxComponents) }}>Filter Redux</button>
        <button id='router-button' onClick={() => { this.props.handleFilter(filterComponents.reactRouterComponents) }}>Filter React-Router</button>
        <button id='apollo-button' onClick={() => { this.props.handleFilter(filterComponents.apolloComponents) }}>Filter Apollo-GraphQL</button>
     
        {this.props.appState.length !== 0 ? (
          <Tree
            data={this.props.appState}
            nodeSize={{ x: 75, y: 75 }}
            orientation={this.state.orientation}
            styles={styles}
            translate={this.state.translate}
            separation={{ siblings: 1, nonSiblings: 1 }}
            allowForeignObjects
            //* Placing this tool component in the render property of "nodeLabelComponent", we are allowed access to each tree node's data.
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
