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

export const saveJobs = (job) => async dispatch => {
  const response = await axios.post('/savejob', job)
  console.log('response', response)
}

export const deleteJob = (id) => async dispatch => {
  const response = await axios.delete(`/jobs/${id}`)
    dispatch({ type: 'REMOVE_JOB', id })
}

export const getJobs = () => {
  return async(dispatch) => {
    const response = await axios.get('/jobs')
    const jobs = response.data
    console.log('jobs', [...jobs])
    dispatch({ type: 'SET_JOBS', jobs})
  }
}

export default jobs