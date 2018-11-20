import React from "react";

const Log = props => {
  console.log("---LOG---", props);

  return (
    <div className="log">
      <p className="log-p">
        <b>Request:</b> {props.logId}
      </p>
      <p className="log-p">
        <b>Operation Name:</b> {props.operationName}
      </p>
      <p className="log-p">
        <b>Query:</b> {props.query}
      </p>
      <p className="log-p">
        <b>Variable:</b> {JSON.stringify(props.variables)}
      </p>
    </div>
  );
};

export default Log;
