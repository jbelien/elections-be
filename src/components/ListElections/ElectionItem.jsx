import React from "react";
import { Link } from "react-router-dom";

import { electionsTypes } from "../../config";

export default class extends React.Component {
  render() {
    return (
      <li className="list-elections-election">
        <Link to={`/${this.props.year}`}>
          <h2>{this.props.year}</h2>
          <ul className="list-elections-election-types">
            {this.props.types.map(type => (
              <li key={type}>
                {electionsTypes[type].name_fr}
                <br />
                {electionsTypes[type].name_nl}
              </li>
            ))}
          </ul>
        </Link>
      </li>
    );
  }
}
