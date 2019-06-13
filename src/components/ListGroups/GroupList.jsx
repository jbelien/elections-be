import React from "react";

import GroupItem from "./GroupItem";

export default class extends React.Component {
  render() {
    const { year, type, entities, groups, totalVotes } = this.props;

    return (
      <ul className="list-groups">
        {groups.map(group => {
          return (
            <GroupItem
              key={group.id}
              year={year}
              type={type}
              entities={entities}
              group={group}
              totalVotes={totalVotes}
            />
          );
        })}
      </ul>
    );
  }
}
