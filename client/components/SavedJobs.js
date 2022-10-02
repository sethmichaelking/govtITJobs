import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import axios from 'axios'
import SavedJob from './SavedJob'
import { getJobs, deleteJob, fetchUserJobs, fetchJobs } from '../store'
import {
  TbArrowBackUp
} from 'react-icons/tb'
import Button from 'react-bootstrap/esm/Button'
class SavedJobs extends Component {
  constructor(){
    super()
    this.state = {
        jobs: [],
        usersSavedJobs: '',
        savedJobs: []
    },
    this.displayImage = this.displayImage.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleJobs = this.handleJobs.bind(this)

  }
  handleJobs(jobs, thejobs){
    let container = []
    for (let i = 0; i < jobs.length; i++){
      let job = jobs[i]
      if (thejobs.includes(job.id)){
        container.push(job)
      }
    }
    return container.map((job) => {
      return (
        <SavedJob job={job} />
      )
    })
  }
  handleDelete(id){
    this.props.deleteJob(id)
  }
  displayImage(name){
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
      return 'https://www.transportation.gov/themes/custom/dot_cms/images/seal_dot.png'
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
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
  }

  async componentDidMount(){
    this.props.getAllJobs(this.props.auth.id) 
    const response = await axios.get('/apijobs')
    let container = []
    const data = response.data
    container.push(...data)
    this.setState({ jobs: container })
  }
 

  render() {
    const { deleteJob } = this
    const id = this.props.auth.id
    const thejobs = this.props.jobs.map(job => job.jobId)
    const { jobs, savedJobs } = this.state
    
    return (
      <div>
        <div>
        <Navbar/>
        <div style={{
            marginBottom: '55px',
            border: '2px solid dde0f4',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            paddingBottom: '60px',
            paddingTop: '1px',
            borderBottom: '1px solid #dde0f4',
            height: '436px',
            backgroundImage: "url(" + "https://weworkremotely.com/assets/we-work-remotely@3x-c754140b276c02588dd4a43b70212d3668a75a54970c4baac325aeb60cb92f66.svg" + ")",
        }}>
              <div>
                <div style={{
                    marginTop: '47px',
                    width: '600px',
                    height: '80px',
                    margin: '9px auto -20px auto',
                    padding: '20px 0'
                }}>
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <h1 style={{
                            color: '#4d5154',
                            fontSize: '3.7rem'
                        }}>
                            U.S. Jobs 🇺🇸
                        </h1> 
                    </div>
                    <div style={{
                        maxWidth: '790px',
                        textAlign: 'center',
                        color: '#212529',
                        fontWeight: '100'
                    }}>
                        <p style={{
                            fontSize: '1.4rem',
                            lineHeight: '1.4em',
                            color: '#4d5154',
                            fontFamily: "Neufile Grotesk Light"
                        }}> 
                            The federal government offers <strong> unique hiring paths </strong> to help hire individuals that <strong>represent our diverse society.</strong> Learn more about each hiring path and your eligibility.
                        </p>
                        <div style={{
                            paddingBottom: '20px',
                            marginTop: '40px',
                            width: '696px',
                            margin: '0 auto',
                            fontSize: '1.2rem',
                            height: '93px',
                            marginLeft: '-42px'
                        }}>
                            <div>
                                <img 
                                style={{
                                    backgroundColor: 'transparent',
                                    height: '100px'
                                }}
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_the_United_States_Department_of_the_Treasury.svg/2048px-Seal_of_the_United_States_Department_of_the_Treasury.svg.png' />
                                <img 
                                style={{
                                    backgroundColor: 'transparent',
                                    height: '100px'
                                }}
                                src='https://upload.wikimedia.org/wikipedia/commons/0/05/Seal_of_the_U.S._Department_of_Veterans_Affairs.svg' />
                                <img 
                                style={{
                                    backgroundColor: 'transparent',
                                    height: '100px'
                                }}
                                src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Seal_of_the_U.S._Department_of_the_Air_Force.png' />
                                <img 
                                style={{
                                    backgroundColor: 'transparent',
                                    height: '100px'
                                }}
                                src='https://upload.wikimedia.org/wikipedia/commons/e/e0/United_States_Department_of_Defense_Seal.svg' />
                                <img 
                                style={{
                                    backgroundColor: 'transparent',
                                    height: '100px'
                                }}
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg/2048px-Seal_of_the_United_States_Department_of_Health_and_Human_Services.svg.png' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
  
            <div  className='container' style={{
                maxWidth: '65vw'
            }} >
                 <div style={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginBottom: '1rem',
                          color: '#264384',
                          fontSize: '20px'
                      }}> 
                        <p> <Button variant='primary' href='/home'> <TbArrowBackUp />  Back </Button> </p>
                        {jobs.length === 0 ? '0' : thejobs.length} saved jobs
                </div>
                <div>
                      {this.handleJobs(jobs, thejobs)}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        jobs: state.jobs,
        auth: state.auth
    }
}
const mapDispatch = (dispatch) => {
    return {
      getAllJobs: (id) => {
        dispatch(getJobs(id))
      }
    }
}

export default connect(mapState, mapDispatch)(SavedJobs)
