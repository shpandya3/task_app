import axios from "axios";

export async function getTasks() {
  return axios
    .get("http://localhost:3001/tasks", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0MkBnbWFpbC5jb20iLCJpYXQiOjE3MTY4MDM1MTksImV4cCI6MTcxNzQwODMxOX0.AqWGBzF8_MX0H1Q5A_euz2JrWzrsQgRoLwfdu4CZVeQ`,
      },
    })
    .then((res) => res.data);
}

export async function editTaskById(taskData) {
  const { id, ...body } = taskData;
  return axios
    .put(
      `http://localhost:3001/tasks/${taskData.id}`,
      {dataToUpdate: body},
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0MkBnbWFpbC5jb20iLCJpYXQiOjE3MTY4MDM1MTksImV4cCI6MTcxNzQwODMxOX0.AqWGBzF8_MX0H1Q5A_euz2JrWzrsQgRoLwfdu4CZVeQ`,
        },
      },
    )
    .then((res) => res.data);
}
