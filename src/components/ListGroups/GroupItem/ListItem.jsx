import React from "react";
import { Link } from "react-router-dom";

function Votes(props) {
  const { votes, color } = props;

  if (typeof votes === "undefined") return null;

  return (
    <div className="list-groups-lists-list-votes" style={{ color: `#${color}` }}>
      {votes} vote(s)
    </div>
  );
}

export default class extends React.Component {
  render() {
    const { year, type, entities, group, list } = this.props;

    return (
      <li className="list-groups-lists-list" key={list.id} style={{ borderColor: `#${group.color}` }}>
        <Link to={`/${year}/${type}/${list.id}`}>
          <div style={{ color: `#${group.color}` }}>
            {list.nr} - {list.name}
          </div>
          <div className="list-groups-lists-list-entity">
            {entities[list.idEntity].name_fr}
            <br />
            {entities[list.idEntity].name_nl}
          </div>
          <Votes color={group.color} votes={list.votes} />
        </Link>
      </li>
    );
  }
}
