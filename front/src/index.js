import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";
import uuid from 'react-uuid'
require('dotenv').config()
// console.log(process.env);
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.status === 401) {

  }
  return Promise.reject(error);
});

axios.interceptors.request.use(function (request) {
  request.headers = {'Content-Type': 'application/json', 'Allusion': localStorage.getItem('Allusion')};
  return request;
}, function (error) {
  if (error.status === 401) {

  }
  return Promise.reject(error);
});

if(localStorage.getItem('Allusion') === null) {
  localStorage.setItem('Allusion', uuid() + Date.now());
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
