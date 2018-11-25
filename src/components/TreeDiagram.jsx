import React from "react";
import Tree from "react-d3-tree";
import Tool from "./Tool";

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
      toggle: false
    };
  }

  componentDidMount() {
    //from reactD3 library *centering
    const dimensions = this.treeContainer.getBoundingClientRect();
    console.log(dimensions, "these are the dimensions");
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      }
    });
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
          strokeWidth: 1
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
            strokeWidth: 1
          }
        }
      }
    };

    return (
      <div
        id="treeWrapper"
        style={{ width: "100%", height: "100vh" }}
        ref={tc => (this.treeContainer = tc)}
      >
        {/* when appState has a length we populate tree */}
        {this.props.appState.length !== 0 ? (
          <Tree
            data={this.props.appState}
            nodeSize={{ x: 75, y: 75 }}
            orientation={"vertical"}
            styles={styles}
            translate={this.state.translate}
            separation={{ siblings: 1, nonSiblings: 1 }}
            allowForeignObjects
            nodeLabelComponent={{
              render: <Tool className="myLabelComponentInSvg" />,
              foreignObjectWrapper: {
                y: -5,
                x: 10
              }
            }}
          />
        ) : (
          <p> Tree Loading ... </p>
        )}

        {/* {this.state.toggleTool === true ? 
          //set a timeout for the hover at 500ms
            <Tool />  
            : null 
        } */}
      </div>
    );
  }
}

export default TreeDiagram;
