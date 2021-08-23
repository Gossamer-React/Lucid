// * Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql/utilities';
import getStateDiffs from './stateDiff';
import filter from './filterDOM';
// * Components
import AppNav from './components/AppNav/AppNav';
import GraphQLTab from './components/GraphQLTab/GraphQLTab';
import ReactTab from './components/ReactTab/ReactTab';
// * CSS
import styles from './devtools.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: 'Graphql',
      logs: [],
      appReactDOM: [],
      appFilteredDOM: [],
      appState: [],
      nodeData: [],
      schema: 'GraphQL schema not available.',
      stateDiff: [],
      logView: null,
      componentsToFilter: []
    };

    chrome.devtools.panels.create('Lucid', null, 'devtools.html');
  }

  componentDidMount() {
    let chromePort = chrome.runtime.connect({
      name: 'devtool-background-port'
    });

    chromePort.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    let timeout;
    chromePort.onMessage.addListener(req => {
      // * checks if the message it's receiving is about a change in the DOM
      if (req.type === 'appState') {
        let oldstate = this.state.appReactDOM;
        this.setState({ appReactDOM: req.msg });

        if (oldstate.length > 0) {
          let newStateDiffs = getStateDiffs(oldstate, this.state.appReactDOM);
          let stateDiff = this.state.stateDiff.slice();
          stateDiff.push(...newStateDiffs);
          this.setState({ stateDiff });
        }

        //if there is an active setTimeout, clear it
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.setState({ appState: req.msg });
        }, 1000);
      }
    });

    //* Leverage Javascript API for WebExtensions to access browser network tab and log req/res objects in state log array
    chrome.devtools.network.onRequestFinished.addListener(httpReq => {
      if (httpReq.request.postData !== undefined) {
        let reqBody = JSON.parse(httpReq.request.postData.text);

        if (reqBody.variables && reqBody.query) {
          let log = {};
          log.req = httpReq.request;

          if (httpReq.response.content) {
            httpReq.getContent(responseBody => {
              if (responseBody === '') {
                log.res = 'No response received';
              } else {
                const parsedResponseBody = JSON.parse(responseBody);
                log.res = parsedResponseBody;
                this.setState({
                  logs: [...this.state.logs, log],
                  logView: log
                });
              }
            });
          }
        }
      }
    });
  }

  //* function to dynamically grab url for backend, and fetch GraphQL schema from Apollo Server and add to state
  fetchSchemaFromGraphQLServer() {
    if (this.state.logs.length !== 0) {
      let url = this.state.logs[this.state.logs.length - 1].req.url;

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() })
      })
        .then(res => res.json())
        .then(json =>
          this.setState({
            schema: JSON.stringify(json.data)
          })
        );
    }
  }

  //* invoke schema fetch only after a log object from a previous response is available
  componentDidUpdate(prevProps, prevState) {
    if (this.state.schema === 'GraphQL schema not available.') {
      this.fetchSchemaFromGraphQLServer();
    }

    if (prevState.appState !== this.state.appState) {
      if (this.state.componentsToFilter.length) {
        let result = [];
        filter(this.state.appState, this.state.componentsToFilter, result);
        this.setState({ appFilteredDOM: result });
      }
    }
  }

  // * Handles the tab click for tree and req/res window
  handleWindowChange = target => {
    if (target.dataset.btn === 'React') {
      this.setState({ window: 'React' });
    } else {
      this.setState({ window: 'Graphql' });
    }
  };

  // * Handles the filter for the component tree
  handleFilter = (e, arr) => {
    if (e.target.classList.contains('toggleOn')) {
      e.target.classList.remove('toggleOn');
    } else {
      e.target.classList.add('toggleOn');
    }
    let result = [];
    if (!this.state.componentsToFilter.includes(arr[0])) {
      let componentsArr = this.state.componentsToFilter.concat(arr);
      filter(this.state.appState, componentsArr, result);
      this.setState({
        componentsToFilter: componentsArr,
        appFilteredDOM: result
      });
    } else {
      let list = this.state.componentsToFilter;
      for (let i = 0; i < list.length; i++) {
        if (arr.includes(list[i])) {
          list.splice(i--, 1);
        }
      }
      filter(this.state.appState, list, result);
      this.setState({ componentsToFilter: list, appFilteredDOM: result });
    }
  };

  //* handle data coming back from mouse hover in tree diagram
  handleMouseOver = data => {
    this.setState({
      nodeData: data
    });
  };

  // * handles the clearing of both the  request log and diff log
  handleClearLog = e => {
    const data = e.target.dataset.log;
    if (data === 'req-log') {
      this.setState({ logs: [] });
    } else {
      this.setState({ stateDiff: [] });
    }
  };

  // * handles the change of a log
  handleLogChange = reqId => {
    let req = this.state.logs[reqId];
    req.id = reqId;
    this.setState({ logView: req });
  };

  render() {
    return (
      <div id='app-container'>
        <AppNav
          handleWindowChange={this.handleWindowChange}
          tab={this.state.window}
        />
        <GraphQLTab
          clearLog={this.handleClearLog}
          logs={this.state.logs}
          logChange={this.handleLogChange}
          log={this.state.logView}
          schema={this.state.schema}
          tab={this.state.window}
        />
        <ReactTab
          appState={
            this.state.appFilteredDOM.length === 0
              ? this.state.appState
              : this.state.appFilteredDOM
          }
          appStateLength={this.state.appState.length}
          clearLog={this.handleClearLog}
          handleMouseOver={this.handleMouseOver}
          handleFilter={this.handleFilter}
          nodeData={this.state.nodeData}
          stateDiffs={this.state.stateDiff}
          tab={this.state.window}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));