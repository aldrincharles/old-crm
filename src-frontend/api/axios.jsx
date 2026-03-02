import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const publicAxios = axios.create({
  baseURL: `/api`,
  // baseURL: `${BASE_URL}/api`,
});

export const authAxios = axios.create({
  baseURL: `/api`,
  // baseURL: `${BASE_URL}/api`,
});
