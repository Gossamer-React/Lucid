import React from 'react';
import renderer from 'react-test-renderer';
import App from '../devtools';

// If query being made is from an Apollo server
// Test to make sure that comopnent does not change unexpectdly.
test('Log component displays proper information from Apollo server.', () => {
  const app = renderer.create(
    <App />
  );

  let appComponent = app.toJSON();
  expect(appComponent).toMatchSnapshot();
});