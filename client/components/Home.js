import {connect} from 'react-redux'
import React, { Component } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import ReactPaginate from 'react-paginate'
import { RotatingLines } from 'react-loader-spinner'
import { setForcePage, updateForcedPage } from '../store'
import {
  GiCancel
} from 'react-icons/gi'
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
        filteredSearchJobs: 0,
        topCities: '',
        citySelected: '',
        selections: [],
        salaryRanges: [],
        salarySelected: '',
        initialValue: 0
      }
      this.getData = this.getData.bind(this)
      this.displayImage = this.displayImage.bind(this)
      this.handlePageClick = this.handlePageClick.bind(this)
      this.onChange = this.onChange.bind(this)
      this.showCityJobs = this.showCityJobs.bind(this)
      this.selectSalaryRnge = this.selectSalaryRnge.bind(this)
      this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   let pre = JSON.stringify(this.props.forcedPage)
  //   let next = JSON.stringify(nextProps.forcedPage)
  //   if (pre !== next) {
  //     this.setState({currentPage: 0})
  //   }
  // }
  setCurrentPage(page){
    //if no search and no city and no salary, just return whichever page is selected
    if (this.state.citySelected.length === 0 && this.state.search.length === 0 && this.state.salarySelected.length === 0){
      return page
    }
    if (this.state.search.length > 0 && this.state.salarySelected.length === 0 && this.state.citySelected.length === 0){
        return page
  }
  page = 0
  return page
}
  selectSalaryRnge(range){
    console.log('clicked range', range)
    if (this.state.selectSalaryRnge !== range){
      this.setState({ salarySelected: range })
      this.getData(this.state.salarySelected)
    } 
    if (this.state.salarySelected === range){
      this.setState({ currentPage: 0 })
      this.setState({ salarySelected: '' })
      this.getData()
    }
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    console.log('page', selectedPage, 'off', offset)
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
      this.getData()
      this.props.setForcedPage(this.state.currentPage)
    });
    window.scrollTo(0, 0)
};

  showCityJobs(city){
    if (this.state.citySelected !== city){
    this.setState({ citySelected: city })
    this.getData(this.state.citySelected)
    } else {
      this.setState({ currentPage: 0 })
      this.setState({ citySelected: '' })
      this.getData()
    }
  }
  onChange(e){
    this.setState({ currentPage: 0 })
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
    for (let i = 1; i <= 2; i++){
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
        container.push(...gigs)
      });
    }
    //if no search selected
    if (this.state.search.length === 0 ){
      //if no search but city selected && salary selected
      if (this.state.citySelected.length > 0 && this.state.salarySelected.length > 0){
        const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected))
              
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []
        for (let job of searchedJobs){
          let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
          let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
          if (min > 50000 && max <= 100000){
            salary50to100.push(job)
          }
          if (min > 100000 && min < 150000){
            salary100to150.push(job)
          }
          if (max < 50000){
            salaryLessThan50.push(job)
          }
          if (min > 150000){
            salaryGreatThen150.push(job)
          }
        }
        //shows amount next to salary range 
        this.setState({ salaryRanges: ([['50-100K', salary50to100.length], ['100-150K', salary100to150.length], ['150K+', salaryGreatThen150.length], ['<50K', salaryLessThan50.length]]) })

        var searchedJobsWithSalary

        if (this.state.salarySelected === '<50K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salaryLessThan50.includes(job))
        }
        if (this.state.salarySelected === '100-150K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salary100to150.includes(job))
        }
        if (this.state.salarySelected === '150K+'){
          searchedJobsWithSalary = searchedJobs.filter(job => salaryGreatThen150.includes(job))
        }
        if (this.state.salarySelected === '50-100K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salary50to100.includes(job))
        }
        
        if (searchedJobsWithSalary.length === 0){
          this.setState({ filteredSearchJobs: 0 })
          return
        }
        const slice = searchedJobsWithSalary.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({ filteredSearchJobs: searchedJobsWithSalary.length })
        const postData = slice.map((job) => {
          return (
            <article className="job-card" style={{
              width: '100%',
              marginBottom: '20px',
            }}>
                <div className="company-logo-img">
                  <img 
                      src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                <div className="skills-container">
                  <div className="skill">Photoshop</div>
                  <div className="skill">Illustrator</div>
                  <div className="skill">HTML</div>
                </div>
                <button className="apply">Apply</button>
                <button className="save">Save Job</button>
                <a href="#"></a>
            </article>
          )
        })
    
        this.setState({
          pageCount: Math.ceil(searchedJobs.length / this.state.perPage),      
          postData
         })
         this.setState({ loading: false })
         return
      
    }
      //if no search no salary selected and city selected
      if (this.state.citySelected.length > 0 && this.state.salarySelected.length === 0){
          const slice = container.filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected)).slice(this.state.offset, this.state.offset + this.state.perPage)
          const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected))
          
          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of searchedJobs){
            let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
            let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
            if (min > 50000 && max <= 100000){
              salary50to100.push(job)
            }
            if (min > 100000 && min < 150000){
              salary100to150.push(job)
            }
            if (max < 50000){
              salaryLessThan50.push(job)
            }
            if (min > 150000){
              salaryGreatThen150.push(job)
            }
          }
          
         this.setState({ salaryRanges: ([['50-100K', salary50to100.length], ['100-150K', salary100to150.length], ['150K+', salaryGreatThen150.length], ['<50K', salaryLessThan50.length]]) })
         this.setState({ filteredSearchJobs: searchedJobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(searchedJobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
      }
     
      //if no search and no city
      if (this.state.search.length === 0 && this.state.citySelected.length === 0){
        //if no search and no city but salary selected
        if (this.state.salarySelected.length > 0){
          const searchedJobs = container
          
          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of searchedJobs){
            let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
            let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
            if (min > 50000 && max <= 100000){
              salary50to100.push(job)
            }
            if (min > 100000 && min < 150000){
              salary100to150.push(job)
            }
            if (max < 50000){
              salaryLessThan50.push(job)
            }
            if (min > 150000){
              salaryGreatThen150.push(job)
            }
          }
          var jobs 
          if (this.state.salarySelected === '100K-150K'){
          jobs = salary100to150
          const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
          }
          if (this.state.salarySelected === '50-100K'){
            jobs = salary50to100
            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
          }
          if (this.state.salarySelected === '<50K'){
            jobs = salaryLessThan50
            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
          }
          if (this.state.salarySelected === '150K>'){
            jobs = salaryGreatThen150
            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
          }
        }
        const slice = container.slice(this.state.offset, this.state.offset + this.state.perPage)
        console.log('offset', this.state.offset, 'state per page', this.state.perPage)

        //segment jobs by salary
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []
        for (let job of container){
          let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
          let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
          if (min > 50000 && max <= 100000){
            salary50to100.push(job)
          }
          if (min > 100000 && min < 150000){
            salary100to150.push(job)
          }
          if (max < 50000){
            salaryLessThan50.push(job)
          }
          if (min > 150000){
            salaryGreatThen150.push(job)
          }
        }

      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K>', [salaryGreatThen150.length]]] })
      //top cities 
      let map = {}
      for (let job of container){
        let city = job.MatchedObjectDescriptor.PositionLocation[0].CityName
        if (map[city] === undefined){
            map[city] = 1
        }
        map[city] += 1
      }
      const sortedKeys = Object.keys(map).map(city => map[city]).sort((a,b) => b - a).slice(0, 5)
      let keys = Object.keys(map)
      let topCities = []
      for (let key of keys){
        if (sortedKeys.includes(map[key])){
          topCities.push([key, map[key]])
        }
      }
      this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]) })
      this.setState({ filteredSearchJobs: container.length})
      const postData = slice.map((job) => {
        return (
          <article className="job-card" style={{
            width: '100%',
            marginBottom: '20px',
          }}>
              <div className="company-logo-img">
                <img 
                    src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
              }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
              <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
              <div className="skills-container">
                <div className="skill">Photoshop</div>
                <div className="skill">Illustrator</div>
                <div className="skill">HTML</div>
              </div>
              <button className="apply">Apply</button>
              <button className="save">Save Job</button>
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


    }
      
    //if a search was made and no city selected
    if (this.state.search.length > 0 && this.state.citySelected.length === 0){
      //if search was made and no city selected BUT salary selected
      if (this.state.salarySelected.length > 0){
        const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search))
          
          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of searchedJobs){
            let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
            let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
            if (min > 50000 && max <= 100000){
              salary50to100.push(job)
            }
            if (min > 100000 && min < 150000){
              salary100to150.push(job)
            }
            if (max < 50000){
              salaryLessThan50.push(job)
            }
            if (min > 150000){
              salaryGreatThen150.push(job)
            }
          }
          var jobs 
          if (this.state.salarySelected === '100K-150K'){
            jobs = salary100to150
          }
          if (this.state.salarySelected === '50-100K'){
            jobs = salary50to100
          }
          if (this.state.salarySelected === '<50K'){
            jobs = salaryLessThan50
          }
          if (this.state.salarySelected === '150K>'){
            jobs = salaryGreatThen150
          }
          const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          console.log('offset', this.state.offset, 'state per page', this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <article className="job-card" style={{
                width: '100%',
                marginBottom: '20px',
              }}>
                  <div className="company-logo-img">
                    <img 
                        src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
                  }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
                  <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
                  <div className="skills-container">
                    <div className="skill">Photoshop</div>
                    <div className="skill">Illustrator</div>
                    <div className="skill">HTML</div>
                  </div>
                  <button className="apply">Apply</button>
                  <button className="save">Save Job</button>
                  <a href="#"></a>
              </article>
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
      }

    const slice = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({ filteredSearchJobs: container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).length })
    const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search))
    
    
    let map = {}
      for (let job of searchedJobs){
        let city = job.MatchedObjectDescriptor.PositionLocation[0].CityName
        if (map[city] === undefined){
            map[city] = 1
        }
        map[city] += 1
      }
      const sortedKeys = Object.keys(map).map(city => map[city]).sort((a,b) => b - a).slice(0, 5)
      let keys = Object.keys(map)
      let topCities = []
      for (let key of keys){
        if (sortedKeys.includes(map[key])){
          topCities.push([key, map[key]])
        }
      }
        //segment jobs by salary
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []

        for (let job of searchedJobs){
          let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
          let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
          if (min > 50000 && max <= 100000){
            salary50to100.push(job)
          }
          if (min > 100000 && min < 150000){
            salary100to150.push(job)
          }
          if (max < 50000){
            salaryLessThan50.push(job)
          }
          if (min > 150000){
            salaryGreatThen150.push(job)
          }
        }

      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K>', [salaryGreatThen150.length]]] })

      this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]) })
      const postData = slice.map((job) => {
       
      return (
        <article 
          className="job-card" style={{
          width: '100%',
          marginBottom: '20px',
        }}>
            <div className="company-logo-img">
              <img 
                  src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
            }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
            <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
            <div className="skills-container">
              <div className="skill">Photoshop</div>
              <div className="skill">Illustrator</div>
              <div className="skill">HTML</div>
            </div>
            <button className="apply">Apply</button>
            <button className="save">Save Job</button>
            <a href="#"></a>
        </article>
      )
    })
    this.setState({
      pageCount: Math.ceil(container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).length / this.state.perPage),      
      postData
     })
     this.setState({ loading: false })
     return
    }

     //if a search was made and a city selected
     if (this.state.search.length > 0 && this.state.citySelected.length > 0){
      //if a search was made and a city selected AND a salary selected
      if (this.state.salarySelected.length > 0){
        const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected))
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []

        for (let job of searchedJobs){
          let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
          let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
          if (min > 50000 && max <= 100000){
            salary50to100.push(job)
          }
          if (min > 100000 && min < 150000){
            salary100to150.push(job)
          }
          if (max < 50000){
            salaryLessThan50.push(job)
          }
          if (min > 150000){
            salaryGreatThen150.push(job)
          }
        }
        var jobs 
          if (this.state.salarySelected === '100K-150K'){
            jobs = salary100to150
          }
          if (this.state.salarySelected === '50-100K'){
            jobs = salary50to100
          }
          if (this.state.salarySelected === '<50K'){
            jobs = salaryLessThan50
          }
          if (this.state.salarySelected === '150K>'){
            jobs = salaryGreatThen150
          }
      const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({ filteredSearchJobs: jobs.length })
      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K>', [salaryGreatThen150.length]]] })
      const postData = slice.map((job) => {
       
      return (
        <article 
          className="job-card" style={{
          width: '100%',
          marginBottom: '20px',
        }}>
            <div className="company-logo-img">
              <img 
                  src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
            }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
            <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
            <div className="skills-container">
              <div className="skill">Photoshop</div>
              <div className="skill">Illustrator</div>
              <div className="skill">HTML</div>
            </div>
            <button className="apply">Apply</button>
            <button className="save">Save Job</button>
            <a href="#"></a>
        </article>
      )
    })
    this.setState({
      pageCount: Math.ceil(jobs.length / this.state.perPage),      
      postData
     })
     this.setState({ loading: false })
     return
    }
      //if a search was made and city seleted (no salary selected)
      const slice = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected)).slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({ filteredSearchJobs: container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected)).length })
      const searchedJobs = container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected))
      let map = {}
        for (let job of searchedJobs){
          let city = job.MatchedObjectDescriptor.PositionLocation[0].CityName
          if (map[city] === undefined){
              map[city] = 1
          }
          map[city] += 1
        }
        const sortedKeys = Object.keys(map).map(city => map[city]).sort((a,b) => b - a).slice(0, 5)
        let keys = Object.keys(map)
        let topCities = []
        for (let key of keys){
          if (sortedKeys.includes(map[key])){
            topCities.push([key, map[key]])
          }
        }
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []

        for (let job of searchedJobs){
          let min = job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange * 1
          let max = job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange * 1
          if (min > 50000 && max <= 100000){
            salary50to100.push(job)
          }
          if (min > 100000 && min < 150000){
            salary100to150.push(job)
          }
          if (max < 50000){
            salaryLessThan50.push(job)
          }
          if (min > 150000){
            salaryGreatThen150.push(job)
          }
        }
        this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K>', [salaryGreatThen150.length]]] })
        const postData = slice.map((job) => {
         
        return (
          <article 
            className="job-card" style={{
            width: '100%',
            marginBottom: '20px',
          }}>
              <div className="company-logo-img">
                <img 
                    src={this.displayImage(job.MatchedObjectDescriptor.DepartmentName)} 
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
              }}>{job.MatchedObjectDescriptor.PositionTitle}</div>
              <div className="company-name">{job.MatchedObjectDescriptor.OrganizationName}</div>
              <div className="skills-container">
                <div className="skill">Photoshop</div>
                <div className="skill">Illustrator</div>
                <div className="skill">HTML</div>
              </div>
              <button className="apply">Apply</button>
              <button className="save">Save Job</button>
              <a href="#"></a>
          </article>
        )
      })
      this.setState({
        pageCount: Math.ceil(container.filter(job => job.MatchedObjectDescriptor.PositionTitle.includes(this.state.search)).filter(job => job.MatchedObjectDescriptor.PositionLocation[0].CityName.includes(this.state.citySelected)).length / this.state.perPage),      
        postData
       })
       this.setState({ loading: false })
     }
  }

  componentDidMount(){
    try {      
      this.getData()
      this.props.forcePage()
    }
    catch(err){
      console.log(err)
    }
  }


  render() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
    const {  onChange, showCityJobs, selectSalaryRnge, setCurrentPage } = this;
    const { topCities, filteredSearchJobs, selections, salaryRanges, salarySelected } = this.state
    console.log(this.props.forcedPage)
    return (
      <div>
        <Header />
        <HeroSection />
        <div>
          <div className="container">
              <div className="container">
                  <div style={{
                    display: 'flex'
                  }}>
                    {/* //the filters */}
                    <div className='row' style={{
                      height: '46vh',
                      flexDirection: 'column',
                      width: '400px',
                      marginRight: '20px',
                    }}>
                        <div style={{
                          alignContent: 'flex-start',
                          display: 'flex',
                          height: '48vh',
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
                                      className="icon" 
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
                                       {topCities.length > 0 ? 
                                       topCities.map(city => {
                                       const thecity = city[0].substring(0, city[0].indexOf(",")) 
                                        return (
                                        <li 
                                          className={this.state.citySelected === thecity ? 'selected' : ''}
                                          key={Math.random() * (1000000 - 1 + 1) + 1}
                                          style={{
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
                                          MozUserSelect: 'none',
                                          WebkitUserSelect: 'none',
                                          WebkitTouchCallout: 'none',
                                          
                                        }}>
                                            <a 
                                            onClick={() => showCityJobs(thecity)}
                                              style={{
                                              display: 'flex',
                                              height: '100%',
                                              width: '100%',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: '#031b4e'
                                            }}>
                                              <div>
                                                {thecity}
                                              </div>
                                              <span style={{
                                                marginLeft: '7px'
                                              }} className="badge badge-secondary">{city[1]}</span>
                                            </a>
                                        </li>
                                        )
                                       })
                                          :
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
                                            width="50"
                                            visible={true}
                                          /> 
                                        </div>
                                       }
                                      </ul>
                                    </div>
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
                                    }}> Salary Range</p>
                                    <div>
                                      <ul style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexWrap: 'wrap',
                                        marginLeft: '-14%'
                                      }}>
                                       {salaryRanges.length >= 3 ? 
                                       salaryRanges.map(salaryRange => {
                                          const range = salaryRange[0]
                                          //this.state.salarySelected.length === 0 may not need
                                          const numOfJobs = salaryRange[1]
                                            return (
                                            <li 
                                              className={this.state.salarySelected === range ? 'selected' : ''}
                                              key={Math.random() * (1000000 - 1 + 1) + 1}
                                              style={{
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
                                              MozUserSelect: 'none',
                                              WebkitUserSelect: 'none',
                                              WebkitTouchCallout: 'none'
                                        }}>
                                            <a 
                                              onClick={() => numOfJobs > 0 ? selectSalaryRnge(range) : null}
                                              style={{
                                              display: 'flex',
                                              height: '100%',
                                              width: '100%',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: '#031b4e'
                                            }}>
                                              <div>
                                                {range}
                                              </div>
                                              <span style={{
                                                marginLeft: '7px'
                                              }} className="badge badge-secondary">{numOfJobs}</span>
                                            </a>
                                        </li>
                                        )
                                       })
                                          :
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
                                            width="50"
                                            visible={true}
                                          /> 
                                        </div>
                                      } 
                                      </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>  
                     {/* the jobs */}
                    <div className="col-8">
                      <div style={{
                        display: 'flex'
                      }}>
                      {this.state.citySelected.length > 0 ? 
                          <div style={{
                         display: 'flex',
                         justifyContent: 'flex-start',
                         background: '#fff',
                         boxSizing: 'border-box',
                         margin: '0',
                         width: '720px',
                         position: 'relative',
                         zIndex: '1',
                         marginBottom: '1rem',
                         marginLeft: 'auto',
                         marginRight: 'auto',
                         flexWrap: 'wrap',
                         marginLeft: '-1%'
                       }}>
                           <ul style={{
                               display: 'flex',
                               justifyContent: 'flex-start',
                               background: '#fff',
                               boxSizing: 'border-box',
                               margin: '0',
                               width: '720px',
                               position: 'relative',
                               zIndex: '1',
                               marginBottom: '1rem',
                               marginLeft: 'auto',
                               marginRight: 'auto',
                               flexWrap: 'wrap',    
                           }}>
                             <li style={{
                               listStyle: 'none',
                               marginLeft: '-11%'
                             }}>
                                 <ul style={{
                                   display: 'flex',
                                   flexWrap: 'wrap'
                                 }}>
                                   <li 
                                   onClick={() => showCityJobs(selection)}
                                   style={{
                                     padding: '0',
                                     display: 'flex',
                                     alignItems: 'center',
                                     background: 'rgba(0,0,0,0)',
                                     
                                   }}>
                                       <a style={{
                                         background: '#fff',
                                         color: '#055eff',
                                         fontSize: '16px',
                                         fontWeight: '600',
                                         display: 'flex',
                                         alignItems: 'center',
                                         border: '1px solid #055eff',
                                         padding: '0 8px',
                                         lineHeight: '32px',
                                         borderRadius: '4px',
                                       }}>
                                         <span style={{
                                           whiteSpace: 'nowrap'
                                         }}>
                                           Location: {this.state.citySelected}
                                         </span>
                                         <span style={{
                                          marginLeft: '7px',
                                          marginBottom: '2px'
                                         }}>
                                            <GiCancel />
                                         </span>
                                       </a>
                                   </li>
                                 </ul>
                             </li>
                           </ul>
                       </div>
                        : null
                    } 
                    {
                      this.state.salarySelected.length > 0 ?
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        background: '#fff',
                        boxSizing: 'border-box',
                        margin: '0',
                        width: '720px',
                        position: 'relative',
                        zIndex: '1',
                        marginBottom: '1rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        flexWrap: 'wrap',
                        marginLeft: '-1%'
                      }}>
                          <ul style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              background: '#fff',
                              boxSizing: 'border-box',
                              margin: '0',
                              width: '720px',
                              position: 'relative',
                              zIndex: '1',
                              marginBottom: '1rem',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              flexWrap: 'wrap',    
                          }}>
                            <li style={{
                              listStyle: 'none',
                              marginLeft: '-11%'
                            }}>
                                <ul style={{
                                  display: 'flex',
                                  flexWrap: 'wrap'
                                }}>
                                  <li 
                                  onClick={() => selectSalaryRnge(selection)}
                                  style={{
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'rgba(0,0,0,0)',
                                    
                                  }}>
                                      <a style={{
                                        background: '#fff',
                                        color: '#055eff',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #055eff',
                                        padding: '0 8px',
                                        lineHeight: '32px',
                                        borderRadius: '4px',
                                      }}>
                                        <span style={{
                                          whiteSpace: 'nowrap'
                                        }}>
                                          Salary Range: {this.state.salarySelected}
                                        </span>
                                        <span style={{
                                         marginLeft: '7px',
                                         marginBottom: '2px'
                                        }}>
                                           <GiCancel />
                                        </span>
                                      </a>
                                  </li>
                                </ul>
                            </li>
                          </ul>
                      </div>
                      :
                      null
                    }
                    </div>
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
                    {
                      this.state.loading ? '' :
                      <ReactPaginate
                          
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            // onClick={()=> forcePage(this.state.currentPage)}
                            forcePage = {this.state.currentPage}
                            pageCount={Math.ceil(this.state.pageCount * 1)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    }
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
    username: state.auth.username,
    forcedPage: state.forcePage
  }
}

const mapDispatch = (dispatch) => {
  return {
    forcePage: () => {
      dispatch(setForcePage())
    },
    setForcedPage: (pageNumber) => {
      dispatch(updateForcedPage(pageNumber))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)


