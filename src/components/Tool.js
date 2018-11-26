import React from "react";

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver() {
        this.setState({
            toggle: true
        })
    }
    handleMouseOut() {
        this.setState({
            toggle: false
        })
    }


    render() {
        const stateObj = this.props.nodeData.State;
        const propObj = this.props.nodeData.Props;
        return (
            <div className='tooltip'>
                <h4 className='tree-names' onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()}>{this.props.nodeData.name}</h4>
                {this.state.toggle ?
                    ((this.props.nodeData.Props.length !== 0 || this.props.nodeData.State.length !== 0) ?
                        <div className='state-prop'>
                            <pre>State:{JSON.stringify(stateObj, null, 2)} </pre>
                            <pre>Props:{JSON.stringify(propObj, undefined, 2)}</pre>
                        </div>
                        :
                        <p> Empty </p>
                    )
                    : null
                }
            </div>
        );
    }
}



export default Tool;
