import { get, post } from "./api.base";

// Products
export const getProducts = () => get("/products");
export const buyProduct = (params) =>
  post("/products", params);

// User
export const addUserInfo = (params) =>
  post("/users-info", params);
export const getUserInfo = (userId) =>
  get(`/users-info/${userId}`);

// Purchases
export const getPurchases = (userId) =>
  get(`/purchases/${userId}`);
