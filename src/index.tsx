import React from 'react';
import ReactDOM from 'react-dom';
import "./fonts/fonts.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

/*const SelectContents = [
  "path/to/dataset", "path/to/newdataset", "path/to/nedata", "path/to/nedataset", "path/to/newdata", "path/to/newdata123"
];*/

const SelectContents2 = [
  { value: "1", label: "11" }, { value: "12", label: "1212" }, { value: "123", label: "123123" }
];


ReactDOM.render(
  <App Items={SelectContents2} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
