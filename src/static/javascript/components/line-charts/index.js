import React from "react";
import { NavLink, Route } from "react-router-dom";
import Line1 from "./line1";
import Area from "./area";
import StackArea from "./stack-area";

export default class CirclesCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <div className="list-group">
            <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`${match.url}/line`}>
              Line
            </NavLink>
            <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`${match.url}/area`}>
              Area
            </NavLink>
            <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`${match.url}/stack-area`}>
              Stacked area
            </NavLink>
          </div>
        </div>

        <div className="col-9">
          <Route path={`${match.url}/line`} component={Line1} />
          <Route path={`${match.url}/area`} component={Area} />
          <Route path={`${match.url}/stack-area`} component={StackArea} />
        </div>
      </div>
    );
  }
}
