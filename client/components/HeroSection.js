import React, { Component } from 'react'

export default class HeroSection extends Component {
  render() {
    return (
      <div style={{
       
      }}>
        <section style={{
            paddingBottom: '20px',
            marginTop: '40px',
            width: '2000px',
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
                    marginTop: '-127px',
                    marginBottom: '10px'
                }}>
                    <p style={{
                        marginBottom: '10px'
                    }}> Find jobs from these agencies </p>
                    <div>
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/2048px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png' />
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
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://upload.wikimedia.org/wikipedia/commons/e/e0/United_States_Department_of_Defense_Seal.svg' />
                        <img 
                        style={{
                            height: '200px'
                        }}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg/2048px-Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg.png' />
                    </div>
                </div>
            </div>
        </section>
      </div>
    )
  }
}
