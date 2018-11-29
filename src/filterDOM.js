let result = []
let filter = (node, componentsArr, childrenArr = result) => {
  if (node.name === undefined) { filter(node[0], componentsArr) }
  else {
    if (componentsArr.includes(node.name)) {
      if (node.children && node.children.length) {
        node.children.forEach(node => {
          console.log('recurse', node, componentsArr, childrenArr)
          filter(node, componentsArr, childrenArr)
        });
      }
    } else {

      let copy = JSON.parse(JSON.stringify(node));

      if (node.children && node.children.length) {
        console.log('copychildren before overwrite', copy.children)
        copy['children'] = ['?!?!'];
        console.log('copychildren after overwrite', copy.children)
        childrenArr.push(copy);
        node.children.forEach(node => {
          console.log('nodechildren', node.children)
          filter(node, componentsArr, copy.children)
        })
      }
    }

  }
}

//filter react-router
const reactRouterComponents = [
  'BrowserRouter',
  'Router',
  'Switch',
  'Route',
  'Link',
  'StaticRouter',
  'NavLink',
  'Redirect',
  'MemoryRouter',
  'Prompt',
  'NavLink',
];

//filter redux
const reduxComponents = ['Provider', 'Connect'];

//filter apollo
apolloComponents = [
  'ApolloProvider',
  'ApolloConsumer',
  'Query',
  'Mutation',
  'Subscription',
  'MockedProvider',
  'graphql',
  'compose',
  'withApollo'
];