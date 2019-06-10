import React from "react";
import { Link } from "react-router-dom";
import qs from "query-string";

import { electionsTypes } from "../config";

import "../assets/sass/listGroups.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const filter = qs.parse(props.location.search).entity;

    this.state = {
      filter: typeof filter !== "undefined" ? parseInt(filter) : null,
      groups: [],
      entities: {}
    };
  }

  componentDidMount() {
    const { year, type } = this.props.match.params;

    Promise.all([
      fetch(
        `https://api.elections.openknowledge.be/v1/groups/${year}/${type}`
      ).then(response => response.json()),
      fetch(
        `https://api.elections.openknowledge.be/v1/lists/${year}/${type}`
      ).then(response => response.json()),
      fetch(
        `https://api.elections.openknowledge.be/v1/entities/${year}/${type}`
      ).then(response => response.json())
    ]).then(data => {
      const groups = data[0];
      const lists = data[1];
      const entities = data[2];

      let result = Object.values(groups).map(group => {
        group.lists = Object.values(lists).filter(list => {
          if (this.state.filter !== null) {
            return (
              list.idGroup === group.id && list.idEntity === this.state.filter
            );
          } else {
            return list.idGroup === group.id;
          }
        });
        return group;
      });

      result = result.filter(group => group.lists.length > 0);

      this.setState({
        groups: result,
        entities: entities
      });
    });
  }

  //   static async fetchLists(year, type) {
  //     const url = `https://api.elections.openknowledge.be/v1/lists/${year}/${type}`;

  //     const response = await fetch(url);
  //     const json = await response.json();
  //     return json;
  //   }

  renderGroup(group) {
    const { year, type } = this.props.match.params;

    return (
      <li className="list-groups-group" key={group.id}>
        <Link to={`/${year}/${type}/${group.id}`}>
          <div
            className="list-groups-group-name"
            style={{ color: `#${group.color}` }}
          >
            {group.name}
          </div>

          <ul className="list-groups-lists">
            {group.lists.map(list => this.renderList(list, group))}
          </ul>
        </Link>
      </li>
    );
  }

  renderList(list, group) {
    return (
      <li
      className="list-groups-lists-list"
        key={list.id}
        style={{ borderColor: `#${group.color}` }}
      >
        <div style={{ color: `#${group.color}` }}>
          {list.nr} - {list.name}
        </div>
        <div className="list-groups-lists-list-entity">
          {this.state.entities[list.idEntity].name_fr}
          <br />
          {this.state.entities[list.idEntity].name_nl}
        </div>
      </li>
    );
  }

  render() {
    const { year, type } = this.props.match.params;

    return (
      <div>
        <h1>{year}</h1>
        <h2>
          {electionsTypes[type].fr}
          <br />
          {electionsTypes[type].nl}
        </h2>
        <ul className="list-groups">
          {this.state.groups
            .sort((a, b) => (a.nr || Infinity) - (b.nr || Infinity))
            .map(group => this.renderGroup(group))}
        </ul>
      </div>
    );
  }
}
