import axios from "axios";

export async function getUserUpdates() {
  return axios
    .get("http://localhost:3001/users/updates", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0MkBnbWFpbC5jb20iLCJpYXQiOjE3MTY4MDM1MTksImV4cCI6MTcxNzQwODMxOX0.AqWGBzF8_MX0H1Q5A_euz2JrWzrsQgRoLwfdu4CZVeQ`,
      },
    })
    .then((res) => res.data);
}

export async function getUserChartData() {
  return axios
    .get("http://localhost:3001/users/chart-for-user", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0MkBnbWFpbC5jb20iLCJpYXQiOjE3MTY4MDM1MTksImV4cCI6MTcxNzQwODMxOX0.AqWGBzF8_MX0H1Q5A_euz2JrWzrsQgRoLwfdu4CZVeQ`,
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

export async function getUsers() {
  return axios
    .get("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0MkBnbWFpbC5jb20iLCJpYXQiOjE3MTY4MDM1MTksImV4cCI6MTcxNzQwODMxOX0.AqWGBzF8_MX0H1Q5A_euz2JrWzrsQgRoLwfdu4CZVeQ`,
      },
    })
    .then((res) => res.data);
}