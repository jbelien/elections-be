import React from "react";
import { Link } from "react-router-dom";

import { api } from "../../config";
import TypeStatus from "./TypeStatus";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: props.year,
      type: props.type,
      status: {}
    };
  }

  componentDidMount() {
    fetch(`${api}/format-r/history/${this.props.year}/${this.props.type}/${this.props.type !== "DE" ? "R" : "G"}`)
      .then(response => response.json())
      .then(data => {
        const history = data.history[data.history.length - 1];

        this.setState({
          status: {
            datetime: history.datetime,
            count: history.countedStations,
            total: history.totalStations
          }
        });
      });
  }

  render() {
    return (
      <li className="list-types-type">
        <Link to={`/${this.props.year}/${this.props.type}`}>
          <div>
            {this.props.name_fr}
            <br />
            {this.props.name_nl}
          </div>
          <TypeStatus
            datetime={this.state.status.datetime}
            count={this.state.status.count}
            total={this.state.status.total}
          />
        </Link>
      </li>
    );
  }
}
