import React, { Component } from 'react'
import Navbar from './Navbar'
export default class Header extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <div style={{
            border: '2px solid dde0f4',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            paddingBottom: '60px',
            paddingTop: '1px',
            borderBottom: '1px solid #dde0f4',
            height: '530px',
            backgroundImage: "url(" + "https://weworkremotely.com/assets/we-work-remotely@3x-c754140b276c02588dd4a43b70212d3668a75a54970c4baac325aeb60cb92f66.svg" + ")",
        }}>
            <div>
                <div style={{
                    width: '600px',
                    height: '80px',
                    margin: '120px auto -20px auto',
                    padding: '20px 0'
                }}>
                    <h1 style={{
                        color: '#4d5154',
                        fontSize: '5.5rem'
                    }}>
                        US GOV JOBS
                    </h1>
                    <div style={{
                        maxWidth: '790px',
                        textAlign: 'center',
                        color: '#212529',
                        fontWeight: '100'
                    }}>
                        <p style={{
                            fontSize: '1.8rem',
                            lineHeight: '1.4em',
                            color: '#4d5154',
                            fontFamily: "Neufile Grotesk Light"
                        }}> 
                            The federal government offers <strong> unique hiring paths </strong> to help hire individuals that <strong>represent our diverse society.</strong> Learn more about each hiring path and your eligibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
