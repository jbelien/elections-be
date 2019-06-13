import React from "react";

import { elections } from "../config";
import TypeList from "./ListTypes/TypeList";

import "../assets/sass/listTypes.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const year = parseInt(props.match.params.year);

    this.state = {
      year: year,
      election: elections.find(e => e.year === year)
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.election.year}</h1>
        <TypeList year={this.state.election.year} types={this.state.election.types} />
      </div>
    );
  }
}
