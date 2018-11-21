import React, { Component } from "react";
import Log from "./../components/Log/Log.jsx";
import styles from "../../public/log-container.css";

const LogContainer = props => {
  // console.log(props);
  let logs = props.logs.map((log, i) => {
    let text = JSON.parse(log.req.postData.text);
    return (
      <Log
        key={i}
        operationName={text.operationName}
        query={text.query}
        variables={text.variables}
        logId={i}
      />
    );
  });

  logs.reverse();
  return (
    <div id="log-container">
      <h1>Log</h1>
      <hr id="log-hr" />
      <div id="logs">{logs}</div>
    </div>
  );
};

export default LogContainer;
