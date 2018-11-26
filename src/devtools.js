import React, { Component } from "react";
import { render } from "react-dom";
import fetch from "node-fetch";
import { introspectionQuery } from "graphql";
import LogContainer from "./containers/LogContainer.jsx";
import styles from "./../public/app.css";
import GraphQLContainer from "./containers/GraphQLContainer";
import TreeDiagram from "./components/TreeDiagram.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: 'Graphql',
      logs: [],
      appReactDOM: [],
      appState: [],
      schema: 'GraphQL schema not available.'
    };

    chrome.devtools.panels.create("Lucid", null, "devtools.html", panel => {
      console.log("Connected to panel: ", panel);
      panel.onShown.addListener((e) => {
        console.log(e);
      });
    });
  }

  componentDidMount() {
    const appState = this;

    let chromePort = chrome.runtime.connect({
      name: "devtool-background-port"
    });

    chromePort.postMessage({
      name: "connect",
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    let timeout;
    chromePort.onMessage.addListener(req => {
      console.log("componentDidMount!", this);
      // * checks if the message it's receiving is about a change in the DOM

      if (req.type === "appState") {
        console.log("This is state!!", appState);
        appState.setState({ appReactDOM: req.msg });

        //if there is an active setTimeout, clear it
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          appState.setState({ appState: req.msg });
          // alert('state was updated')
        }, 2000);
      }
    });

    chrome.devtools.network.onRequestFinished.addListener(function (httpReq) {
      if (httpReq.request.postData !== undefined) {
        let reqBody = JSON.parse(httpReq.request.postData.text);

        console.log('reqBody: ', reqBody);
        if (reqBody.variables && reqBody.query) {
          let log = {};
          log.req = httpReq.request;

          if (httpReq.response.content) {
            httpReq.getContent(responseBody => {
              if (responseBody === "") {
                log.res = "No response received";
              } else {
                const parsedResponseBody = JSON.parse(responseBody);
                log.res = parsedResponseBody;
                appState.setState({ logs: [...appState.state.logs, log] });
              }
            });
          }
        }
      }
    });
  }

  fetchSchemaFromGraphQLServer() {
    if (this.state.logs.length !== 0) {
      let url = this.state.logs[this.state.logs.length - 1].req.url;
      console.log("URL", url);

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: introspectionQuery })
      })
        .then(res => res.json())
        .then(json =>
          this.setState({
            schema: JSON.stringify(json.data)
          })
        );
    }
  }

  componentDidUpdate() {
    if (this.state.schema === "GraphQL schema not available.") {
      this.fetchSchemaFromGraphQLServer();
    }
  }

  handleNodeClick(data, event) {
    //toggles true and false
    this.setState({ toggleTool: !this.state.toggleTool, clickData: data });
    // console.log(this.state.clickData, 'this is clickData after setState') //grabs entire node data
    console.log(this.state.toggleTool, "after setState");
  }

  // * Handles the tab click for tree and req/res window
  handleWindowChange() {
    if (this.state.window === 'Graphql') {
      this.setState({ window: 'React' });
    } else {
      this.setState({ window: 'Graphql' });
    }
  }

  render() {
    console.log("this is the state:", this.state);
    //if this.state.appState has not been populated by the reactTraverser.js, show a message that asks users to 'setState' else render our App (Tree, Log, Effects)
    return (
      <div>
        {this.state.appState.length === 0 ? (
          <div id="reactLoader">
            <h1>
              Please trigger a setState() to activate Lucid devtool.
              <br />
            </h1>
            <p>Note: Lucid works best on React v15/16</p>
          </div>
        ) : (
            <div id="app-container">
              <LogContainer logs={this.state.logs} />
              <hr id="vr-log" />
              <div id="window">
                <div id="window-nav">
                  <button
                    className="window-btn"
                    onClick={() => {
                      this.handleWindowChange();
                    }}
                  >
                    GraphQL
                </button>
                  <button
                    className="window-btn"
                    onClick={() => {
                      this.handleWindowChange();
                    }}
                  >
                    React Tree
                </button>
                </div>
                {/* This checks what window the user has click on. 
              They can click to see the state tree or 
              request/reponse from their httprequest */}
                {this.state.window === 'Graphql' ? (
                  <GraphQLContainer
                    logs={this.state.logs}
                    schema={this.state.schema}
                  />
                ) : (
                    <TreeDiagram appState={this.state.appState} />
                  )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
