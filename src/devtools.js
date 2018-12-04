import React, { Component } from 'react';
import { render } from 'react-dom';
import { introspectionQuery } from 'graphql';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import GraphQLContainer from './containers/GraphQLContainer';
import StateContainer from './containers/StateContainer.jsx';
import TreeDiagram from './components/TreeDiagram.jsx';
import recurseDiff from './stateDiff';
import StatePropsBox from './components/StatePropsBox';
import filter from './filterDOM';

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
      componentsToFilter: [],
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);

    chrome.devtools.panels.create("Lucid", null, "devtools.html");
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

    //* Leverage Javascript API for WebExtensions to access browser network tab and log req/res objects in state log array
    chrome.devtools.network.onRequestFinished.addListener(function (httpReq) {
      if (httpReq.request.postData !== undefined) {
        let reqBody = JSON.parse(httpReq.request.postData.text);

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

  //* function to dynamically grab url for backend, and fetch GraphQL schema from Apollo Server and add to state
  fetchSchemaFromGraphQLServer() {
    if (this.state.logs.length !== 0) {
      let url = this.state.logs[this.state.logs.length - 1].req.url;

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
    
    handleFilter(e, arr) {
      //* if first index of arr is not in componentsToFilter arr, set incoming array to componentsToFilter
      if(e.target.classList.contains('toggleOn')) {
        e.target.classList.remove('toggleOn')
      } else {
        e.target.classList.add('toggleOn');
      }
      let result = []; 
      if(!this.state.componentsToFilter.includes(arr[0])) {
        let componentsArr = this.state.componentsToFilter.concat(arr);
        filter(this.state.appState, componentsArr, result);
        this.setState({
          componentsToFilter: componentsArr,
          filteredData: result
        });
      }
      else {
        //* if componentsToFilter is not empty iterate through 
        let list = this.state.componentsToFilter;
        for (let i = 0; i < list.length; i++) {
          if (arr.includes(list[i])) {
            // output.push(list[i]);
            list.splice(i--, 1); 
          }
        }
        filter(this.state.appState, list, result);
        this.setState({
          componentsToFilter: list,
          filteredData: result
        });
      }
    }

  //* invoke schema fetch only after a log object from a previous response is available
  componentDidUpdate(prevProps, prevState) {
    console.log('LENGTH: ', this.state.appFilteredDOM.length)
    if (this.state.schema === "GraphQL schema not available.") {
      this.fetchSchemaFromGraphQLServer();
    }

    if (prevState.appState !== this.state.appState) {
      console.log(this.state.componentsToFilter);
      if (this.state.componentsToFilter.length) {
        let result = [];
        filter(this.state.appState, this.state.componentsToFilter, result);
        this.setState({ appFilteredDOM: result });
      }
    }
  }


  // * Handles the tab click for tree and req/res window
  handleWindowChange(target) {
    console.log(target);
    if (this.state.window === 'Graphql' && target.dataset.btn === 'React') {
      this.setState({ window: 'React' });
      document.querySelector('#reactbtn').classList.add('active');
      document.querySelector('#graphqlbtn').classList.remove('active');
    } else if(this.state.window === 'React' && target.dataset.btn === 'Graphql'){
      this.setState({ window: 'Graphql' });
      document.querySelector('#reactbtn').classList.remove('active');
      document.querySelector('#graphqlbtn').classList.add('active');
    }
  }

  // * Handles the filter for the component tree
  handleFilter(arr) {
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
      this.setState({
        componentsToFilter: list,
        appFilteredDOM: result
      });
    }
  }

  //* handle data coming back from mouse hover in tree diagram
  handleMouseOver(data) {
    this.setState({
      nodeData: data
    })
  }

  // * handles the clearing of both the  request log and diff log
  handleClearLog(e) {
    const data = e.target.dataset.log;
    if (data === 'req-log') {
      this.setState({ logs: [] });
    } else {
      this.setState({ stateDiff: [] });
    }
  }

  // * handles the change of a log
  handleLogChange(reqId) {
    let req = this.state.logs[reqId];
    this.setState({ logView: req })
  }

  render() {
    //if this.state.appState has not been populated by reactTraverser.js, show a message asking users to setState(), else render App (Log, Tree, GraphQL)
    return (
      <div>
        {this.state.appState.length === 0 ?
          <div id='devToolsLoader'>
            <h1>Please trigger a setState() to activate Lucid devtool.<br /></h1>
            <p>Lucid works best on React v15/16</p>
          </div>
          :
          <div id='app-container'>
            <div id='window'>
              <div id='window-nav'>
                <span class='window-btn-wrapper'>
                  <button className='window-btn active' id='graphqlbtn' data-btn='Graphql' onClick={(e) => { this.handleWindowChange(e.target); }}>GraphQL</button>
                </span>
                <span class='window-btn-wrapper'>
                  <button className='window-btn' id='reactbtn' data-btn='React' onClick={(e) => { this.handleWindowChange(e.target); }}>Component Tree</button>
                </span>
              </div>

              {/* This checks what window the user has click on. 
              They can click to see the state tree or 
              request/reponse from their httprequest */}
              {this.state.window === 'Graphql' ? (
                <div class='graphQLTab'>
                  <LogContainer logs={this.state.logs} clearLog={this.handleClearLog.bind(this)} logChange={this.handleLogChange.bind(this)} />
                  <GraphQLContainer logs={this.state.logs} schema={this.state.schema} log={this.state.logView} />
                </div>
              ) : (
                  <div class='reactTab'>
                    <StateContainer clearLog={this.handleClearLog.bind(this)} stateDiffs={this.state.stateDiff} />
                    <TreeDiagram appState={this.state.appFilteredDOM.length === 0 ? this.state.appState : this.state.appFilteredDOM} handleMouseOver={this.handleMouseOver} handleFilter={this.handleFilter.bind(this)} />
                    <StatePropsBox nodeData={this.state.nodeData} />
                  </div>
                )}
            </div>
          </div>
        }
      </div>
    );
  }
}



render(<App />, document.getElementById('root'));
