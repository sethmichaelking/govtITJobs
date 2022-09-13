import React, { Component } from 'react'
import { connect } from 'react-redux'
import { me } from '../store'

class SignUp extends Component {
  constructor(){
    super()
      this.state = {
        password: '',
        username: ''
      }
      this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin(){
    const user = this.state.username
    const password = this.state.password
    this.props.loginUser({ username: user, password: password })
    this.setState({ username: '', password: '' })
  }
  render() {
    const { handleLogin } = this
    const { auth } = this.props
    console.log('auth', auth)
    return (  
      <div class="" style={{
        height: '100vh',
        width: '100vw !important',
        background: '#E5E4E2',
      }}>
        <div class="row">
          <div class="col-md-6 offset-md-3" style={{
            marginTop: '12%',
        
          }}>
            <div class="card my-5" style={{
              justifyContent: 'center',
              borderRadius: '27px'
            }}>
              <div class="card-body cardbody-color p-lg-5" style={{
                borderRadius: '27px'
              }}>
                <div class="form-text text-center text-dark">
                  <input type="text" class="form-control" value = {this.state.username} onChange={(e) => this.setState({ username: e.target.value })} id="Username" aria-describedby="emailHelp" style={{
                    borderRadius: '10px'
                  }}
                    placeholder="User Name" />
                </div>
                <div class="form-text text-center mb-5 text-dark">
                  <input style={{
                    marginBottom: '25px',
                    borderRadius: '10px'
                  }}type="password" class="form-control"  value = {this.state.password} id="password" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
                  <button style={{borderRadius: '10px'}} class="btn btn-color px-5 w-100" onClick={handleLogin}>Login</button>
                </div>
                <div id="emailHelp" class="form-text text-center text-dark">
                  Not Registered? 
                  <a href="#" class="text-dark fw-bold"> Create an Account</a>
                </div>
              </div>
            </div>
    
          </div>
        </div>
    </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(me(user))
    }
  }
}

export default connect(mapState, mapDispatch)(SignUp)
