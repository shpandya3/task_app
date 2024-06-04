import axios from "axios";
import { API_URL } from "../../config";
export async function getUserUpdates() {
  return axios
    .get("http://localhost:3001/users/updates", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}

export async function getUserChartData() {
  return axios
    .get(`${API_URL}/users/chart-for-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}

export async function signUpUser(userData) {
  return axios
    .post(
      `${API_URL}/users/sign-up`,
      userData,
    )
    .then((res) => res.data);
}

console.log("🚀 ~ loginUser ~ API_URL:", API_URL)
export async function loginUser(userData) {
  return axios
    .post(
      `${API_URL}/users/login`,
      userData,
    )
    .then((res) => res.data);
}

export async function updateUser(userData) {
  return axios
    .put(
      `${API_URL}/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add Authorization header with bearer token
        },
      }
    )
    .then((res) => res.data);
}

export async function getUsers() {
  return axios
    .get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}