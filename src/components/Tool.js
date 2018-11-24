import React from 'react'; 

const Tool = (props) => {
    console.log(props.hoverData, 'hover data from Tool')
    return (
        <div id={props.hoverData.attributes.Id} className='modal'>
        {(props.hoverData.State || props.hoverData.Props) ? 
        <span> STATE:{JSON.stringify(props.hoverData.State)} PROPS:{JSON.stringify(props.hoverData.Props)}</span>
        : <span classname='modaltext'> Node is empty </span>
        }
        </div>
    );
}

export default Tool; 