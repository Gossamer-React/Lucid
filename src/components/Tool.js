import React from "react";

class Tool extends React.Component {
    constructor(props){
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

    // filterProps() {
    //     const objProp = this.props.nodeData.Props; 
    //     for(let key in objProp) {
    //         console.log(key, 'each KEY')
    //         console.log(objProp[key], 'KEY VALUE')
    //     }
    // }

    // componentDidMount() {
    //     this.filterProps();
    // }


    render() {
        const stateObj = this.props.nodeData.State;
        const propObj = this.props.nodeData.Props;
        return (
            <div className='tool-tip' onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()}>
                <h4 className='tree-names'>{this.props.nodeData.name}</h4>
                {this.state.toggle ?
                    ((this.props.nodeData.Props.length !== 0 || this.props.nodeData.State.length !== 0) ? 
                        <pre className='state-prop'>State:{JSON.stringify(stateObj, null, 1)} Props:{JSON.stringify(propObj, undefined, 1)} </pre> 
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
