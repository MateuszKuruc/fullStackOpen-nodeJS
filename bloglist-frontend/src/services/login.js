import axios from "axios";
// const baseUrl = "/api/login";

const baseUrl = "https://bloglist-backend-t9tb.onrender.com/api/login";

const login = async (credentials) => {
  console.log("credentials", credentials);
  const response = await axios.post(baseUrl, credentials);
  console.log("login response data", response.data);
  return response.data;
};

export default { login };
