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
      // domData: []
    };
    this.handleFlip = this.handleFlip.bind(this);
  }


  componentDidMount() {
    //from reactD3 library *centering
    // console.log(this.props.filteredData, 'did filteredData arrive to Tree diagram --console.log from componentDidMount line 22 TreeDiagram')
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      },
      // domData: this.props.appState,
    });
  }

  //* when theres a change in any of the toggles, filteredDdata stores the filtered components
  //* check for any toggles to be true, and filteredData to be not empty, if so setState. 
  //* issue is we keep running into a repetitive recursive loop and app breaks/ 
  // componentDidUpdate() {
  //   if(this.props.filteredData.length !== 0 && this.props.toggleRedux === true || this.props.toggleRouter === true || this.props.toggleApollo === true) {
  //     this.setState({
  //       domData: this.props.filteredData
  //     });
  //   }
  // }

//* before props are being passed, we want to compare the old props with the newly updated props.
//* if they're not the same (comparing lengths after filter) then we set our state accordingly.
//* wanted to see diff from this and update. 

  // componentWillReceiveProps(nextProps) {
  //   if(this.props.filteredData.length !== nextProps.filteredData.length) {
  //     this.setState({
  //       domData: this.props.filteredData
  //     })
  //   } else {
  //     this.setState({
  //       domData: this.props.appState
  //     })
  //   }
  // }


  handleFlip() {
    if(this.state.orientation === 'vertical') {
      this.setState({
        orientation: 'horizontal',
        foreignObjectWrapper: {y: 10, x: 10},
        nodeSize:{y:85, x:90}
      })
    } else {
      this.setState({
        orientation: 'vertical',
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
        <button onClick={() => { this.props.handleReduxFilter(filterComponents.reduxComponents) }}>Filter Redux</button>
        <button onClick={() => { this.props.handleRouterFilter(filterComponents.reactRouterComponents) }}>Filter React-Router</button>
        <button onClick={() => { this.props.handleApolloFilter(filterComponents.apolloComponents) }}>Filter Apollo-GraphQL</button>
     
        {this.state.domData.length !== 0 ? (
          <Tree
            data={this.state.domData}
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
