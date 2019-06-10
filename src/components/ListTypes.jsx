import React from "react";
import { Link } from "react-router-dom";
import { api, elections, electionsTypes } from "../config";

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
        <li key={type}>
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

    return (
      <div>
        {status.datetime} : {status.count}/{status.total}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>{this.state.election.year}</h1>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}
