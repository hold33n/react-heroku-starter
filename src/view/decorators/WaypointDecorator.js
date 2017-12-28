import React, { Component } from 'react'
import Waypoint from 'react-waypoint'


export default (ChildComponent) => class WaypointDecorator extends Component {
  state = {
    componentIsInView: false
  }

  _handleWaypointEnter = () => {
    this.setState({ componentIsInView: true })
  }

  render() {

    return (
      <Waypoint
        onEnter={this._handleWaypointEnter}
      >
        <ChildComponent {...this.props} componentIsInView={ this.state.componentIsInView } />
      </Waypoint>
    )
  }
}
