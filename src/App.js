import React from 'react';
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";

import { Dashboard, Login, Statastics } from "./components";
import { createBrowserHistory ,createHashHistory} from "history";
import './App.css'
const hist = createBrowserHistory();
function App() {
  return (
    <React.Fragment>
      <Router history={hist}>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/statastics" component={Statastics} />

      </Router>
    </React.Fragment>
  );
}

export default App;