import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
     <nav className="navbar navbar-expand-lg navbar-light" style={{
        backgroundColor: '#fff !important'
     }}>
        <a className="navbar-brand" href="#" style={{
                      fontSize: '25px'
                    }}>Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Features</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Pricing</a>
                </li>
            </ul>
            <ul className="navbar-nav mr-auto" style={{
              float: 'right'
            }}>
                <li className="nav-item">
                    <a className="nav-link" href="#" style={{
                      fontSize: '25px'
                    }}>Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/signup" style={{
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
