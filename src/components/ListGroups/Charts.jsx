import React from "react";

import SeatsChart from "./Charts/SeatsChart";
import VotesChart from "./Charts/VotesChart";

export default class extends React.Component {
  render() {
    const { groups, totalVotes } = this.props;

    if (totalVotes === 0) {
      return null;
    }

    return (
      <div className="list-groups-charts">
        <div>
          <VotesChart groups={groups} totalVotes={totalVotes} />
        </div>
        <div>
          <SeatsChart groups={groups} />
        </div>
      </div>
    );
  }
}
