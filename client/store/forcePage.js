
const SET_PAGE = 'SET_PAGE'
const UPDATE_PAGE = 'UPDATE_PAGE'
const setPage = page => ({type: SET_PAGE, page})

const UpdatePage = page => ({type: UPDATE_PAGE, page})


export default function(state = {}, action) {
    switch (action.type) {
      case SET_PAGE:
        return action.page
      case UPDATE_PAGE:
        return action.page
      default:
        return state
    }
  }

export const setForcePage = () => async dispatch => {
    const page = 0
    return dispatch(setPage(page))
}

export const updateForcedPage = (pageNumber) => async dispatch => {
    const page = pageNumber
    return dispatch(UpdatePage(page))
}

