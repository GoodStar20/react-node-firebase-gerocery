import TYPES from '../types';

export const setLoading = (isLoading) => {
  return {
    type: TYPES.LOADING,
    payload: isLoading,
  };
};


// Products

export const setProductsLoading = (isLoading) => ({
  type: TYPES.SET_PRODUCTS_LOADING,
  payload: isLoading,
});

export const setProducts = (products) => ({
  type: TYPES.SET_PRODUCTS,
  payload: products,
});
