import axios from "axios";
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
    .get("http://localhost:3001/users/chart-for-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}

export async function signUpUser(userData) {
  return axios
    .post(
      `http://localhost:3001/users/sign-up`,
      userData,
    )
    .then((res) => res.data);
}

export async function loginUser(userData) {
  return axios
    .post(
      `http://localhost:3001/users/login`,
      userData,
    )
    .then((res) => res.data);
}

export async function updateUser(userData) {
  return axios
    .put(
      `http://localhost:3001/users`,
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
    .get("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}