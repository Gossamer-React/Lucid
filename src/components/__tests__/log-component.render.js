import React from 'react';
import renderer from 'react-test-renderer';
import Log from '../Log/Log.jsx';

// If query being made is from an Apollo server
// Test to make sure that comopnent does not change unexpectdly.
test('Log component displays proper information from Apollo server.', () => {
  const log = renderer.create(
    <Log
        key={0}
        operationName='Apollo-query'
        query={`mutation TodoMutation($title: string!) {
          addTodo(title: $title) {
            id
            title
            completed
            __typename
          }
        }`}
        variables={{"title": "laundry"}}
        logId= '0'
      />
  );

  let logComponent = log.toJSON();
  expect(logComponent).toMatchSnapshot();
});