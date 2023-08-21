import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`);
  return request.then((response) => response.data);
};

const create = async (newComment, blogId) => {
  console.log("newcomment request", newComment, "blogid:", blogId);
  const request = await axios.post(`${baseUrl}/${blogId}/comments`, newComment);
  console.log("create request", request.data);
  return request.data;
};

export default { getAll, create };
