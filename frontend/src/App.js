import React from 'react';
import Lottery from './components/Lottery';
import GetStarted from "./components/GetStarted";
import Refer from "./components/Refer";
import Loading from "./components/Loading";
import Leaderboard from "./components/Leaderboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Lottery />
          </Route>
          <Route path="/get-started">
            <GetStarted />
          </Route>
          <Route path="/refer">
            <Refer />
          </Route>
          <Route path="/loading">
            <Loading />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
