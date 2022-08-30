import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
     <nav class="navbar navbar-expand-lg navbar-light" style={{
        backgroundColor: '#fff !important'
     }}>
        <a class="navbar-brand" href="#" style={{
                      fontSize: '25px'
                    }}>Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Pricing</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Register</a>
                </li>
            </ul>
        </div>
      </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
