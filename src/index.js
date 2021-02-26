import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import pkg from 'semantic-ui-react/package.json';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'

import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";


const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000
}



ReactDOM.render(
  <React.StrictMode>
     <Provider template={AlertMUITemplate} {...options}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
