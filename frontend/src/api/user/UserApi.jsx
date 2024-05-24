import axios from "axios";

export async function getUserUpdates() {
  return axios
    .get("http://localhost:3001/users/updates", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJnaGlAZ21haWwuY29tIiwiaWF0IjoxNzE2MTk3MzY0LCJleHAiOjE3MTY4MDIxNjR9.WXbKM9_mi69J0Wy7YL0rbqJQx4HxZ-D1z2WZGqgAFGk`,
      },
    })
    .then((res) => res.data);
}

export async function getUserChartData() {
  return axios
    .get("http://localhost:3001/users/chart-for-user", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJnaGlAZ21haWwuY29tIiwiaWF0IjoxNzE2MTk3MzY0LCJleHAiOjE3MTY4MDIxNjR9.WXbKM9_mi69J0Wy7YL0rbqJQx4HxZ-D1z2WZGqgAFGk`,
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