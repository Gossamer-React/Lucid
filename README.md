# React-Lucid
A React-GraphQL developer tool.

![Alt text](public/assets/logo-text.png?raw=true "Title")

React-Lucid is a React / GraphQL DevTool designed for helping developers debug their React applications that depend on GraphQL resources more efficiently. React-Lucid allows you to visualize the component hierarchy of your React application and your GraphQL schema, queries, and mutations side by side, making development a breeze.

### --Usage--
**Note:**  The current version of React-Lucid works best for local projects using React v16+. 

### --Set Up | Install From Chrome Extension Store--

1. Install <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">React Developer Tools</a>. 

2. Install <a href="https://chrome.google.com/webstore/detail/debux/ooihnkghpifccalpfakdnlolfaiidfjp?authuser=1">React-Lucid</a> to your chrome://extensions from the <a href="https://chrome.google.com/webstore/category/extensions">Chrome Web Store</a>.

3. Run your React-GraphQL application or open a site that uses React v16+.

4. Open Chrome Developer Tools, Click on the “>>” button and select React-Lucid.

5. Have fun!

### --Set up | Build your own--

1. Clone the repo and install dependendies: 

    ```npm install```

2. Build React-Lucid to be used in Chrome Dev Tools: 

    ```npm run build ```

3. In Chrome Browser, open more tools and Extensions tab and click 'Load Unpacked' 

4. Navigate to your local React-Lucid directory and select the folder './react-lucid/build'

5. Have fun!

### GraphQL View
In the graphql panel of our devtool you'll be able to see all the previous request that you have made after you have open our devtool. If you want to see the request that are made when your page is loaded make sure you reload your page after you have open our devtool. 

## Show GIF display the req and response and how the JSON viewer works

You will have access to a request log on the left where you will all the previous request you've made, you can click on this logs to view previous responses. At the bottom of the panel you'll also have access to your app's schema.

## Panel GIF showing previous request 

### Component Tree View
In our component tree panel you will see a tree hierarchy of your application with options to filter out a few components fromm your tree.

## GIF showing the how to fliter tree

on the left of the panel you will see a box the shows the state and props of any component you hover over the tree and also what is different in your state when you make a setState.

## Panel GIF showing how the tree opens and GIF showing how the hover works and showing the diff panel

## Contributing

Please feel free to fork this repo and submit pull requests. Also, if you have any requests or suggestions for features, please contact us.

## Our Team

Yong-Nicholas Kim (https://github.com/yongnicholaskim)

Nian Liu (https://github.com/nianliu18)

Eterna Tsai (https://github.com/eternalee)

Neyser Zana (https://github.com/neyser95)

## License
MIT
