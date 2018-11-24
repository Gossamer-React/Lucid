import React, { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'node-fetch';
import { introspectionQuery } from 'graphql';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import GraphQL from './containers/GraphQL';
import TreeDiagram from './components/TreeDiagram.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: 'React',
      logs: [],
      appReactDOM: [],
      appState: [],
      schema: 'GraphQL schema not available.'
    };
    // initialize a timeout variable to throttle setState()s on this.state.appState
    let timeout;

    chrome.devtools.panels.create("Lucid", null, "devtools.html", () => {
      let state = this;
      // create a port called 'devtool-background-port'
      const devToolPort = chrome.runtime.connect({
        name: "devtool-background-port"
      });
       
      devToolPort.postMessage({
        name: "connect",
        tabId: chrome.devtools.inspectedWindow.tabId
      });

      devToolPort.onMessage.addListener(req => {
        // * checks if the message it's receiving is about a request about an http request or a change in the DOM
        if (req.type === "requestLogs") {
          const newLogs = req.msg;
          // state.setState({ logs: newLogs });
        } else if (req.type === "appState") {
          state.setState({ appReactDOM: req.msg });

          //if there is an active setTimeout, clear it
          clearTimeout(timeout);

          timeout = setTimeout(() => {
              state.setState({ appState: req.msg })
              // alert('state was updated')
          }, 2000);
        }
      });

      // chrome.devtools.network.onRequestFinished event provides an HTTP Archive format (HAR) entry as an argument to the event callback
      // * get request/response
      chrome.devtools.network.onRequestFinished.addListener(function (httpReq) {
        if (httpReq.request.url === 'http://localhost:4000/graphql') {
          let log = {};
          log.req = httpReq.request;

          if (httpReq.response.content) {
            httpReq.getContent(responseBody => {
              // TODO: account for the responses when they come in empty or if the response received is an error
              const parsedResponseBody = JSON.parse(responseBody);
              log.res = parsedResponseBody;
              console.log("---LOG---: ", log);
              state.setState({ logs: [...state.state.logs, log] });
            });
          }
        }
      });
    });
  }

  fetchSchemaFromGraphQLServer() {
    if (this.state.logs.length !== 0) {
      
      let url = this.state.logs[this.state.logs.length -1].req.url;
      console.log('URL', url);

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
    if (this.state.schema === 'GraphQL schema not available.') {
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
    if (this.state.window === 'React') {
      this.setState({ window: 'GraphQL' });
    } else {
      this.setState({
        window: 'React'
      });
    }
  }

  render() {
    console.log("this is the state:", this.state);
    //if this.state.appState has not been populated by the reactTraverser.js, show a message that asks users to 'setState' else render our App (Tree, Log, Effects)
    return (
      <div>
        {this.state.appState.length === 0 ?
          <div id='reactLoader'>
            <h1>
              Please trigger a setState() to activate Lucid devtool.
              <br />
            </h1>
            <p>Note: Lucid works best on React v15/16</p>
          </div> :
          <div id='app-container'>
            <LogContainer logs={this.state.logs} />
            <div id='window'>
              <div id='window-nav'>
                <button className="window-btn" onClick={() => { this.handleWindowChange(); }}>React</button>
                <button className="window-btn" onClick={() => { this.handleWindowChange(); }}>GraphQL</button>
              </div>
              {/* This checks what window the user has click on. 
              They can click to see the state tree or 
              request/reponse from their httprequest */}
              {this.state.window === 'React' 
                ?
                null 
                :
                <GraphQL logs={this.state.logs} schema={this.state.schema} />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
