import React, { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'node-fetch';
import { introspectionQuery } from 'graphql';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import GraphQLContainer from './containers/GraphQLContainer';
import TreeDiagram from './components/TreeDiagram.jsx';
import recurseDiff from './stateDiff'

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: 'Graphql',
      logs: [],
      appReactDOM: [],
      appState: [],
      schema: 'GraphQL schema not available.',
      stateDiff: []
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
      name: 'devtool-background-port'
    });

    chromePort.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    let timeout;
    chromePort.onMessage.addListener(req => {
      console.log("componentDidMount!", this);
      // * checks if the message it's receiving is about a change in the DOM

      if (req.type === 'appState') {
        let oldstate = this.state.appReactDOM;
        appState.setState({ appReactDOM: req.msg });

        if (oldstate.length > 0) {
          let diff = recurseDiff(oldstate, this.state.appReactDOM);
          appState.setState({ stateDiff: diff });
        }

        //if there is an active setTimeout, clear it
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          appState.setState({ appState: req.msg });
        }, 1000);
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    console.log(this.state.toggleTool, 'after setState');
  }

  // * Handles the tab click for tree and req/res window
  handleWindowChange() {
    if (this.state.window === 'Graphql') {
      this.setState({ window: 'React' });
      document.querySelector('#reactbtn').classList.remove('active');
      document.querySelector('#graphqlbtn').classList.add('active');
    } else {
      this.setState({ window: 'Graphql' });
      document.querySelector('#reactbtn').classList.add('active');
      document.querySelector('#graphqlbtn').classList.remove('active');
    }
  }

  render() {
    console.log('devtoolsjs re-rendered; this.state:', this.state);
    //if this.state.appState has not been populated by reactTraverser.js, show a message asking users to setState(), else render App (Log, Tree, GraphQL)
    return (
      <div>
        {this.state.appState.length === 0 ?
          <div id='reactLoader'>
            <h1>Please trigger a setState() to activate Lucid devtool.<br /></h1>
            <p>Lucid works best on React v15/16</p>
          </div> :
          <div id='app-container'>

            <LogContainer logs={this.state.logs} />

            <div id='window'>
              <div id='window-nav'>
                <span class='window-btn-wrapper'>
                  <button className='window-btn active' id='reactbtn' onClick={() => { this.handleWindowChange(); }}>React</button>
                </span>
                <span class='window-btn-wrapper'>
                  <button className='window-btn' id='graphqlbtn' onClick={() => { this.handleWindowChange(); }}>GraphQL</button>
                </span>
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
        }
      </div>
    );
  }
}



render(<App />, document.getElementById('root'));
