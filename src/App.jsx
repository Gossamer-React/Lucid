import React from 'react';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import TreeDiagram from './components/TreeDiagram.jsx';

const App = () => {
    return (
        <div id="app-container">
            <LogContainer />
            <h1>Welcome to React-Lucid</h1>
            <TreeDiagram />
        </div>
    )
}

export default App;
