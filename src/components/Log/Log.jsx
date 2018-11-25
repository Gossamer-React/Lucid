import React from "react";

const Log = props => {

  return (
    <div className="log">
      <p className="log-p">
        <b>Request:</b> {props.logId}
      </p>
      <p className="log-p">
        <b>Operation Name:</b> {props.operationName}
      </p>
      <p className="log-p">
        <b>Query:</b> <pre className='pre-json'>{props.query}</pre>
      </p>
      <p className="log-p">
        <b>Variables:</b> <pre className='pre-json'>{JSON.stringify(props.variables, null, 2)}</pre>
      </p>
    </div>
  );
};

export default Log;
