import React from "react";

import { elections } from "../config";
import ElectionList from "./ListElections/ElectionList";

import "../assets/sass/listElections.scss";

export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <span role="img" aria-label="Belgium">
            🇧🇪
          </span>
          Elections BE
        </h1>
        <ElectionList elections={elections} />,
      </div>
    );
  }
}
