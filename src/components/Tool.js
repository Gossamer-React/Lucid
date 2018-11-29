import React from "react";

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            hoverNodeData: []
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver(data) {
        let timeout; 
        timeout = setTimeout(() => {
            this.setState({
            toggle: true,
            // hoverNodeData: data
        })}, 500)
    }
    handleMouseOut() {
        this.setState({
            toggle: false
        })
    }

    render() {
        const stateObj = this.props.nodeData.State;
        const propObj = this.props.nodeData.Props;
        const nodeData = this.props.nodeData
        return (
            <div className='tool-tip' onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.props.handleMouseOver(this.props.nodeData)} >
                <h4 className='tree-names'>{this.props.nodeData.name}</h4>
                {/* {this.state.toggle ?
                    ((this.props.nodeData.Props.length !== 0 || this.props.nodeData.State.length !== 0) ?
                        <div className='state-prop'>
                            <pre className='pre-tag'>State:{JSON.stringify(stateObj, null, 2)} </pre>
                            <pre className='pre-tag'>Props:{JSON.stringify(propObj, undefined, 2)}</pre>
                        </div>
                        :
                        <p> Empty </p>
                    )
                    : null
                } */}
            </div>
        );
    }
}

export default Tool;
