import React from "react";

import CandidateRow from "./CandidateRow";

export default class extends React.Component {
  render() {
    const { title, candidates } = this.props;

    if (candidates.length === 0) return null;

    return (
      <div>
        <h5>{title}</h5>
        <table className="table-candidates">
          <tbody>
            {candidates.map(candidate => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
