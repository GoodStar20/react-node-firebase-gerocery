import TYPES from "../types";

const defaultState = {
  loading: false,
  user: null,
  loginData: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case TYPES.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
