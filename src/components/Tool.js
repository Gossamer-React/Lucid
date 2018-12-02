import React from "react";

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            hoverNodeData: []
        }
    }

    render() {
        const stateObj = this.props.nodeData.State;
        const propObj = this.props.nodeData.Props;
        const nodeData = this.props.nodeData
        return (
            <div className='tool-tip' onMouseOver={() => this.props.handleMouseOver(this.props.nodeData)} >
                <h4 className='tree-names'>{this.props.nodeData.name}</h4>
            </div>
        );
    }
}

export default Tool;
