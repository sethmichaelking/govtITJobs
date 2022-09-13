import React, { useState } from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
/**
 * COMPONENT
 */

import { Component } from 'react'

class AuthForm extends Component {
  constructor(){
    super()
    this.state = {
      show: false
    }
  }
  render() {
    const {name, displayName, handleSubmit, error, auth} = this.props
    const keys = Object.keys(auth)
    console.log('keys', keys)
    if (keys.length > 3){
        this.setState({ show: true })
    }

    return (
    <div style={{
      height: '100vh',
      width: '100vw !important',
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      BackgroundSize: 'cover',
      background: 'rgb(238,174,202)',
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'         
    }}> 
        {
                 this.state.show ?
                    <div>
                        <Alert key='success' variant='success'>
                         <h4 style={{textAlign: 'center'}}className="alert-heading"> Login Successful!</h4>
                        </Alert>
                    </div> 
                : null
         }
         {
                 keys.length === 1 ?
                    <div>
                        <Alert key='danger' variant='danger'>
                         <h4 style={{textAlign: 'center'}}className="alert-heading"> {error.response.data} </h4>
                        </Alert>
                    </div> 
                : null
         }
      <div class='row'>
        <div class="col-md-3 offset-md-3" style={{
            marginTop: '25%',
            justifyContent: 'center',
            margin: '200px auto',
            listStyle: 'none',
            outline: 'none',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            <div class="card my-5" style={{
              justifyContent: 'center',
              borderRadius: '27px',
              width: '40w',
            }}>
          <form  class="card-body cardbody-color p-lg-5" style={{
                borderRadius: '27px',
                justifyContent: 'center',
                width: '40w',
              }} onSubmit={handleSubmit} name={name}>
                <div style={{
                  margin: '50px auto',
                  listStyle: 'none',
                  outline: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: '600'
                }}> <h2> Sign in to continue</h2></div>
              <div class="form-text text-center text-dark">
                <label htmlFor="username" style={{
                  marginLeft: '-85px',
                  fontSize: '17px'
                }}>
                  <small>Username</small>
                </label>
                <input name="username" type="text" style={{
                    borderRadius: '10px',
                    background: 'white'
                  }}/>
              </div>
              <div class="form-text text-center mb-5 text-dark">
                <label htmlFor="password" style={{
                  marginLeft: '-85px',
                  fontSize: '17px'
                }}>
                  <small>Password</small>
                </label>
                <input name="password" type="password" style={{
                    borderRadius: '10px'
                  }}/>
              </div>
              <div id="emailHelp" class="form-text text-center text-dark">
                <Button variant="primary" type="submit">{displayName}</Button>
              </div>
            </form>
          </div>
        </div>
    </div>
    </div>
    )
  }
}


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
    auth: state.auth
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
