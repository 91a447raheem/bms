import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Dashboard, Login } from "./components";

import './App.css'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    </React.Fragment>
  );
}

export default App;