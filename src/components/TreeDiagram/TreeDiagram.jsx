import React from 'react';
import Tree from 'react-d3-tree';
import Tool from './../Tool/Tool';
import filterComponents from '../../filterComponents';
import styles from './TreeDiagram.css';

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
      orientation: 'vertical',
      foreignObjectWrapper: { x: 8, y: 4 },
      nodeSize: { x: 95, y: 85 },
    };
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

  handleFlip = () => {
    const dimensions = this.treeContainer.getBoundingClientRect();
    if (this.state.orientation === 'vertical') {
      this.setState({
        orientation: 'horizontal',
        foreignObjectWrapper: { x: 5, y: 8 },
        nodeSize: { x: 110, y: 110 },
        translate: {
          x: dimensions.width / 8,
          y: dimensions.height / 2
        }
      })
    } else {
      this.setState({
        orientation: 'vertical',
        foreignObjectWrapper: { x: 8, y: 4 },
        nodeSize: { x: 85, y: 85 },
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
      <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}>
        <div id='treeButtons'>
          <button onClick={this.handleFlip}> {this.state.orientation[0].toUpperCase() + this.state.orientation.slice(1)} </button>
          <button onClick={(e) => { this.props.handleFilter(e, filterComponents.reduxComponents) }}>Filter Redux</button>
          <button onClick={(e) => { this.props.handleFilter(e, filterComponents.reactRouterComponents) }}>Filter React-Router</button>
          <button onClick={(e) => { this.props.handleFilter(e, filterComponents.apolloComponents) }}>Filter Apollo-GraphQL</button>
        </div>

        <Tree
          data={this.props.appState}
          nodeSize={this.state.nodeSize}
          orientation={this.state.orientation}
          styles={styles}
          translate={this.state.translate}
          separation={{ siblings: 1, nonSiblings: 1 }}
          allowForeignObjects
          nodeLabelComponent={{
            render: <Tool handleMouseOver={this.props.handleMouseOver} />,
            foreignObjectWrapper: this.state.foreignObjectWrapper
          }}
        />
      </div>
    );
  }
}

export default TreeDiagram;
