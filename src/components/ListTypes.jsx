import React from "react";
import { Link } from "react-router-dom";
import { elections, electionsTypes } from "../config";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.year = parseInt(props.match.params.year);
    this.election = elections.find(e => e.year === this.year);
  }

  renderList() {
    return this.election.types.map(type => {
      return (
        <li key={type}>
          <Link to={`/${this.election.year}/${type}`}>
            {electionsTypes[type].fr}
            <br />
            {electionsTypes[type].nl}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.election.year}</h1>

        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}
