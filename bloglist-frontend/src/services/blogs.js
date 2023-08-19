import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log("create response", response.data);
  return response.data;
};

const update = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject
  );
  return response.data;
};

const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config);
  return response.data;
};

// const addComment = async (newObject) => {
//   const response = await axios.post(`${baseUrl}/${newObject.id}/comments`);
//   console.log("add comment response", response.data);
// };

export default { getAll, create, setToken, update, remove };
