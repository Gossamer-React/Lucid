import React, { Component } from 'react'
import Server from '../components/Server'
import GraphQL from '../components/GraphQL'

export default class Effects extends Component {
  render() {
    return (
      <div>
        <Server/>
        <GraphQL/>
      </div>
    )
  }
}
