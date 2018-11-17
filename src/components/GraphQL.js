import React, { Component } from 'react'
import QueryString from './QueryString'
import QueryResult from './QueryResult'

export default class GraphQL extends Component {
  render() {
    return (
      <div>
        <QueryString />
        <QueryResult />
      </div>
    )
  }
}
