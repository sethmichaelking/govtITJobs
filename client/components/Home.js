import {connect} from 'react-redux'
import React, { Component } from 'react'
import Header from './Header'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import { RotatingLines } from 'react-loader-spinner'
import { setForcePage, updateForcedPage, getJobs } from '../store'
import Badge from 'react-bootstrap/Badge';
import axios from 'axios'
import Job from './Job'
import {
  GiCancel
} from 'react-icons/gi'
import EmptyState from './EmptyState'


class Home extends Component {
  constructor(){
    super()
      this.state = {
        clicked: false,
        NothingFound: false,
        show: false,
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
        initialValue: 0,
        jobSummary: '',
        contactEmail: '',
        whatToExpect: '',
        majorDuties: '',
        keyRequirements: [],
        applyClicked: false,
        departmentName: '',
        OrganizationName: '',
        drugTest: '',
        remote: '',
        highGrade: '',
        jobTitle: '',
        positionURI: '',
        savedJobs: new Set()
      }
      this.getData = this.getData.bind(this)
      this.displayImage = this.displayImage.bind(this)
      this.handlePageClick = this.handlePageClick.bind(this)
      this.onChange = this.onChange.bind(this)
      this.showCityJobs = this.showCityJobs.bind(this)
      this.selectSalaryRnge = this.selectSalaryRnge.bind(this)
      this.setCurrentPage = this.setCurrentPage.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.isJobExpiringSoon = this.isJobExpiringSoon.bind(this)
      this.getJobs = this.getJobs.bind(this)
      this.jobs = undefined
  }

      async getJobs(){
            if (this.jobs === undefined){
              let container = []
              this.setState({ loading: true })
              const response = await axios.get('/apijobs')
              const data = response.data
              container.push(...data)
          this.jobs = container
          this.setState({ loading: false })
        }
        return this.jobs
      }


  isJobExpiringSoon(jobDate, startDate){
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


  handleClose(){
    this.setState({ show: false })
  }
  handleShow(){
    this.setState({ show: true })
  }
  handleSave(obj){
    obj.e.stopPropagation()
    const job = {
      DepartmentName: obj.deptName,
      JobTitle: obj.title,
      OrganizationName: obj.orgName,
      DrugTestRequired: obj.drugTest,
      TeleworkEligible: obj.remote,
      PositionURI: obj.url,
      jobSummary: obj.summary,
      userId: this.props.auth.id * 1
    }
    this.props.saveJob(job)
    // this.getData()

  }

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
    console.log('slected range', range)
    if (this.state.selectSalaryRnge !== range){
      this.setState({ currentPage: 0 })
      this.setState({ offset: 0 })
      this.setState({ salarySelected: range })
      this.getData(this.state.salarySelected)
    } 
    if (this.state.salarySelected === range){
      this.setState({ currentPage: 0 })
      this.setState({ offset: 0 })
      this.setState({ salarySelected: '' })
      this.getData()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
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
    this.setState({ currentPage: 0 })
    this.setState({ offset: 0 })
    this.setState({ citySelected: city })
    this.getData(this.state.citySelected)
    } else {
      this.setState({ currentPage: 0 })
      this.setState({ offset: 0 })
      this.setState({ citySelected: '' })
      this.getData()
    }
  }
  onChange(e){
    this.setState({ currentPage: 0 })
    this.setState({search: e.target.value })
    this.setState({ offset: 0 })
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
    
   getData = async() => {
    let container = await this.getJobs()
    //if no search selected
    if (this.state.search.length === 0 ){
      //if no search but city selected && salary selected
      if (this.state.citySelected.length > 0 && this.state.salarySelected.length > 0){
        console.log('city and salary')

        const searchedJobs = container.filter(job => job.city.split(',')[0] === (this.state.citySelected))

        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []
        for (let job of searchedJobs){
          let min = job.min
          let max = job.max
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
        // shows amount next to salary range 
        this.setState({ salaryRanges: ([['50-100K', salary50to100.length], ['100K-150K', salary100to150.length], ['150K+', salaryGreatThen150.length], ['<50K', salaryLessThan50.length]]) })

        var searchedJobsWithSalary

        if (this.state.salarySelected === '<50K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salaryLessThan50.includes(job))
        }
        if (this.state.salarySelected === '100K-150K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salary100to150.includes(job))
        }
        if (this.state.salarySelected === '150K+'){
          searchedJobsWithSalary = searchedJobs.filter(job => salaryGreatThen150.includes(job))
        }
        if (this.state.salarySelected === '50-100K'){
          searchedJobsWithSalary = searchedJobs.filter(job => salary50to100.includes(job))
        }
        
        if (searchedJobsWithSalary === undefined || searchedJobsWithSalary.length === 0){
          const postData = <EmptyState />
          this.setState({
            NothingFound: true,
            pageCount: 0,      
            postData
           })
          this.setState({ loading: false })
          this.setState({ filteredSearchJobs: searchedJobs.length })
          return
        }
        const slice = searchedJobsWithSalary.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({ filteredSearchJobs: searchedJobsWithSalary.length })
        const postData = slice.map((job) => {
          return (
            <Job job = {job} />
          )
        })
    
        this.setState({
          pageCount: Math.ceil(searchedJobs.length / this.state.perPage),      
          postData
         })
         this.setState({ loading: false })
         return
    }
      //if no search no salary selected 
      if (this.state.citySelected.length > 0 && this.state.salarySelected.length === 0){
        console.log('just city selected')
          const justCityNameNoState = container.filter(job => job.city.split(',')[0] === (this.state.citySelected))
          const slice = justCityNameNoState.slice(this.state.offset, this.state.offset + this.state.perPage)
          const searchedJobs = justCityNameNoState

          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of justCityNameNoState){
            let min = job.min
            let max = job.max
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
          let map = {}
          for (let job of justCityNameNoState){
            let city = job.city.split(',')[0]
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
          this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
         this.setState({ salaryRanges: ([['50-100K', salary50to100.length], ['100K-150K', salary100to150.length], ['150K+', salaryGreatThen150.length], ['<50K', salaryLessThan50.length]]) })
         this.setState({ filteredSearchJobs: searchedJobs.length })
          const postData = slice.map((job) => {
            return (
              <Job job = {job} />
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
        console.log('no filter selected')
        if (this.state.salarySelected.length > 0){
          console.log('salary was selected')
          const searchedJobs = container

          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of searchedJobs){
            let min = job.min
            let max = job.max
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
          let map = {}
          for (let job of jobs){
            let city = job.city.split(',')[0]
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

          this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
          this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
          const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({ filteredSearchJobs: jobs.length })
          const postData = slice.map((job) => {
            return (
              <Job job = {job} />
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
            let map = {}
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            //
            this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
              //note to self: this needs to be moved to the other ranges too otherwise it won't display the right #
            //
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({ filteredSearchJobs: jobs.length })
            const postData = slice.map((job) => {
            return (
              <Job job = {job} />
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
            let map = {}
            for (let job of jobs){
              let city = city.split(',')[0]
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
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
            this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({ filteredSearchJobs: jobs.length })
            const postData = slice.map((job) => {
            return (
              <Job job = {job} />
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
          }
          if (this.state.salarySelected === '150K+'){
            jobs = salaryGreatThen150
            let map = {}
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
            this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })

            const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({ filteredSearchJobs: jobs.length })
            const postData = slice.map((job) => {
            return (
              <Job job = {job} />
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
        console.log('no filters selected')
        const slice = container.slice(this.state.offset, this.state.offset + this.state.perPage)

        //segment jobs by salary
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []
        for (let job of container){
          let min = job.min
          let max = job.max
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

      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
      
      
      //top cities 
      let map = {}
      for (let job of container){
        let city = job.city.split(',')[0]
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

      this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
      this.setState({ filteredSearchJobs: container.length})

      const postData = slice.map((job) => {
        return (
          <div>
             <Job job = {job} />
          </div>
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
        console.log('search and salary')
        const searchedJobs = container.filter(job => job.JobTitle.includes(this.state.search))
          
          let salary50to100 = []
          let salary100to150= []
          let salaryLessThan50 = []
          let salaryGreatThen150 = []
          for (let job of searchedJobs){
            let min = job.min
            let max = job.max
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

          let map = {}
          var jobs 
          if (this.state.salarySelected === '100K-150K'){
            jobs = salary100to150
            let map = {}
            if (jobs.length > 0){
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            if (topCities.length === 0){
              console.log('nothing')
              this.setState({ topCities: [['No Citys Found', 0]] })
              const postData = <EmptyState />
              this.setState({
                NothingFound: true,
                pageCount: 0,      
                postData
               })
              this.setState({ loading: false })
              this.setState({ filteredSearchJobs: searchedJobs.length })
              return
            }
          this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
           }
          }
          if (this.state.salarySelected === '50-100K'){
            jobs = salary50to100
            let map = {}
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            if (topCities.length === 0){
              console.log('nothing')
              this.setState({ topCities: [['No Citys Found', 0]] })
              const postData = <EmptyState />
              this.setState({
                NothingFound: true,
                pageCount: 0,      
                postData
               })
              this.setState({ loading: false })
              this.setState({ filteredSearchJobs: searchedJobs.length })
              return
            }
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
          }
          if (this.state.salarySelected === '<50K'){
            jobs = salaryLessThan50
            let map = {}
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            if (topCities.length === 0){
              console.log('nothing')
              this.setState({ topCities: [['No Citys Found', 0]] })
              const postData = <EmptyState />
              this.setState({
                NothingFound: true,
                pageCount: 0,      
                postData
               })
              this.setState({ loading: false })
              this.setState({ filteredSearchJobs: searchedJobs.length })
              return
            }
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
          }
          if (this.state.salarySelected === '150K+'){
            jobs = salaryGreatThen150
            let map = {}
            for (let job of jobs){
              let city = job.city.split(',')[0]
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
            if (topCities.length === 0){
              console.log('nothing')
              this.setState({ topCities: [['No Citys Found', 0]] })
              const postData = <EmptyState />
              this.setState({
                NothingFound: true,
                pageCount: 0,      
                postData
               })
              this.setState({ loading: false })
              this.setState({ filteredSearchJobs: searchedJobs.length })
              return
            }
            this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
          }
          for (let job of jobs){
            let city = job.city.split(',')[0]
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
          this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
          const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)

          this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })

          this.setState({ filteredSearchJobs: jobs.length })

          const postData = slice.map((job) => {
            return (
              <Job job = {job} />
            )
          })
      
          this.setState({
            pageCount: Math.ceil(jobs.length / this.state.perPage),      
            postData
           })
           this.setState({ loading: false })
           return
      }
    //if a search was made and no city or salary selected
    this.setState({ filteredSearchJobs: container.filter(job => job.JobTitle.includes(this.state.search)).length })

    const searchedJobs = container.filter(job => job.JobTitle.includes(this.state.search))
    if (searchedJobs === undefined || searchedJobs.length === 0){
      const postData = <EmptyState />
      this.setState({
        NothingFound: true,
        pageCount: 0,      
        postData
       })
       this.setState({ loading: false })
       return
      }
    
    const slice = searchedJobs.slice(this.state.offset, this.state.offset + this.state.perPage)


    if (searchedJobs.length > 0){
    let map = {}
      for (let job of searchedJobs){
        let city = job.city.split(',')[0]
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
        var jobs
        for (let job of searchedJobs){
          let min = job.min
          let max = job.max
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

      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })

      this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })
    

      const postData = slice.map((job) => {
      return (
        <Job job = {job} />
      )
    })
    this.setState({
      pageCount: Math.ceil(container.filter(job => job.JobTitle.includes(this.state.search)).length / this.state.perPage),      
      postData
     })
     this.setState({ loading: false })
     return
    }
  }
     //if a search was made and a city selected
     if (this.state.search.length > 0 && this.state.citySelected.length > 0){
      console.log('search & city ')
      //if a search was made and a city selected AND a salary selected
      if (this.state.salarySelected.length > 0){
        console.log('search & city & salary')
        const searchedJobs = container.filter(job => job.JobTitle.includes(this.state.search)).filter(job => job.city.split(',')[0].includes(this.state.citySelected))
     
        
        let salary50to100 = []
        let salary100to150= []
        let salaryLessThan50 = []
        let salaryGreatThen150 = []

        for (let job of searchedJobs){
          let min = job.min
          let max = job.max
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
          if (this.state.salarySelected === '150K+'){
            jobs = salaryGreatThen150
          }
      const slice = jobs.slice(this.state.offset, this.state.offset + this.state.perPage)

      if (slice.length === 0){
        console.log('nothing to display')
            const postData = <EmptyState />
            this.setState({
              filteredSearchJobs: 0, 
              NothingFound: true,
              pageCount: 0,      
              postData
             })
             this.setState({ salaryRanges: [['50-100K', 0], ['100K-150K', 0], ['<50K', 0], ['150K+', 0]] })
             this.setState({ loading: false })
             return
      }
      this.setState({ filteredSearchJobs: jobs.length })
      this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
      
      const postData = slice.map((job) => {
       
      return (
        <Job job = {job} />
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
      const justCityNameNoState = container.filter(job => job.city.split(',')[0] === (this.state.citySelected))
      const slice = container.filter(job => job.JobTitle.includes(this.state.search)).filter(job => justCityNameNoState.includes(job)).slice(this.state.offset, this.state.offset + this.state.perPage)
      const searchedJobs = container.filter(job => job.JobTitle.includes(this.state.search)).filter(job => justCityNameNoState.includes(job))

      console.log('searchedJobs', searchedJobs.length)

      this.setState({ filteredSearchJobs: searchedJobs.length })
      let map = {}
        for (let job of searchedJobs){
          let city = job.city.split(',')[0]
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
        //
        this.setState({ topCities: topCities.sort((a,b) => b[1] - a[1]).slice(0, 6) })

        //
        for (let job of searchedJobs){
          let min = job.min
          let max = job.max
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
        this.setState({ salaryRanges: [['50-100K', [salary50to100.length]], ['100K-150K', [salary100to150.length]], ['<50K', [salaryLessThan50.length]], ['150K+', [salaryGreatThen150.length]]] })
        
        const postData = slice.map((job) => {
         
        return (
            <Job job = {job} />
        )
      })
      this.setState({
        pageCount: Math.ceil(container.filter(job => job.JobTitle.includes(this.state.search)).filter(job => job.city.split(',')[0].includes(this.state.citySelected)).length / this.state.perPage),      
        postData
       })
       this.setState({ loading: false })
     }
  }

  async componentDidMount(){
    try {      
      this.getData()
      this.props.forcePage()
      this.props.getAllJobs(this.props.auth.id)
    }
    catch(err){
      console.log(err)
    }
  }


  render() {
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`
    const {  onChange, showCityJobs, selectSalaryRnge, isJobExpiringSoon } = this;
    const { topCities, filteredSearchJobs, selections, salaryRanges, salarySelected } = this.state
    const { auth } = this.props

    return (
      <div style={{
        overflowX: 'clip'
      }}>
        <Header style={{
        marginBottom: '45px'
        }}/>
        <div>
          <div className="container">
              <div className="container">
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
                                        marginLeft: '-11%'
                                      }}>
                                       {topCities.length > 0 ? 
                                       topCities.map(city => {
                                       const thecity = city[0] 
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
                                              color: this.state.loading ? 'rgb(23, 22, 22)' : '#031b4e',
                                              pointerEvents: this.state.loading ? 'none' : 'auto',
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
                                        marginLeft: '-11%'
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
                                              onClick={this.state.loading ? null : () => selectSalaryRnge(range)}
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
                                              }} className="badge badge-secondary">{this.state.loading ? '?' : numOfJobs}</span>
                                            </a>
                                        </li>
                                        )
                                       })
                                          :
                                          <div style={{
                                            margin: '30px auto',
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
                        {
                      this.state.salarySelected.length > 0 ?
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        background: '#fff',
                        boxSizing: 'border-box',
                        margin: '0px auto 1rem 5%',
                        width: '200px',
                        position: 'relative',
                        zIndex: '1',
                        marginBottom: '1rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        flexWrap: 'wrap',
                        marginLeft: '-1%'
                      }}>
                            <div style={{
                              listStyle: 'none',
                              marginLeft: '2%'
                            }}>
                                <div style={{
                                  display: 'flex',
                                  flexWrap: 'wrap'
                                }}>
                                  <div 
                                  style={{
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'rgba(0,0,0,0)',
                                    
                                  }}>
                                      <a style={{
                                        marginLeft: '5px',
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
                                  </div>
                                </div>
                            </div>
                      </div>
                      :
                      null
                    }
                      {this.state.citySelected.length > 0 ? 
                    
                          <div style={{
                         display: 'flex',
                         justifyContent: 'flex-start',
                         background: '#fff',
                         boxSizing: 'border-box',
                         margin: '0px auto 1rem -1%',
                         width: '250px',
                         position: 'relative',
                         zIndex: '1',
                         marginBottom: '1rem',
                         marginLeft: 'auto',
                         marginRight: 'auto',
                         flexWrap: 'wrap',
                         marginLeft: '-1%'
                       }}>
                             <div style={{
                               listStyle: 'none',
                               marginLeft: '-21%'
                             }}>
                                 <div style={{
                                   display: 'flex',
                                   flexWrap: 'wrap',
                                   marginLeft: '42px'
                                 }}>
                                   <div
                                   style={{
                                     padding: '0',
                                     display: 'flex',
                                     alignItems: 'center',
                                     background: 'rgba(0,0,0,0)',
                                     
                                   }}>
                                       <a style={{
                                        marginLeft: '22px',
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
                                   </div>
                                 </div>
                             </div>
                           {/* </ul> */}
                       </div>
                        : null
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
                      <div>
                      <div style={{
                        margin: '50px auto',
                        listStyle: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        display: 'flex',
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
                        <p style={{
                          margin: '50px auto',
                          listStyle: 'none',
                          outline: 'none',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          fontWeight: '600'
                        }}> Pulling data from the USA API. <br />This could take up to 15 seconds. </p>
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
    forcedPage: state.forcePage,
    auth: state.auth,
    jobs: state.jobs
  }
}

const mapDispatch = (dispatch) => {
  return {
    forcePage: () => {
      dispatch(setForcePage())
    },
    setForcedPage: (pageNumber) => {
      dispatch(updateForcedPage(pageNumber))
    },
    saveJob: (job) => {
      dispatch(saveJobs(job))
    },
    getAllJobs: (id) => {
      dispatch(getJobs(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)


