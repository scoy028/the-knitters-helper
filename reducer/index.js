export const GET_PROJECTS = 'user/projects/LOAD';
export const GET_PROJECTS_SUCCESS = 'user/projects/LOAD_SUCCESS';
export const GET_PROJECTS_FAIL = 'user/projects/LOAD_FAIL';

export default function reducer(state = { projects: [] }, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, loading: true };
    case GET_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.payload.data };
    case GET_PROJECTS_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

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
