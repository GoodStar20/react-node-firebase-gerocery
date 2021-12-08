import { toast } from 'react-toastify';

import { signup, login, auth } from '../../services/firebase';
import * as api from "../../services/api";
import history from '../history';
import { setLoading, setProducts, setProductsLoading } from './actionTypes';

export const userSignup = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await signup(email, password);
    await api.addUserInfo({
      userId: res?.user?.uid,
      email: res?.user?.email,
    });
    history.push("/products");
    toast.success("Successfully Signed Up");
  }
  catch (error) {
    toast.error(error.message);
  }
  dispatch(setLoading(false));
};

export const userLogin = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await login(email, password);
    history.push("/products");
    toast.success("Successfully Logged In");
  }
  catch (error) {
    toast.error(error.message);
  }
  dispatch(setLoading(false));
};

export const getProducts = () => async (dispatch) => {
  dispatch(setProductsLoading(true));
  try {
    const products = await api.getProducts();
    dispatch(setProducts(products));
  }
  catch (error) {
    toast.error(error.message);
  }
  dispatch(setProductsLoading(false));
};

export const buyProduct = (productId, productPrice, quantity) => async () => {
  try {
    const user = auth.currentUser;
    await api.buyProduct({
      userId: user.uid,
      productId,
      productPrice,
      quantity,
    });
    history.push("/products");
    toast.success("Purchase was successful");
  }
  catch (error) {
    toast.error(error.message);
  }
};
