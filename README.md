![Alt text](public/assets/lucidlogo-transparent.png?raw=true "Title")
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Make%20development%20easier%20with%20Lucid.&url=https://github.com/Gossamer-React/React-Lucid&hashtags=react,graphql,apollographql,javascript,programming,developers,chrome%20@neyser_zana%20@eterna_t%20@yongnicholaskim%20@Niantendo)
![AppVeyor](https://img.shields.io/badge/build-passing-green.svg)
![AppVeyor](https://img.shields.io/badge/License-MIT-blue.svg)
## Lucid 
*A React-GraphQL developer tool for Chrome.*

Lucid is a React / GraphQL Chrome Developer Tool designed to help developers debug their React applications that depend on GraphQL resources. Lucid  allows you to visualize the component hierarchy of your React application, and your GraphQL schema, queries, and mutations side by side, making debugging fast and focused.

**IMPORTANT:**  Lucid is in *BETA* mode and works best for React v16+ local projects in development environments. 

## How It Works
### React Tab
Lucid parses through your React app to generate an interactive tree graph representing your React component hierarchy, with node-specific state and props data. The tree updates upon each change to the React app's state, and displays a log of state diffs on the left. This is done by creating a persistent data bridge to the user's React application via the Javascript API for WebExtensions' background and content scripts. Lucid injects scripts utilizing React DevTool's Global Hook to recursively traverse through the React DOM each time setState is called, resulting in a tree and a log that each display real-time feedback. Our app itself uses React internally so as the state of your live app changes, the Lucid tree graph will also provide visual feedback of data flow and state changes through the React components immediately.

### GraphQL Tab
Lucid intercepts HTTP requests using Chrome Devtool APIs to display a log of real-time Apollo client queries and mutations, along with associated response objects. Lucid also uses GraphQL schema introspection to display schema information from the server. This allows full-stack developers to debug their app from the front-end all the way through to the back-end, as requests are generated, responses come back from the server, data flows through React components, and render in the DOM. 

## Setup
### Install from Chrome Extension Store

1. Install <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">React Developer Tools</a>. 

2. Install <a href="https://chrome.google.com/webstore/category/extensions">Lucid</a>.

3. Run your React-GraphQL application or open a site that uses React v16+ or GraphQL.

4. Open Chrome Developer Tools (Inspect / Cmd+Opt+I / Ctrl+Shift+I), and click on the Lucid panel.

5. Have fun! :)

### Build your own extension

1. Clone the repo and install dependendies: 

    ```npm install```

2. Build Lucid: 

    ```npm run build ```

3. Navigate to chrome://extensions (or in your Chrome Browser Settings, click on **More Tools** >> **Extensions**). 

4. Click **Load Unpacked**. Select the './react-lucid/build' folder from your local directory.

5. Have fun!

## How to Use
### GraphQL View 
Upon opening Lucid, users first land on the GraphQL panel where a log of previous API requests is available, as well as their associated responses. A GraphQL schema of all available types, queries, and mutations is also automatically fetched from the GraphQL server when Lucid is initialized. 

**NOTE:**  Lucid only listens for HTTP requests when it is open in the Chrome Developer Tool panel. To see any requests that were made upon initial page load, reload your React page after opening Lucid in your Chrome browser. See a chronological log of GraphQL HTTP Requests on the left, and click on each log to view the HTTP response for that particular request. At the bottom of the panel, you'll find your React application's GraphQL schema.

![](public/ReqResJson.gif) 

### Component Tree View
In the React Component Tree panel is a tree graph representing your loaded React application's component hierarchy. In the top left box, you will see the state and props data of any tree graph component you hover over. Below that, you will see a log of state diffs whenever you trigger setState() in your app.

![](public/StateDiff.gif)

Hovering over the React Component Tree chart displays the state and props of each component in the State/Props Panel. The State Diff Log tracks each event that changes the state in the loaded React application. 
You also have the option to filter out specified higher-order components from your tree graph (e.g. Redux, Apollo-GraphQL, and React Router).

![](public/TreeDisplay.gif)

![](public/TreeFilter.gif)

## Contributing 

Please feel free to fork this repo and submit pull requests! Lucid is currently in beta release. Please let us know about bugs! Also, if you have any requests or suggestions for features, please contact us at gossamer.lucid@gmail.com.

## Coming Soon


## Our Team

Yong-Nicholas Kim (https://github.com/yongnicholaskim)

Nian Liu (https://github.com/nianliu18)

Eterna Tsai (https://github.com/eternalee)

Neyser Zana (https://github.com/neyser95)

## License
MIT
