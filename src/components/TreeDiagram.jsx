import React from "react";
import Tree from "react-d3-tree";
import Tool from "./Tool";

class TreeDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: null,
      toggleTool: false,
      hoverData: [],
      hoverCoordinates: { x: null, y: null }
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    let timeout;
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

  handleMouseHover(data) {
    //toggles true and false and grabs event coordinates/data
    console.log(e, 'this is the event that happened')
    this.setState(
      {
        hoverCoordinates: { x: data.x, y: data.y },
        hoverData: data,
        toggleTool: !this.state.toggleTool
      },
      () => {
        const modal = document.getElementById(`${this.state.hoverData.attributes.Id}`);

        if(modal !== null) {
          console.log(modal.offsetTop, modal.offsetLeft);
          modal.style.top = `${data.y}px`;
          modal.style.left = `${data.x}px`;
        }
      }
    );
  }

  handleMouseOut() {
    this.setState({
      toggleTool: !this.state.toggleTool
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
            onMouseOver={(nodeData, e) => {
              this.handleMouseHover(nodeData);
            }}
            onMouseOut={() => {
              this.handleMouseOut();
            }}
          />
        ) : (
            <p> Tree Loading ... </p>
          )}

        {this.state.toggleTool === true ? 
          //set a timeout for the hover at 500ms
            <Tool hoverData={this.state.hoverData} />  
            : null 
        }
      </div>
    );
  }
}

export default TreeDiagram;
