import axios from "axios";

const token = localStorage.getItem("token")
export async function getTasks() {
  return axios
    .get("http://localhost:3001/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data);
}
