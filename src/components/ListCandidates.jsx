import React from "react";

import { api, electionsTypes } from "../config";
import CandidateTable from "./ListCandidates/CandidateTable";

import "../assets/sass/listCandidates.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: {},
      group: {},
      list: {},
      candidates: []
    };
  }

  componentDidMount() {
    const { year, type, idList } = this.props.match.params;

    const level = electionsTypes[type].highestLevel;

    Promise.all([
      fetch(`${api}/entities/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/groups/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/lists/${year}/${type}/${idList}`).then(response => response.json()),
      fetch(`${api}/candidates/${year}/${type}/list/${idList}`).then(response => response.json()),
      fetch(`${api}/format-r/hit/${year}/${type}/${level}`).then(response => response.json())
    ]).then(data => {
      const list = data[2];
      const results = data[4];

      const entity = Object.values(data[0]).find(entity => entity.id === list.idEntity);
      const group = Object.values(data[1]).find(group => group.id === list.idGroup);
      const candidates = Object.values(data[3]).map(candidate => {
        candidate.votes = results.candidates.find(c => c.id === candidate.id).votes;

        return candidate;
      });

      this.setState({
        entity,
        group,
        list,
        candidates
      });
    });
  }

  render() {
    const { year, type } = this.props.match.params;
    const { entity, group, list, candidates } = this.state;

    if (candidates.length === 0) return null;

    return (
      <div>
        <h1>{year}</h1>
        <h2>
          {electionsTypes[type].name_fr}
          <br />
          {electionsTypes[type].name_nl}
        </h2>
        <h3 style={{ color: `#${group.color}` }}>
          {list.nr} - {list.name}
        </h3>
        <h4>
          {entity.name_fr}
          <br />
          {entity.name_nl}
        </h4>
        <CandidateTable title="Effectives" candidates={candidates.filter(candidate => candidate.type === "E")} />
        <CandidateTable title="Substitutes" candidates={candidates.filter(candidate => candidate.type === "S")} />
      </div>
    );
  }
}
