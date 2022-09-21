import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from 'react-bootstrap/esm/Badge'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {connect} from 'react-redux'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveJob, deleteJob } from '../store'
import { TbTrashX } from 'react-icons/tb'
export function isJobExpiringSoon(jobDate, startDate){
    const expDate = moment(jobDate).format(`llll`)
    const publicationDate = moment(startDate).format(`llll`)
    const today = moment(new Date()).format(`llll`)

    const msBetweenDates = Math.abs(new Date(expDate).getTime() - new Date(today).getTime());
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

    const msBetweenPubDates = Math.abs(new Date(publicationDate).getTime() - new Date(today).getTime());
    const daysBetweenPubDates = msBetweenPubDates / (24 * 60 * 60 * 1000);


    if (daysBetweenPubDates < 5) {
      return (
        <Badge bg="success"> Added {Math.floor(parseInt(daysBetweenDates.toString().slice(0, 3)))} days ago</Badge>
      )
    } 
    if (daysBetweenDates < 30) {
      return (
        <Badge bg="danger">Closes in {Math.floor(parseInt(daysBetweenDates.toString().slice(0, 3)))} days</Badge>
      )
    } 
  }
export function displayImage(name){
    if (name === 'Department of the Treasury'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/2048px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png'
    }
    if (name === 'Department of Veterans Affairs'){
      return 'https://media.defense.gov/2013/Apr/30/2000054626/-1/-1/0/130430-A-YG824-002.JPG'
    }
    if(name === 'Department of Health And Human Services'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg/2048px-Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg.png'
    }
    if (name === 'Department of the Air Force'){
      return 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Seal_of_the_U.S._Department_of_the_Air_Force.png'
    }
    if (name === 'Department of State'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/U.S._Department_of_State_official_seal.svg/1200px-U.S._Department_of_State_official_seal.svg.png'
    }
    if (name === 'Department of Commerce'){
      return 'https://www.commerce.gov/themes/custom/commerce/assets/img/doc_logo.png'
    }
    if( name === 'Department of Agriculture'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Seal_of_the_United_States_Department_of_Agriculture.svg/1200px-Seal_of_the_United_States_Department_of_Agriculture.svg.png'
    }
    if (name === 'Judicial Branch'){
      return 'https://www.nccourts.gov/assets/inline-images/NCJudicialBrandSeal_Final_lrg.png?G.MC5lvLb4TOii0WRW3m.lDrB6UjEiis'
    }
    if (name === 'Department of the Army'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Emblem_of_the_United_States_Department_of_the_Army.svg/1200px-Emblem_of_the_United_States_Department_of_the_Army.svg.png'
    }
    if (name === 'Legislative Branch'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Seal_of_the_United_States_Congress.svg/1200px-Seal_of_the_United_States_Congress.svg.png'
    }
    if (name === 'Department of Transportation'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Seal_of_the_United_States_Department_of_Transportation.svg/1200px-Seal_of_the_United_States_Department_of_Transportation.svg.png'
    }
    if (name === 'Department of Defense'){
      return 'https://upload.wikimedia.org/wikipedia/commons/e/e0/United_States_Department_of_Defense_Seal.svg'
    }
    if (name === 'Department of the Interior'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seal_of_the_United_States_Department_of_the_Interior.svg/1028px-Seal_of_the_United_States_Department_of_the_Interior.svg.png'
    }
    if (name === 'General Services Administration'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Seal_of_the_General_Services_Administration.svg/1200px-Seal_of_the_General_Services_Administration.svg.png'
    }
    if (name === 'Department of the Navy'){
      return 'https://upload.wikimedia.org/wikipedia/commons/0/09/Seal_of_the_United_States_Department_of_the_Navy.svg'
    }
    if (name === 'Executive Office of the President'){
      return 'https://upload.wikimedia.org/wikipedia/commons/3/36/Seal_of_the_President_of_the_United_States.svg'
    }
    if (name === 'Central Intelligence Agency'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Seal_of_the_Central_Intelligence_Agency.svg/2048px-Seal_of_the_Central_Intelligence_Agency.svg.png'
    }
    if (name === 'Environmental Protection Agency'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Seal_of_the_United_States_Environmental_Protection_Agency.svg/2048px-Seal_of_the_United_States_Environmental_Protection_Agency.svg.png'
    }
    if (name === 'Smithsonian Institution'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Smithsonian_logo_color.svg/1200px-Smithsonian_logo_color.svg.png'
    }
    if (name === 'National Aeronautics and Space Administration'){
      return 'https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_nasa_emblem.jpg'
    }
    if (name === 'Department of Homeland Security'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/1200px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png'
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
  }
  
function SavedJob({ job }) {
    const [show, setShow] = useState(false)
    const [clicked, setClicked] = useState(true)
    const user = useSelector(state => state.auth)
    const jobs = useSelector(state => state.jobs)
    let jobIds = (jobs.map((job) => job.jobId))
    const dispatch = useDispatch();

    const handleDelete = (jobId) => {
        dispatch(deleteJob(jobId))
    }

    const [saved, setSaved] = useState(false)

    return (
    <div key={job.id}>
        <div>
          <Offcanvas style={{ height: '40vh' }} placement='bottom' show={show && clicked}>
            <Offcanvas.Header closeButton onClick={()=> setShow(false)}>
              <Offcanvas.Title> <h2>  Job Information </h2> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{
              marginTop: '-13px'
            }}>
              
              <div>
                <div>
                   <h5> <strong>  Job Description:</strong></h5>
                   <p style={{
                    fontSize: '19px'
                   }}>  {job.jobSummary ? job.jobSummary : 'No summary found.'} </p>
               </div>
              </div>
              <div>
                <div>
                    <h5> <strong> Contact Email:</strong> </h5> 
                    <p style={{
                    fontSize: '19px',
                    marginTop: '-3px'
                   }}>
                    {job.contactEmail ? job.contactEmail : 'No email found.'} 
                  </p>
                </div>
              </div>
              <div>
                <div>
                    <h5> <strong> What to expect next: </strong> </h5> 
                    <p style={{ 
                    fontSize: '19px',
                   }}>{job.whatToExpect} </p>
                </div>
              </div>
              <div>
                <div>
                    <h5> <strong> Major Duties: </strong> </h5> 
                    <p style={{
                    fontSize: '19px'
                   }}> {job.majorDuties}</p>
                </div>
              </div>
              <div>
                <div>
                    <h5> <strong> Key Requirements: </strong> </h5> 
                    <ul> 
                    {job.keyRequirements.length > 0 ? job.keyRequirements.map(req => {
                      return (
                        <li style={{
                          fontSize: '19px'
                        }}>
                          {req}
                        </li>
                      )
                    })
                    :
                    <li style={{
                      fontSize: '19px'
                    }}> No requirement found. </li>
                  }
                    </ul>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

        </div>
          <article onClick={() => setShow(true)} className="job-card" 
            style={{
            width: '100%',
            marginBottom: '20px',
            borderRadius: '25px'
          }}>
              <div className="company-logo-img">
                <img 
                    src={displayImage(job.DepartmentName)} 
                    style={{
                    verticalAlign: 'middle',
                    width: '116px',
                    height: '116px',
                    borderRadius: '50%',
                    }} />  
              </div>
              <div className="job-title" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre'
              }}>{job.JobTitle} {isJobExpiringSoon(job.end, job.start)}</div>
              <div className="company-name">{job.OrganizationName}</div>
              <div className="skills-container">
                <div className="skill">{job.DrugTestRequired === 'False' ? 'Drug Test: No' : 'Drug Test: Yes'}</div>
                <div className="skill">{job.TeleworkEligible === true ? 'Remote' : 'On-site'}</div>
                <div className="skill">High Grade: {!isNaN(job.HighGrade) ?  job.HighGrade : 'N/A'}</div>
              </div>
             <button  style={{
                    borderRadius: '25px'
                }} className="apply" onClick={() => {
                setClicked(false)
                location.href = job.PositionURI
              }
              }>Apply</button>
               <button 
                    className="save" 
                    onClick={()=> {
                            setClicked(false)
                            handleDelete(job.id)
                    }}
                    style={{
                        border: 'none'
                }}>
                <TbTrashX size={25} />
              </button> 
          </article>
    </div>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}


export default connect(mapState, mapDispatch)(SavedJob)