import React from "react";

export default class extends React.Component {
  render() {
    if (typeof this.props.datetime === "undefined") {
      return null;
    }

    const percentage = this.props.total > 0 ? Math.round(this.props.count / this.props.total) * 100 : 0;

    return (
      <div className="list-types-status">
        <div>Last update: {this.props.datetime}</div>
        <div className="list-types-status-count">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div>
            {this.props.count} / {this.props.total} station(s)
          </div>
        </div>
      </div>
    );
  }
}
