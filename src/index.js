/* istanbul ignore file */

import axios from "axios";

// Setup base url based on env variables
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

ReactDOM.render(<Application />, document.getElementById("root"));
