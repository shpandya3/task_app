import axios from "axios";

export async function getTasks() {
  return axios
    .get("http://localhost:3001/tasks", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJnaGlAZ21haWwuY29tIiwiaWF0IjoxNzE2MTk3MzY0LCJleHAiOjE3MTY4MDIxNjR9.WXbKM9_mi69J0Wy7YL0rbqJQx4HxZ-D1z2WZGqgAFGk`,
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJnaGlAZ21haWwuY29tIiwiaWF0IjoxNzE2MTk3MzY0LCJleHAiOjE3MTY4MDIxNjR9.WXbKM9_mi69J0Wy7YL0rbqJQx4HxZ-D1z2WZGqgAFGk`,
        },
      },
    )
    .then((res) => res.data);
}
