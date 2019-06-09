import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.match.params.year}</h1>
        <ul>
          <li key="EU">
            <Link to={`/${this.props.match.params.year}/EU`}>
              Parlement européen / Europees Parlement
            </Link>
          </li>
          <li key="CK">
            <Link to={`/${this.props.match.params.year}/CK`}>
              Chambre / Kamer
            </Link>
          </li>
          <li key="BR">
            <Link to={`/${this.props.match.params.year}/BR`}>
              Parlement de la Région de Bruxelles-Capitale / Brussels
              Hoofdstedelijk Parlement
            </Link>
          </li>
          <li key="VL">
            <Link to={`/${this.props.match.params.year}/VL`}>
              Parlement flamand / Vlaams Parlement
            </Link>
          </li>
          <li key="WL">
            <Link to={`/${this.props.match.params.year}/WL`}>
              Parlement régional wallon / Waals Parlement
            </Link>
          </li>
          <li key="DE">
            <Link to={`/${this.props.match.params.year}/DE`}>
              Parlement de la Communauté germanophone / Parlement van de
              Duitstalige Gemeenschap
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
