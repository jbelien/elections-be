import React from "react";

import { api, electionsTypes } from "../config";
import GroupList from "./ListGroups/GroupList";
import Charts from "./ListGroups/Charts";

import "../assets/sass/listGroups.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      entities: {},
      totalVotes: 0
    };
  }

  componentDidMount() {
    const { year, type } = this.props.match.params;

    Promise.all([
      fetch(`${api}/groups/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/lists/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/entities/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/format-r/result/${year}/${type}/${type !== "DE" ? "R" : "G"}`).then(response => response.json())
    ]).then(data => {
      const entities = data[2];

      const groups = Object.values(data[0])
        .map(group => {
          group.lists = Object.values(data[1]).filter(list => list.idGroup === group.id);

          const result = data[3].lists.find(list => list.idGroup === group.id);

          group.votes =
            result.countSubCategory1 + result.countSubCategory2 + result.countSubCategory3 + result.countSubCategory4;

          group.seats = result.seats;

          return group;
        })
        .filter(group => group.lists.length > 0);

      const totalVotes =
        data[3].count.countBBE1E2 +
        data[3].count.countE3E4 +
        data[3].count.countE5 -
        (data[3].count.countBlankBBE1E2E5 + data[3].count.countBlankE3E4);

      this.setState({
        groups,
        entities,
        totalVotes
      });
    });
  }

  render() {
    const { year, type } = this.props.match.params;
    const { entities, totalVotes } = this.state;

    const groups = this.state.groups.sort((a, b) => (a.nr || Infinity) - (b.nr || Infinity));

    return (
      <div>
        <h1>{year}</h1>
        <h2>
          {electionsTypes[type].fr}
          <br />
          {electionsTypes[type].nl}
        </h2>
        <Charts year={year} type={type} groups={groups} totalVotes={totalVotes} />
        <GroupList year={year} type={type} entities={entities} groups={groups} totalVotes={totalVotes} />
      </div>
    );
  }
}
