import TYPES from "../types";

const defaultState = {
  productsLoading: false,
  products: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.SET_PRODUCTS: {
      return {
        ...state,
        products: [...action.payload],
      };
    }
    case TYPES.SET_PRODUCTS_LOADING: {
      return {
        ...state,
        productsLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
