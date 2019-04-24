import React from 'react';
import renderer from 'react-test-renderer';
import LogContainer from './../LogContainer';
import Log from './../../LogComponent/Log.jsx';

//* Tests to make sure that comopnent does not change unexpectdly.
describe('<LogContainer />', () => {
  it('Will render the LogContainer with an emapy array of logs and match the snapshot', ()=> {
    const logContainer = renderer.create(
      <LogContainer
        logs={[]}
      />
    ).toJSON();

    expect(logContainer).toMatchSnapshot();
  });

  it('Will render the LogContainer with one log and match the snapshot', ()=> {
    const logContainer = renderer.create(
      <LogContainer
        logs={[{
          req: {
            postData: {
              text:JSON.stringify({
                operationName: 'Request One',
                query: 'This is the query.',
                variables: { title: 'laundry' }
              })
            }
          }
        }]}
      />
    ).toJSON();

    expect(logContainer).toMatchSnapshot();
  });
});
