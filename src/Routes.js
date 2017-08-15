import React, {Component} from 'react'
import Todo from './components/HomePage/Todo'
import Wormhole from './components/Wormhole'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Todo}/>

              <Route path='/*' component={Wormhole}/>

            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
