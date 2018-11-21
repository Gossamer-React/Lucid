import React, { Component } from "react";
import { render } from "react-dom";
import LogContainer from "./containers/LogContainer.jsx";
import styles from "./../public/app.css";
import Effects from "./components/Effects";
import TreeDiagram from "./components/TreeDiagram.jsx";
import { networkInterfaces } from "os";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      appState: [],
      stateProps: [],
      responses: []
    };
    chrome.devtools.panels.create("Lucid", null, "devtools.html", panel => {
      // * Save 'this' so that our listeners what 'this.state' and 'this.setState' is
      let state = this;

      const backgroundPort = chrome.runtime.connect({
        name: "devtool-background-port"
      });

      // *adds a listener to listen for any messages being sent by our background script
      backgroundPort.onMessage.addListener(req => {
        // * checks if the message it's receiving is about a request about an http request or a change in the DOM
        if (req.type === "requestLogs") {
          const newLogs = req.msg;
          // state.setState({ logs: newLogs });
        } else if (req.type === "appState") {
          const applicationState = req.msg;
          state.setState({ appState: applicationState });
        }
      });

      // * get request/response
      chrome.devtools.network.onRequestFinished.addListener(function (httpReq) {
        if (httpReq.request.url === "http://localhost:4000/graphql") {
          let log = {};
          log.req = httpReq.request;
          if (httpReq.response.content) {
            httpReq.getContent(responseBody => {
              const parsedResponseBody = JSON.parse(responseBody);
              log.res = parsedResponseBody;
              console.log("---LOG---: ", log);
              state.setState({logs: [...state.state.logs, log]})
            });
          }
        }
      });
    });
  }

  render() {
    console.log("THIS IS THE STATE", this.state);

    return (
      <div id="app-container">
        {/* <LogContainer logs={this.state.logs} /> */}
        <h1>Welcome to React-Lucid</h1>
        {/* <Effects logs={this.state.logs} /> */}
        <TreeDiagram appState={this.state.appState} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
