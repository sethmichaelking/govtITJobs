import React, { Component } from 'react'

export default class Table extends Component {
  render() {
    return (
      <div>
         <table class="table">
              {/* {/* <thead class="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Organization</th> */}
                  {/* <th scope="col">Location</th> */}
                  {/* <th scope="col">Pay Range</th> */}
                  {/* <th scope="col">Location</th>
                  <th scope="col">Position URL </th>
                  <th scope="col"> Start Date </th>
                </tr>
              </thead> */} 
              <div className='container'>
              {jobs.length > 1 ? (
                            jobs.map((job) => {
                              return (
                                 <div class="card" style={{
                                  marginTop: '15px',
                                  marginBottom: '15px',
                                  borderRadius: '34px'
                                 }}>
                                  <div>
                                 
                                        <div key={job.MatchedObjectDescriptor.PositionID}
                                                style={{
                                                  display:'flex'
                                                }}>
                                          <td> 
                                            <img 
                                                src={displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
                                                style={{
                                                  verticalAlign: 'middle',
                                                  width: '50px',
                                                  height: '50px',
                                                  borderRadius: '50%',
                                                }} /> 
                                            </td>
                                            <td style={{
                                              whiteSpace: 'pre-wrap'
                                            }}>{job.MatchedObjectDescriptor.DepartmentName}</td>
                                            <td style={{
                                              whiteSpace: 'pre-wrap'
                                            }}>{job.MatchedObjectDescriptor.OrganizationName}</td>
                                            {/* <td>{job.PositionLocation}</td> */}
                                            {/* <td>{job.PositionRemuneration[0].MinimumRange.slice(0, 4)}K - {job.PositionRemuneration[0].MaximumRange.slice(0, 4)}K</td> */}
                                            <td style={{
                                              whiteSpace: 'pre-wrap'
                                            }}> {job.MatchedObjectDescriptor.PositionTitle}</td>
                                            <td style={{
                                              whiteSpace: 'pre-wrap'
                                            }}> {job.MatchedObjectDescriptor.SubAgency} </td>
                                            <td style={{
                                              whiteSpace: 'pre-wrap',
                                              marginTop: '-25px'
                                            }}>  {job.MatchedObjectDescriptor.PositionURI}</td>
                                            <td > {job.MatchedObjectDescriptor.PublicationStartDate} </td>
                                        </div>
                                      
                                  </div>
                                </div>
                              )
                            })
                          ) 
                          : (
                            <>
                              <tr>
                                <td>No users to show</td>
                              </tr>
                            </>
                      )}
              </div>
            </table>
      </div>
    )
  }
}
