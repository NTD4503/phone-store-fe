import axios from "./axios";

const fetchAllProduct = () => {
  return axios.get("/products?limit=20");
};

const fetchDetailProduct = (id) => {
  return axios.get(`/products/${id}`);
};

export { fetchAllProduct, fetchDetailProduct };
