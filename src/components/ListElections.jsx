import React from "react";

import { elections, electionsTypes } from "../config";
import ElectionList from "./ListElections/ElectionList";

import "../assets/sass/listElections.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const e = elections.map(election => {
      election.types = election.types.map(type => {
        return {
          key: type,
          name_fr: electionsTypes[type].fr,
          name_nl: electionsTypes[type].nl
        };
      });

      return election;
    });

    this.state = { elections: e };
  }

  render() {
    return (
      <div>
        <h1>
          <span role="img" aria-label="Belgium">
            🇧🇪
          </span>
          Elections BE
        </h1>
        <ElectionList elections={this.state.elections} />,
      </div>
    );
  }
}
