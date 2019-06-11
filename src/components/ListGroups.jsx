import React from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import { Bar as BarChart, Doughnut as DoughnutChart } from "react-chartjs-2";

import { api, electionsTypes } from "../config";

import "../assets/sass/listGroups.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const filter = qs.parse(props.location.search).entity;

    this.state = {
      filter: typeof filter !== "undefined" ? parseInt(filter) : null,
      groups: [],
      entities: {},
      result: {},
      results: []
    };
  }

  componentDidMount() {
    const { year, type } = this.props.match.params;

    Promise.all([
      fetch(`${api}/groups/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/lists/${year}/${type}`).then(response => response.json()),
      fetch(`${api}/entities/${year}/${type}`).then(response =>
        response.json()
      ),
      fetch(
        `${api}/format-r/result/${year}/${type}/${type !== "DE" ? "R" : "G"}`
      ).then(response => response.json())
    ]).then(data => {
      const groups = data[0];
      const lists = data[1];
      const entities = data[2];
      const result = data[3];

      let groupsWithLists = Object.values(groups).map(group => {
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

      groupsWithLists = groupsWithLists.filter(group => group.lists.length > 0);

      let results = [];
      result.lists.forEach(list => {
        results.push({
          group: groups[list.idGroup],
          seats: list.seats,
          votes:
            list.countSubCategory1 +
            list.countSubCategory2 +
            list.countSubCategory3 +
            list.countSubCategory4,
          total:
            result.count.countBBE1E2 +
            result.count.countE3E4 +
            result.count.countE5 -
            (result.count.countBlankBBE1E2E5 + result.count.countBlankE3E4)
        });
      });

      this.setState({
        groups: groupsWithLists,
        entities: entities,
        result: result,
        results: results
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
    const results = this.state.results.find(g => g.group.id === group.id);

    return (
      <li className="list-groups-group" key={group.id}>
        <div
          className="list-groups-group-header"
          style={{ color: `#${group.color}` }}
        >
          <div className="list-groups-group-name">{group.name}</div>
          <div>
            {results.votes} vote(s) :{" "}
            {Math.round((results.votes / results.total) * 100 * 100) / 100}%
          </div>
        </div>

        <ul className="list-groups-lists">
          {group.lists.map(list => this.renderList(list, group))}
        </ul>
      </li>
    );
  }

  renderList(list, group) {
    const { year, type } = this.props.match.params;

    return (
      <li
        className="list-groups-lists-list"
        key={list.id}
        style={{ borderColor: `#${group.color}` }}
      >
        <Link to={`/${year}/${type}/${group.id}/${list.id}`}>
          <div style={{ color: `#${group.color}` }}>
            {list.nr} - {list.name}
          </div>
          <div className="list-groups-lists-list-entity">
            {this.state.entities[list.idEntity].name_fr}
            <br />
            {this.state.entities[list.idEntity].name_nl}
          </div>
        </Link>
      </li>
    );
  }

  render() {
    const { year, type } = this.props.match.params;

    const votesChart = this.votesChart();
    const seatsChart = this.seatsChart();

    return (
      <div>
        <h1>{year}</h1>
        <h2>
          {electionsTypes[type].fr}
          <br />
          {electionsTypes[type].nl}
        </h2>
        <div className="list-groups-charts">
          <div>
            <BarChart
              data={votesChart.data}
              options={votesChart.options}
              height={150}
            />
          </div>
          <div>
            <DoughnutChart
              data={seatsChart.data}
              options={seatsChart.options}
              height={150}
            />
          </div>
        </div>
        <ul className="list-groups">
          {this.state.groups
            .sort((a, b) => (a.nr || Infinity) - (b.nr || Infinity))
            .map(group => this.renderGroup(group))}
        </ul>
      </div>
    );
  }

  votesChart() {
    const { results } = this.state;

    let labels = [];
    let colors = [];
    let data = [];
    results
      // .filter(group => group.votes > 0)
      .sort((a, b) => b.votes - a.votes)
      .forEach(group => {
        labels.push(group.group.name);
        colors.push(`#${group.group.color}`);
        data.push(Math.round((group.votes / group.total) * 100 * 100) / 100);
      });

    return {
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false
              }
            }
          ]
        },
        title: {
          display: true,
          text: "Votes (%)"
        }
      }
    };
  }

  seatsChart() {
    const { results } = this.state;

    let labels = [];
    let colors = [];
    let data = [];
    results
      .filter(group => group.seats > 0)
      .sort((a, b) => b.seats - a.seats)
      .forEach(group => {
        labels.push(group.group.name);
        colors.push(`#${group.group.color}`);
        data.push(group.seats);
      });

    return {
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        circumference: Math.PI,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        rotation: -Math.PI,
        title: {
          display: true,
          text: "Seats"
        }
      }
    };
  }
}
