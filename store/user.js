import axios from 'axios'

//https://www.ravelry.com/api#User_result
export const GET_USER = 'user/projects/USER';
export const GET_USER_SUCCESS = 'user/projects/USER_SUCCESS';
export const GET_USER_FAIL = 'user/projects/USER_FAIL';
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
  user: {}
}

export function getUser(userId) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/people/${userId}.json`
      }
    }
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    // history.push('/home') //add my account route
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, loadingProfile: true };
    case GET_USER_SUCCESS:
      return { ...state, loadingProfile: false, user: action.payload.data };
    case GET_USER_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    default:
      return state;
  }
}
