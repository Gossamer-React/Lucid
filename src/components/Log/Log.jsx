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
      <b>Query:</b>
      <pre className="log-p">
        {props.query}
      </pre>
      <b>Variables:</b>
      <pre className="log-p">
        {JSON.stringify(props.variables, undefined, 2)}
      </pre>
    </div>
  );
};

export default Log;
