import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
  render() {
    const { year, type, entities, group, list } = this.props;

    return (
      <li className="list-groups-lists-list" key={list.id} style={{ borderColor: `#${group.color}` }}>
        <Link to={`/${year}/${type}/${group.id}/${list.id}`}>
          <div style={{ color: `#${group.color}` }}>
            {list.nr} - {list.name}
          </div>
          <div className="list-groups-lists-list-entity">
            {entities[list.idEntity].name_fr}
            <br />
            {entities[list.idEntity].name_nl}
          </div>
        </Link>
      </li>
    );
  }
}
