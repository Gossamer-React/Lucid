![Alt text](public/assets/lucidlogo-transparent.png?raw=true "Title")
![AppVeyor](https://img.shields.io/appveyor/ci/:gossamer/:build.svg)
# Lucid 
*A React-GraphQL developer tool.*

Lucid is a React / GraphQL Developer Tool designed to help developers debug their React applications that depend on GraphQL resources. Lucid devtool allows you to visualize the component hierarchy of your React application and your GraphQL schema, queries, and mutations side by side, making debugging easier.

**IMPORTANT:**  Lucid is in *BETA* mode and works best for React v16+ local projects in development environments. 

# How It Works
## React Tab
Lucid parses through your React app to generate an interactive tree graph representing your React component hierarchy with node-specific state and props data. The tree updates upon each change to user app state and displays a log of state diffs on the left. This is done by creating a persistent data bridge to the user application via Chrome background and content scripts. Lucid injects scripts utilizing React DevTool's Global Hook to recursively traverse through the React DOM each time setState is called, resulting in a tree and log that display real-time feedback. Our app itself uses React internally so as the state of your live app changes, the Lucid tree graph will also provide visual feedback of data flow and state changes through the React components in real-time.

## GraphQL Tab
Lucid intercepts HTTP requests using Chrome devtool APIs and GraphQL's schema introspection to display a log of real-time Apollo client queries and mutations, along with GraphQL schema information and response objects. This allows full-stack developers to debug their app from the front-end through to the back-end, as requests are generated, flow through the server, and back to the DOM. 

# Setup
## Install from Chrome Extension Store

1. Install <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">React Developer Tools</a>. 

2. Install <a href="https://chrome.google.com/webstore/detail/debux/ooihnkghpifccalpfakdnlolfaiidfjp?authuser=1">Lucid</a>.

3. Run your React-GraphQL application or open a site that uses React v16+ or GraphQL.

4. Open Chrome Developer Tools (Inspect / Cmd+Opt+I / Ctrl+Shift+I), and click on the Lucid panel.

5. Have fun! :)

## Build your own extension

1. Clone the repo and install dependendies: 

    ```npm install```

2. Build Lucid: 

    ```npm run build ```

3. Navigate to chrome://extensions (or in your Chrome Browser Settings, click on **More Tools** >> **Extensions**). 

4. Click **Load Unpacked**. Select the './react-lucid/build' folder from your local directory.

5. Have fun!

# How to Use
## GraphQL View 
When opening Lucid devtool, users land on the GraphQL panel where a log of previous API requests is available, as well as their associated reponses. A GraphQL schema of all available types, queries, and mutations is also automatically fetched from the GraphQL server. 
Note: Lucid devtool only listens for HTTP requests when it's open in the developer tool panel. To see any requests that were made upon initial page load, reload your page after opening Lucid devtool. 

![](public/ReqResJson.gif)

See a chronological log of GraphQL HTTP Requests on the left, and click on each log to view the HTTP response for that particular request. At the bottom of the panel, you'll also see your application's GraphQL schema.

## Component Tree View
In the React Component Tree panel is a tree graph representing your loaded React application's component hierarchy. In the top left box, you will see the state and props data of any tree graph component you hover over. Below, you will see a log of state diffs whenever you trigger setState() in your app.

![](public/StateDiff.gif)

Hovering over the Tree Chart renders state and props of each component in the __State/Props Panel__. The __State Diff Log__ tracks each event that changes the state in the loaded React application. You also have the option to filter out specified higher-order components from your tree graph (e.g. Redux, Apollo-GraphQL and React Router).

![](public/TreeDisplay.gif)

![](public/TreeFilter.gif)

# Contributing 

Please feel free to fork this repo and submit pull requests! Lucid is currently in beta release. Please let us know about bugs! Also, if you have any requests or suggestions for features, please contact us at gossamer.lucid@gmail.com.

# Coming Soon


# Our Team

Yong-Nicholas Kim (https://github.com/yongnicholaskim)

Nian Liu (https://github.com/nianliu18)

Eterna Tsai (https://github.com/eternalee)

Neyser Zana (https://github.com/neyser95)

# License
MIT
