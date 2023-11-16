import axios from "axios";
// const baseUrl = "/api/users";

const baseUrl = "https://bloglist-backend-t9tb.onrender.com/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
