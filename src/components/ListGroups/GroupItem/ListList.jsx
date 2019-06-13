import React from "react";

import ListItem from "./ListItem";

export default class extends React.Component {
  render() {
    const { year, type, entities, group, lists } = this.props;

    return (
      <ul className="list-groups-lists">
        {lists.map(list => {
          return <ListItem key={list.id} year={year} type={type} entities={entities} group={group} list={list} />;
        })}
      </ul>
    );
  }
}
