import React, { Component } from 'react'
import fetchSchema from 'fetch-graphql-schema';
import Server from '../components/Server'
import GraphQL from '../components/GraphQL'

export default class Effects extends Component {
  constructor() {
    super();

    this.state = {
      graphQLSchema: ''
    };

    this.getSchema = this.getSchema.bind(this);
  }

  getSchema() {
    fetchSchema('http://localhost:4000/graphql')
      .then(schemaJSON => {
        this.setState({
          graphQLSchema: schemaJSON
        })
      });
  }

  render() {
    return (
      <div>
        <Server schema={this.state.graphQLSchema} />
        <GraphQL />
      </div>
    )
  }
}
