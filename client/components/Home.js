import {connect} from 'react-redux'
import axios from 'axios'
import React, { Component } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'

class Home extends Component {
  constructor(){
    super()
      this.state = {
        jobs: []
      }
      this.getData = this.getData.bind(this)
  }
  
              
  async getData() {
    var host = 'data.usajobs.gov'; 
    var userAgent = 'sethkingriter@gmail.com'
    var authKey = 'InzNEWOLXdrBHP/62f3tqX6pOhSGmFDaTdHOB9zEmbg=' 
      let ans = []
      const response = await fetch('https://data.usajobs.gov/api/search?Keyword=Software&ResultsPerPage=50&Page=3', {
        method: 'GET',      
        headers: {          
            "Host": host,          
            "User-Agent": userAgent,          
            "Authorization-Key": authKey      
          }  
        }
      )
      .then(response => response.json())
      .then(data => {
        const gigs = data.SearchResult.SearchResultItems
        this.setState({ jobs: gigs })
      });
  }


  componentDidMount(){
    try {      
      this.getData()
    }
    catch(err){
      console.log(err)
    }
  }


  render() {
    const { username } = this.props
    const { jobs } = this.state
    console.log('jobs', jobs)
    return (
      <div>
        <Header />
        <HeroSection />
        {/* <h3>Welcome, {username ? username : 'loadgin'}</h3> */}
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Department Name</th>
              <th scope="col">Organization</th>
              {/* <th scope="col">Location</th> */}
              {/* <th scope="col">Pay Range</th> */}
              <th scope="col">Location</th>
              <th scope="col">Position URL </th>
              <th scope="col"> Start Date </th>
            </tr>
          </thead>
          <tbody>
          {jobs.length > 1 ? (
                        jobs.map((job) => {
                          return (
                            <tr key={job.MatchedObjectDescriptor.PositionID}>
                              <td>{job.MatchedObjectDescriptor.DepartmentName}</td>
                              <td>{job.MatchedObjectDescriptor.OrganizationName}</td>
                              {/* <td>{job.PositionLocation}</td> */}
                              {/* <td>{job.PositionRemuneration[0].MinimumRange.slice(0, 4)}K - {job.PositionRemuneration[0].MaximumRange.slice(0, 4)}K</td> */}
                              <td> {job.MatchedObjectDescriptor.PositionTitle}</td>
                              <td> {job.MatchedObjectDescriptor.SubAgency} </td>
                              <td> {job.MatchedObjectDescriptor.PositionURI}</td>
                              <td> {job.MatchedObjectDescriptor.PublicationStartDate} </td>
                            </tr>
                          )
                        })
                      ) : (
                        <>
                          <tr>
                            <td>No users to show</td>
                          </tr>
                        </>
                      )}
          </tbody>
        </table>
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
