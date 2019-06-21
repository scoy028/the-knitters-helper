import axios from 'axios'

//https://www.ravelry.com/api#library_search
export const GET_PROJECTS = 'user/projects/LOAD';
export const GET_PROJECTS_SUCCESS = 'user/projects/LOAD_SUCCESS';
export const GET_PROJECTS_FAIL = 'user/projects/LOAD_FAIL';

//https://www.ravelry.com/api#Project_result
export const GET_PROJECT_INFO = 'user/projects/INFO';
export const GET_PROJECT_INFO_SUCCESS = 'user/projects/INFO_SUCCESS';
export const GET_PROJECT_INFO_FAIL = 'user/projects/INFO_FAIL';

const initialState = {
  projects: [],
  projectInfo: {},
};

export function listProjects(userName) {
  return {
    type: GET_PROJECTS,
    payload: {
      request: {
        url: `/projects/${userName}/list.json`
      }
    }
  };
}

export function getProjectDetail(userName, projectId) {
  return {
    type: GET_PROJECT_INFO,
    payload: {
      request: {
        url: `/projects/${userName}/${projectId}.json`
      }
    }
  };
}

export const getAllProjectsThunk = (userName) => async dispatch => {
  try {
    const projects = await axios.get(`/api/${userName}/list.json`)
    dispatch(listProjects(projects.data))
  } catch (err) {
    console.error(err)
  }
}

export const getProjectThunk = (userName, projectId) => async dispatch => {
  try {
    const project = await axios.get(`/projects/${userName}/${projectId}.json`)
    dispatch(getProjectDetail(project.data))
  } catch (err) {
    console.error(err)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, loading: true };
    case GET_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.payload.data };
    case GET_PROJECTS_FAIL:
      console.log(action.payload);
      return { ...state, loading: false, error: 'Error getting projects info' };
    case GET_PROJECT_INFO:
      return { ...state, loadingInfo: true };
    case GET_PROJECT_INFO_SUCCESS:
      return { ...state, loadingInfo: false, projectInfo: action.payload.data };
    case GET_PROJECT_INFO_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting project info'
      };
    default:
      return state;
  }
}
