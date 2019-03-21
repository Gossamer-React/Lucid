import { stringifyReactDOM } from '../test/stringify_function';
const util = require('util');


function Dom() {
  return this.circular = {
    name: 'ContactsTableWrapper',
    attributes: { Id: 4 },
    children: [
      {
        Props: {
          children: {
            _owner: this
          }
        },
        State: {},
        attributes: { Id: 7 },
        children: [
          {
            Props: {
              children: {
                _owner: this
              }
            },
            State: {
              filterObject: {},
              children: {
                _owner: this
              }
            },
            attributes: { Id: 7 },
            children: [{}],
            name: 'ContactsTable'
          }
        ],
        name: 'ContactsTable'
      },
      {
        Props: {
          children: {}
        },
        State: {
          filterObject: {},
          children: {
            _owner: this
          }
        },
        attributes: { Id: 7 },
        children: [{}],
        name: 'ContactsTable'
      }
    ],
    State: { columns: [null], contacts: [null], isLoading: false },
    Props: {}
  };
}

const reactDOM = [new Dom()];

const result = {
  name: 'ContactsTableWrapper',
  attributes: { Id: 4 },
  children: [
    {
      Props: {
        children: {
          _owner: 'circular ref'
        }
      },
      State: {},
      attributes: { Id: 7 },
      children: [
        {
          Props: {
            children: {
              _owner: 'circular ref'
            }
          },
          State: {
            filterObject: {},
            children: {
              _owner: 'circular ref'
            }
          },
          attributes: { Id: 7 },
          children: [{}],
          name: 'ContactsTable'
        }
      ],
      name: 'ContactsTable'
    },
    {
      Props: {
        children: {}
      },
      State: {
        filterObject: {},
        children: {
          _owner: 'circular ref'
        }
      },
      attributes: { Id: 7 },
      children: [{}],
      name: 'ContactsTable'
    }
  ],
  State: { columns: [null], contacts: [null], isLoading: false },
  Props: {}
};

const domObj = {
  type: 'reactTraverser',
  data: reactDOM
}

test('traverse function should be able to stringify circular object', () => {
  let resultDOM = JSON.parse(JSON.stringify(domObj, stringifyReactDOM));
  console.log(util.inspect(resultDOM, false, null, true /* enable colors */))
  expect(resultDOM.data[0]).toEqual(result);
});
