import React from "react";

 
const Tool = (props) => {
    return (
        <div className='tool-tip' onMouseOver={() => props.handleMouseOver(props.nodeData)} >
            <h4 className='tree-names'>{props.nodeData.name}</h4>
        </div>
    );
}

export default Tool;
