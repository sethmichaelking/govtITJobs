import axios from "axios"


const jobs = (state = [], action) => {
    if (action.type === 'SET_JOBS'){
        return  [...action.jobs]
    }
    if (action.type === 'REMOVE_JOB'){
       return state.filter((job) => job.id !== action.id)
    }
    return state
}

export const saveJob = (job) => async dispatch => {
  console.log('in store', job)
  const response = await axios.post('/savejob', job)
  console.log('response', response)
}
export const fetchUserJobs = (id) => async dispatch => {
  const response = await axios.get(`/getSavedJobs/${id}`)
  const data = response.data
}

export const fetchSavedJobs = (arr) => {
  console.log('in store', arr)
}
export const deleteJob = (id) => async dispatch => {
  const response = await axios.delete(`/jobs/${id}`)
    dispatch({ type: 'REMOVE_JOB', id })
}

export const getJobs = (id) => {
  return async(dispatch) => {
    const response = await axios.get(`/jobs/${id}`)
    const jobs = response.data
    dispatch({ type: 'SET_JOBS', jobs})
  }
}

export default jobs