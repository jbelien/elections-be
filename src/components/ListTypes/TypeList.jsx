import React from "react";

import { electionsTypes } from "../../config";
import TypeItem from "./TypeItem";

export default class extends React.Component {
  render() {
    return (
      <ul className="list-types">
        {this.props.types.map(type => {
          return (
            <TypeItem
              key={type}
              year={this.props.year}
              type={type}
              name_fr={electionsTypes[type].fr}
              name_nl={electionsTypes[type].nl}
            />
          );
        })}
      </ul>
    );
  }
}
