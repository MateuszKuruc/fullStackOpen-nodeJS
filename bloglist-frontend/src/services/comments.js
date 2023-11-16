import axios from "axios";
// const baseUrl = "/api/blogs";

const baseUrl = "https://bloglist-backend-t9tb.onrender.com/api/blogs";

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`);
  return request.then((response) => response.data);
};

const create = async (newComment, blogId) => {
  const request = await axios.post(`${baseUrl}/${blogId}/comments`, newComment);
  return request.data;
};

export default { getAll, create };
