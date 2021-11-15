import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import itemsJson from "./items.json";

document.body.classList.add('background');

ReactDOM.render(
    <App items={itemsJson.items}/>,
  document.getElementById('root')
);
