import React from "react";
import ListList from "./GroupItem/ListList";

export default class extends React.Component {
  render() {
    const { year, type, entities, group, totalVotes } = this.props;

    return (
      <li className="list-groups-group" key={group.id}>
        <div className="list-groups-group-header" style={{ color: `#${group.color}` }}>
          <div className="list-groups-group-name">{group.name}</div>
          <div>
            {group.votes} vote(s) : {Math.round((group.votes / totalVotes) * 100 * 100) / 100}%
          </div>
        </div>

        <ul className="list-groups-lists">
          <ListList year={year} type={type} entities={entities} group={group} lists={group.lists} />
        </ul>
      </li>
    );
  }
}
