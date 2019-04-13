import React from 'react'; 
import style from './StatePropsBox.css';

const StatePropsBox = (props) => {
    const stateObj = props.nodeData.State; 
    const propObj = props.nodeData.Props
    
    return (
        <div className='state-prop-display'>
         {(props.nodeData.Props !== null || props.nodeData.State !== null) ?
            <div>
                <h4> {props.nodeData.name} </h4>
                <pre className='pre-tag'>State:{JSON.stringify(stateObj, null, 2)} </pre>
                <pre className='pre-tag'>Props:{JSON.stringify(propObj, undefined, 2)}</pre>
             </div>
             :
         <p> Empty, hover nodes to get data</p> 
         }          
        </div>
    )
} 

export default StatePropsBox;