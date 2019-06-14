import React from "react";

export default class extends React.Component {
  render() {
    const { candidate } = this.props;

    return (
      <tr className="table-candidates-candidate">
        <td className="table-candidates-candidate-nr">{candidate.nr}</td>
        <td className="table-candidates-candidate-name">{candidate.name}</td>
        <td className="table-candidates-candidate-votes">{candidate.votes} vote(s)</td>
      </tr>
    );
  }
}
