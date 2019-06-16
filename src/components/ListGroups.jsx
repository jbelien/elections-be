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

    const level = electionsTypes[type].highestLevel;

    const promises = [
      fetch(`${api}/groups/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/lists/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/entities/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/format-r/result/${year}/${type}/${level}`).then(response => response.json())
    ];

    if (electionsTypes[type].listsLevel !== null && electionsTypes[type].listsLevel !== level) {
      const level2 = electionsTypes[type].listsLevel;

      promises.push(fetch(`${api}/format-r/result/${year}/${type}/${level2}`).then(response => response.json()));
    }

    Promise.all(promises).then(data => {
      const entities = data[2];

      const groups = Object.values(data[0])
        .map(group => {
          group.lists = Object.values(data[1]).filter(list => list.idGroup === group.id);

          const resultGroup = data[3].lists.find(list => list.idGroup === group.id);

          group.votes =
            resultGroup.countSubCategory1 +
            resultGroup.countSubCategory2 +
            resultGroup.countSubCategory3 +
            resultGroup.countSubCategory4;

          group.seats = resultGroup.seats;

          if (typeof data[4] !== "undefined") {
            group.lists.map(list => {
              const resultList = data[4]
                .find(entity => entity.metadata.idEntity === list.idEntity)
                .lists.find(l => l.idGroup === list.idGroup);

              list.votes =
                resultList.countSubCategory1 +
                resultList.countSubCategory2 +
                resultList.countSubCategory3 +
                resultList.countSubCategory4;

              return list;
            });
          }

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
          {electionsTypes[type].name_fr}
          <br />
          {electionsTypes[type].name_nl}
        </h2>
        <Charts year={year} type={type} groups={groups} totalVotes={totalVotes} />
        <GroupList year={year} type={type} entities={entities} groups={groups} totalVotes={totalVotes} />
      </div>
    );
  }
}
