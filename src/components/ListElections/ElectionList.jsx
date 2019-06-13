import React from "react";

import ElectionItem from "./ElectionItem";

export default class extends React.Component {
  render() {
    return (
      <ul className="list-elections">
        {this.props.elections.map((election, index) => (
          <ElectionItem key={index.toString()} year={election.year} types={election.types} />
        ))}
      </ul>
    );
  }
}
