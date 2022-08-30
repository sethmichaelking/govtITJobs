import React, { Component } from 'react'

export default class HeroSection extends Component {
  render() {
    return (
      <div>
        <section style={{
            paddingBottom: '20px',
            marginTop: '40px',
            width: '950px',
            margin: '0 auto',
            fontSize: '1.2rem',
            height: '350px'
        }}>
            <div style={{
                display: 'block',
                margin: '0 auto',
                width: '85%',
                paddingTop: '14%',
                backgroundPosition: 'center center',
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
            }}>
                <div style={{
                    color: '#9ea0a2',
                    position: 'relative',
                    textAlign: 'center',
                    fontSize: '0.9em',
                    backgroundColor: '#fff',
                    bottom: '105px',
                    fontSize: '25px',
                    marginTop: '46px'
                }}>
                    Find jobs from these agencies
                    <div>
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://vectorlogoseek.com/wp-content/uploads/2018/10/united-states-department-of-the-treasury-vector-logo.png' />
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://ualr.edu/counseling/files/2015/07/U.S.-Department-of-Veterans-Affairs-Logo.jpg' />
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Seal_of_the_U.S._Department_of_the_Air_Force.png' />
                        
                    </div>
                </div>
            </div>
        </section>
      </div>
    )
  }
}
