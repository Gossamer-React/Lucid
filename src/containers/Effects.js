import React, { Component } from 'react';
import Server from '../components/Server';
import GraphQL from '../components/GraphQL';
// import {
//   introspect,
//   introspectURL,
//   introspectFile
// } from 'graphql-introspect';

// import fetchSchema from 'fetch-graphql-schema';
// import { HttpLink } from 'apollo-link-http';
// import fetch from 'node-fetch';


// import 'isomorphic-fetch';
// import { parse, introspectionQuery } from 'graphql';
// import { createApolloFetch } from 'apollo-fetch';

// const apolloFetch = createApolloFetch({ uri: `http://localhost:4000/graphql` });
// const query = parse(introspectionQuery);

export default class Effects extends Component {
  constructor() {
    super();

    this.state = {
      graphQLSchema: ''
    };

    this.getSchema = this.getSchema.bind(this);
  }

  // getSchema() {
  //   fetchSchema('http://localhost:4000/graphql')
  //     .then(schemaJSON => {
  //       this.setState({
  //         graphQLSchema: schemaJSON
  //       })
  //     });
  // }

  // getSchema() {
  //   const link = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

  //     export default async() => {
  //     const schema = await introspectSchema(link);
      
  //     this.setState({
  //       graphQLSchema: schema
  //     })

  //     console.log('hello', schema);
  //     return schema;
  //   }
  // }

  // getSchema() {
  //   apolloFetch({ query })
  //     .then((result) => {
  //       const schema = JSON.stringify(result, null, '  ');
  //       console.log(schema);
  //       this.setState({
  //         graphQLSchema: schema
  //       })
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  getSchema() {
    
    introspectURL('http://localhost:4000/graphql')
      .then(result => { 
        const schema = JSON.stringify(result, null, '  ');
        console.log(schema);
        this.setState({
          graphQLSchema: schema
        })
      })
      .catch((err) => {
        console.error(err);
      });

  }

  render() {
    console.log('hello', this.state.graphQLSchema);

    return (
      <div>
        <Server schema={this.state.graphQLSchema} />
        <GraphQL />
      </div>
    )
  }
}
