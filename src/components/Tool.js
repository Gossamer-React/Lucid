import React from 'react'; 

const Tool = (props) => {
    console.log(props.clickData, 'click data from Tool')
    return (
        <div id='modal'>
        {(props.clickData.State || props.clickData.Props) ? 
        <p> STATE:{JSON.stringify(props.clickData.State)} PROPS:{JSON.stringify(props.clickData.Props)}</p>
        : <p> Node is empty </p>
        }
        </div>
    );
}

export default Tool; 