import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListElections from "./ListElections";
import ListTypes from "./ListTypes";
import ListGroups from "./ListGroups";
import ListCandidates from "./ListCandidates";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListElections} />
          <Route exact path="/:year" component={ListTypes} />
          <Route exact path="/:year/:type" component={ListGroups} />
          <Route exact path="/:year/:type/:idList" component={ListCandidates} />
        </Switch>
      </BrowserRouter>
    );
  }
}
