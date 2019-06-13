import React from "react";
import { Bar as BarChart } from "react-chartjs-2";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { groups, totalVotes } = this.props;

    let labels = [];
    let colors = [];
    let data = [];
    groups
      .slice()
      // .filter(group => group.votes > 0)
      .sort((a, b) => b.votes - a.votes)
      .forEach(group => {
        labels.push(group.name);
        colors.push(`#${group.color}`);
        data.push(Math.round((group.votes / totalVotes) * 100 * 100) / 100);
      });

    this.state = {
      labels,
      colors,
      data
    };
  }

  render() {
    if (this.state.data.length === 0) {
      return null;
    }

    const data = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data,
          backgroundColor: this.state.colors,
          borderColor: this.state.colors,
          borderWidth: 1
        }
      ]
    };

    const options = {
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
    };

    return <BarChart data={data} options={options} height={150} />;
  }
}
