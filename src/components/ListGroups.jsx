import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: {}
    };
  }

  componentDidMount() {
    const { year, type } = this.props.match.params;

    fetch(`https://api.elections.openknowledge.be/v1/groups/${year}/${type}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          groups: data
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
      <li key={group.id}>
        <Link
          to={`/${year}/${type}/${group.nr}`}
          style={{ color: "#" + group.color }}
        >
          {group.nr || "??"} - {group.name}
        </Link>
      </li>
    );
  }

  render() {
    const { year, type } = this.props.match.params;

    return (
      <div>
        <h1>{year}</h1>
        <h2>{type}</h2>
        <ul>
          {Object.keys(this.state.groups)
            .sort(
              (a, b) =>
                (this.state.groups[a].nr || Infinity) -
                (this.state.groups[b].nr || Infinity)
            )
            .map(id => this.renderGroup(this.state.groups[id]))}
        </ul>
      </div>
    );
  }
}
