export const GET_PROJECTS = 'user/projects/LOAD';
export const GET_PROJECTS_SUCCESS = 'user/projects/LOAD_SUCCESS';
export const GET_PROJECTS_FAIL = 'user/projects/LOAD_FAIL';

export const GET_PROJECT_INFO = 'user/projects/INFO';
export const GET_PROJECT_INFO_SUCCESS = 'user/projects/INFO_SUCCESS';
export const GET_PROJECT_INFO_FAIL = 'user/projects/INFO_FAIL';

export const GET_USER = 'user/projects/USER';
export const GET_USER_SUCCESS = 'user/projects/USER_SUCCESS';
export const GET_USER_FAIL = 'user/projects/USER_FAIL';

const initialState = {
  projects: [],
  projectInfo: {},
  user: {}
};


export function listProjects(user) {
  return {
    type: GET_PROJECTS,
    payload: {
      request: {
        url: `/users/${user}/projects`
      }
    }
  };
}

export function getProjectDetail(user, project) {
  return {
    type: GET_PROJECT_INFO,
    payload: {
      request: {
        url: `/projects/${user}/${project}`
      }
    }
  };
}

export function getUser(user) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/users/${user}`
      }
    }
  };
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
