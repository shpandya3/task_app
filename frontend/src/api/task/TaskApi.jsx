import axios from "axios";
import { API_URL } from "../../config";

export async function getTasks() {
  return axios
    .get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
}

export async function editTaskById(taskData) {
  const { id, ...body } = taskData;
  return axios
    .put(
      `${API_URL}/tasks/${taskData.id}`,
      {dataToUpdate: body},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .then((res) => res.data);
}
