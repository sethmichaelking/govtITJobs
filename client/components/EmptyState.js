import React, { Component } from 'react'
import {
    FaRegSadCry
  } from 'react-icons/fa'
import Button from 'react-bootstrap/Button';

export default class EmptyState extends Component {
  render() {
    return (
      <div>
        <div style={{
            marginLeft: '37px',
            margin: '78px auto',
            display: 'flex',
            listStyle: 'none',
            outline: 'none',
            justifyContent: 'center'
          }}> 
           <div>
            <div><FaRegSadCry size={150}/> </div>
            <p style={{
                  marginLeft: '-21px',
                  marginTop: '10px'
            }}> No jobs founds. Search again. </p>
            <Button style={{ marginLeft: '21px' }}variant="primary" onClick={()=> window.location.reload()}>Reset Filters</Button>
            </div>
          </div>
      </div>
    )
  }
}
