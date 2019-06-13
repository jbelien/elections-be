import React from "react";
import { Doughnut as DoughnutChart } from "react-chartjs-2";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { groups } = this.props;

    let labels = [];
    let colors = [];
    let data = [];
    groups
      .slice()
      .filter(group => group.seats > 0)
      .sort((a, b) => b.seats - a.seats)
      .forEach(group => {
        labels.push(group.name);
        colors.push(`#${group.color}`);
        data.push(group.seats);
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
    };

    return <DoughnutChart data={data} options={options} height={150} />;
  }
}
