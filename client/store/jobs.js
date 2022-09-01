import axios from 'axios'

const jobs = (state = [], action) => {
    if (action.type === 'SET_JOBS'){
        state = action.gigs
    }
    return state
}

export const getJobs = (pgNumber) => {
    return async(dispatch) => {
        var host = 'data.usajobs.gov'; 
        var userAgent = 'sethkingriter@gmail.com'
        var authKey = 'InzNEWOLXdrBHP/62f3tqX6pOhSGmFDaTdHOB9zEmbg=' 
        var pageNumber = pgNumber
          const response = await fetch(`https://data.usajobs.gov/api/search?Keyword=Software&ResultsPerPage=25&Page=${pageNumber}`, {
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
            dispatch({ type: 'SET_JOBS', gigs })
          });
    }
}

export default jobs