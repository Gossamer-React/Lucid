import React from "react";

class Tool extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        // this.filterProps = this.filterProps.bind(this);
    }

    // componentDidMount() {
    //     this.filterProps(); 
    // }

    // componentDidUpdate() {
    //     this.filterProps();
    // }

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
    //     if(this.props.nodeData.Props !== null) {
    //         this.props.nodeData.Props.map((item) => {
    //             return (
    //                 <ul>
    //                     <li>{item}</li>
    //                 </ul>
    //             )
    //         })
    //     }
    // }
    

    render() {
        console.log(this.props.nodeData, 'using this')
        return (
            <div className={this.props.className}>
                <h4 onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()}>{this.props.nodeData.name}</h4>
                {this.state.toggle ?
                <ul>
                    <li className='stateProp'>{JSON.stringify(this.props.nodeData.State)}</li>
                    <li className='stateProp'>{JSON.stringify(this.props.nodeData.Props)}</li>
                </ul> 
                : null
                }
            </div>
        );
    }
}



export default Tool;
