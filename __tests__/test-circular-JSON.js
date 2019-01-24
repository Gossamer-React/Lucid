import { stringifyObject } from '../test/stringify_function';

test('traverse function should be able to stringify circular object', () => {
  console.log(stringifyObject);
});

const circularObject = {
  id: 4,
  isDOM: true,
  props: {},
  state: null,
  name: 'div',
  children: [{
    id: 5,
    isDOM: false,
    name: 'Provider',
    props: { store: 'object*', children: 'object*' },
    state: null,
    children: [{
      id: 6,
      isDOM: false,
      props: {},
      state: {},
      name: 'BrowserRouter',
      children: [{
        id: 7,
        isDOM: false,
        name: 'Router',
        props: {},
        state: {},
        children: [{
          id: 8,
          isDOM: true,
          name: 'div',
          props: {},
          state: null,
          children: [
            {
              id: 9,
              isDOM: false,
              name: 'NavBar',
              props: {},
              state: {},
              children: [],
            },
            {
              id: 10,
              isDOM: true,
              name: 'div',
              props: {},
              state: null,
              children: [],
            },
          ],
        }],
      }],
    }],
  }],
}