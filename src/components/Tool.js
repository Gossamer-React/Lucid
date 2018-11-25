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

    filterState(){
        this.props.nodeData.State    
    }

    filterProps(){
        
    }

    componentDidMount() {
        this.filterProps(); 
        this.filterState();
    }

    

    render() {
        console.log(this.props.nodeData, 'node data is here')
        const propObj = this.props.nodeData.Props;
        console.log(propObj, 'prop object');
        return (
            <div className={this.props.className}>
                <h4 onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()}>{this.props.nodeData.name}</h4>
                {this.state.toggle ?
                    (this.props.nodeData.Props ? 
                       <pre className='stateProp'> {JSON.stringify(propObj, undefined, 2)} </pre> 
                       : 
                       <p> No Props </p>
                    )
                    
                : null
                }
            </div>
        );
    }
}



export default Tool;
