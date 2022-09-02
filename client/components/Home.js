import {connect} from 'react-redux'
import axios from 'axios'
import React, { Component } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import ReactPaginate from 'react-paginate'
import SearchFilter from './SearchFilter'
import { RotatingLines } from 'react-loader-spinner'
class Home extends Component {
  constructor(){
    super()
      this.state = {
        data: [],
        offset: 0,
        perPage: 25,
        currentPage: 0,
        loading: false,
        search: '',
        filteredSearchJobs: 0
      }
      this.getData = this.getData.bind(this)
      this.displayImage = this.displayImage.bind(this)
      this.handlePageClick = this.handlePageClick.bind(this)
      this.onChange = this.onChange.bind(this)
  }
  
  onChange(e){
    this.setState({search: e.target.value })
    this.getData(this.state.search)
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
    
   getData = async() => {
    let container = []
    var host = 'data.usajobs.gov'; 
    var userAgent = 'sethkingriter@gmail.com'
    var authKey = 'InzNEWOLXdrBHP/62f3tqX6pOhSGmFDaTdHOB9zEmbg=' 
    this.setState({ loading: true })
    for (let i = 1; i < 3; i++){
      const response = await fetch(`https://data.usajobs.gov/api/search?Keyword=Software&ResultsPerPage=500&Page=${i}`, {
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
        // console.log('gigs', gigs)
        container.push(...gigs)
      });
    }
    
    //if there is nothing in the input, 
      //if the filter length is 0, line 101,  container.slice(this.state.offset, this.
      //else 
        //container.filter().slice()
    if (this.state.search.length === 0 ){
      const slice = container.slice(this.state.offset, this.state.offset + this.state.perPage)
      console.log('container', container.filter(job => job.MatchedObjectDescriptor))
      this.setState({ filteredSearchJobs: container.length})
      const postData = slice.map((job) => {
        return (
          <article class="job-card" style={{
            width: '100%',
            marginBottom: '20px',
          }}>
              <div class="company-logo-img">
                <img 
                    src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
                    style={{
                    verticalAlign: 'middle',
                    width: '116px',
                    height: '116px',
                    borderRadius: '50%',
                    }} />  
              </div>
              <div class="job-title" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre'
              }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
              <div class="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
              <div class="skills-container">
                <div class="skill">Photoshop</div>
                <div class="skill">Illustrator</div>
                <div class="skill">HTML</div>
              </div>
              <button class="apply">Apply</button>
              <button class="save">Save Job</button>
              <a href="#"></a>
          </article>
        )
      })
  
      this.setState({
        pageCount: Math.ceil(container.length / this.state.perPage),      
        postData
       })
       this.setState({ loading: false })
    } 



    const slice = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({ filteredSearchJobs: container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).length })
    const postData = slice.map((job) => {
      return (
        <article class="job-card" style={{
          width: '100%',
          marginBottom: '20px',
        }}>
            <div class="company-logo-img">
              <img 
                  src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
                  style={{
                  verticalAlign: 'middle',
                  width: '116px',
                  height: '116px',
                  borderRadius: '50%',
                  }} />  
            </div>
            <div class="job-title" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'pre'
            }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
            <div class="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
            <div class="skills-container">
              <div class="skill">Photoshop</div>
              <div class="skill">Illustrator</div>
              <div class="skill">HTML</div>
            </div>
            <button class="apply">Apply</button>
            <button class="save">Save Job</button>
            <a href="#"></a>
        </article>
      )
    })

    this.setState({
      pageCount: Math.ceil(container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).length / this.state.perPage),      
      postData
     })
     this.setState({ loading: false })
  
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getData()
    });

};


  componentDidMount(){
    try {      
      this.getData()
    }
    catch(err){
      console.log(err)
    }
  }


  render() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
    const {  onChange } = this;

    return (
      <div>
        <Header />
        <HeroSection />
        <div>
          <div class="container">
              <div class="container">
                  <div style={{
                    display: 'flex'
                  }}>
                    {/* //the filters */}
                    <div className='row' style={{
                      height: '40vh',
                      flexDirection: 'column',
                      width: '400px',
                      marginRight: '20px',
                    }}>
                        <div style={{
                          alignContent: 'flex-start',
                          display: 'flex',
                          height: '40vh',
                          flexDirection: 'column',
                          background: '#f8f9fa',
                          padding: '1.5rem 1rem',
                          borderRadius: '4px'
                        }}>
                            <ul>
                                <li style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  marginLeft: '-1.8em'
                                }}>
                                    <p style={{
                                      fontWeight: '700',
                                      fontSize: '18px',
                                      lineHeight: '22px',
                                      alignItems: 'center',
                                      letterSpacing: '.6px',
                                      color: '#203d7c',
                                      textTransform: 'uppercase'
                                    }}> Filters</p>
                                    <input 
                                      style={{
                                        appearance: 'none',
                                        padding: '0.3rem 1.7rem',
                                        width: '100%',
                                        position: 'relative',
                                        backgroundColor: '#fff',
                                        border: '1px solid #e4e8ec',
                                        borderRadius: '5px'
                                      }}
                                      type="text" 
                                      class="icon" 
                                      placeholder="Search" 
                                      onChange={onChange}
                                    />
                                </li>
                                <li style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  marginLeft: '-1.8em',
                                  marginTop: '20px'
                                }}>
                                    <p style={{
                                      fontWeight: '700',
                                      fontSize: '18px',
                                      lineHeight: '22px',
                                      alignItems: 'center',
                                      letterSpacing: '.6px',
                                      color: '#203d7c',
                                      textTransform: 'uppercase'
                                    }}> Location</p>
                                    <div>
                                      <ul style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexWrap: 'wrap',
                                        marginLeft: '-14%'
                                      }}>
                                        <li style={{
                                          display: 'flex',
                                          background: '#fff',
                                          border: '1px solid #E5E8ED',
                                          boxSizing: 'border-box',
                                          height: '30px',
                                          fontWeight: '600',
                                          fontSize: '12px',
                                          lineHeight: '17px',
                                          color: '#031b4e',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          maxWidth: 'calc(50% - 0.25rem)',
                                          width: 'calc(50% - 0.25rem)',
                                          cursor: 'pointer',
                                          borderRadius: '4px',
                                          userSelect: 'none',
                                          mozUserSelect: 'none',
                                          webkitUserSelect: 'none',
                                          webkitTouchCallout: 'none',
                                          
                                        }}>
                                            <a style={{
                                              display: 'flex',
                                              height: '100%',
                                              width: '100%',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: '#031b4e'
                                            }}>
                                              <div>
                                                Boston, Ma
                                              </div>
                                              <span> 838</span>
                                            </a>
                                        </li>
                                        <li style={{
                                          display: 'flex',
                                          background: '#fff',
                                          border: '1px solid #E5E8ED',
                                          boxSizing: 'border-box',
                                          height: '30px',
                                          fontWeight: '600',
                                          fontSize: '12px',
                                          lineHeight: '17px',
                                          color: '#031b4e',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          maxWidth: 'calc(50% - 0.25rem)',
                                          width: 'calc(50% - 0.25rem)',
                                          cursor: 'pointer',
                                          borderRadius: '4px'
                                        }}>
                                            <a style={{
                                              display: 'flex',
                                              height: '100%',
                                              width: '100%',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: '#031b4e'
                                            }}>
                                              <div>
                                                Boston, Ma
                                              </div>
                                              <span> 838</span>
                                            </a>
                                        </li>
                                        <li style={{
                                          display: 'flex',
                                          background: '#fff',
                                          border: '1px solid #E5E8ED',
                                          boxSizing: 'border-box',
                                          height: '30px',
                                          fontWeight: '600',
                                          fontSize: '12px',
                                          lineHeight: '17px',
                                          color: '#031b4e',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          maxWidth: 'calc(50% - 0.25rem)',
                                          width: 'calc(50% - 0.25rem)',
                                          cursor: 'pointer',
                                          borderRadius: '4px',
                                        }}>
                                            <a style={{
                                              display: 'flex',
                                              height: '100%',
                                              width: '100%',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: '#031b4e',
                                              
                                            }}>
                                              <div>
                                                Boston, Ma
                                              </div>
                                              <span> 838</span>
                                            </a>
                                        </li>
                                      </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>                    
                     {/* the jobs */}
                    <div class="col-8">
                      <div style={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginBottom: '1rem',
                          color: '#264384',
                          fontSize: '20px'
                      }}> 
                        {this.state.filteredSearchJobs} open jobs・Updated  {date}
                      </div>
                      {this.state.loading ? 
                      <div style={{
                        margin: '50px auto',
                        display: 'flex',
                        listStyle: 'none',
                        outline: 'none',
                        justifyContent: 'center'
                      }}>
                        <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="150"
                        visible={true}
                      /> 
                    </div>
                    : this.state.postData}
                      <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}



const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)


