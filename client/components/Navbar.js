import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {
  FaFlagUsa
} from 'react-icons/fa'
import {
  BsGearFill
} from 'react-icons/bs'
import { Component } from 'react'

class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      loggedOut: false
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.goToJobs = this.goToJobs.bind(this)
  }
  goToJobs(){
    console.log('change ')
  }
  handleLogout(){
      logout()
      window.location.assign('http://localhost:8080/login');
  }
  render() {
    const { isLoggedIn, handleClick, auth } = this.props
    const { handleLogout } = this
    return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-light" style={{
              backgroundColor: '#fff !important'
           }}>
              <a className="navbar-brand" href="/home" style={{
                            fontSize: '25px'
                          }}>USTechJobs <FaFlagUsa /> </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse ms-auto" style={{
                marginRight: '94px'
              }} id="navbarNav" >
                  <div class="dropdown ms-auto" style={{
                    marginLeft: '10px'
                  }}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       <BsGearFill />
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      { !isLoggedIn ? <a class="dropdown-item" href='/login'>Login</a> :  null} 

                      { isLoggedIn ? <a  onClick={handleLogout}  class="dropdown-item" href="#">Logout</a> : null}
                      { isLoggedIn ? <a class="dropdown-item" href='/savedjobs' >Your Jobs</a> : null}

                    </div>
                  </div>
              </div>
            </nav>
        </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth
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
