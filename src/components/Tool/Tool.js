import React from 'react';

const Tool = props => {
  const { nodeData } = props;

  return (
    <div
      className='tool-tip'
      onMouseOver={() => props.handleMouseOver(nodeData)}
    >
      <h4 className='tree-names'>{nodeData.name}</h4>
    </div>
  );
};

export default Tool;
