import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
import {me} from './store'
import { Signup, Login } from './components/AuthForm'
import SavedJobs from './components/SavedJobs';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
           {isLoggedIn ? (
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/savedjobs" exact component={SavedJobs} />
            <Route path="/login" exact component={Home} />
            <Route path="/signup" exact component={Home} />
            <Route path="/" exact component={Home} />
          </Switch>
        ) : (
          <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/savedjobs" exact component={Home} />
             <Route path="/home" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} /> *
          </Switch> 
         </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
