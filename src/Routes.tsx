import React, {Component} from 'react'
import HomePage from '_pages/HomePage'
import Wormhole from '_sections/Wormhole'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


export default class Routes extends Component {
  public render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/*' component={Wormhole}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
