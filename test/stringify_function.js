export const stringifyReactDOM = (key, val) => {
  // return JSON.stringify(reactDOMObject);
  if (val instanceof Object) {
    for (let prop in val) {
      if (prop === 'data') {
        try { 
          JSON.stringify(stringifyReactObject(val[prop][0]));
        } catch (err) {
          return err;
        }
      }
    }
  }

  return val;
}

const stringifyReactObject = (object) => {
  for (let key in object) {
    if (object[key].hasOwnProperty('children') || key === 'children') {
      if (object[key].children instanceof Object && object[key].children.hasOwnProperty('_owner')) {
        try {
          object[key].children._owner = JSON.stringify(object[key].children._owner);
        } catch (err) {
          object[key].children._owner = 'circular ref';
        }
      } else if (Array.isArray(object[key])) {
        stringifyReactArr(object[key]);
      }
    }
  }

  return object;
}

const stringifyReactArr = (array) => {
  array.forEach(child => {
    stringifyReactObject(child);
  });
}