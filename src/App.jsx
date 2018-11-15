import React from 'react';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import Effects from './containers/Effects';

const App = () => {
    return (
        <div id="app-container">
            <LogContainer />
            <h1>Welcome to React-Lucid</h1>
            <Effects />
        </div>
    )
}

export default App;