import { stringifyObject } from '../test/stringify_function';

function Foo() {
  this.abc = "Hello";
  this.circular = {
    name: this
  };
}

const foo = new Foo();

test('traverse function should be able to stringify circular object', () => {
  let result = stringifyObject(foo);
  console.log(result);
});

