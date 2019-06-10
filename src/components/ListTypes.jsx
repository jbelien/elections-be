import React from "react";
import { Link } from "react-router-dom";

import { api, elections, electionsTypes } from "../config";

import "../assets/sass/listTypes.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const year = parseInt(props.match.params.year);

    this.state = {
      year: year,
      election: elections.find(e => e.year === year),
      status: {}
    };
  }

  componentDidMount() {
    let urls = [];
    this.state.election.types.map(type =>
      urls.push(
        `${api}/format-r/history/${this.state.election.year}/${type}/${
          type !== "DE" ? "R" : "G"
        }`
      )
    );

    Promise.all(
      urls.map(url => fetch(url).then(response => response.json()))
    ).then(data => {
      let status = {};

      data.forEach(d => {
        const type = d.type;
        const history = d.history[d.history.length - 1];

        status[type] = {
          datetime: history.datetime,
          count: history.countedStations,
          total: history.totalStations
        };
      });

      this.setState({ status: status });
    });
  }

  renderList() {
    return this.state.election.types.map(type => {
      return (
        <li class="list-types-type" key={type}>
          <Link to={`/${this.state.election.year}/${type}`}>
            <div>
              {electionsTypes[type].fr}
              <br />
              {electionsTypes[type].nl}
            </div>
            {this.renderStatus(type)}
          </Link>
        </li>
      );
    });
  }

  renderStatus(type) {
    const status = this.state.status[type];

    if (typeof status === "undefined") return null;

    const percentage =
      status.total > 0 ? Math.round(status.count / status.total) * 100 : 0;

    return (
      <div class="list-types-status">
        <div>Last update: {status.datetime}</div>
        <div class="list-types-status-count">
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div>
            {status.count} / {status.total} station(s)
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>{this.state.election.year}</h1>
        <ul class="list-types">{this.renderList()}</ul>
      </div>
    );
  }
}
