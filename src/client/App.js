import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import './app.scss';

import ReactImage from './assets/react.png';

import Username from "./components/Username";

function App() {
    return (
        <Provider store={store}>
            <Username/>
            <img src={ReactImage} alt="react"/>
        </Provider>
    );
}

export default App;