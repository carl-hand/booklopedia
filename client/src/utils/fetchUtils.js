import axios from "axios";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

export const fetchWithRetry = async (url, numRetries, httpMethod, body) => {
  for (let i = 0; i < numRetries; i++) {
    try {
      if (httpMethod === HTTP_METHODS.GET) {
        return await axios.get(url);
      } else if (httpMethod === HTTP_METHODS.POST) {
        return await axios.post(url, body);
      }
    } catch (err) {
      if (i + 1 === numRetries) {
        throw err;
      }
    }
  }
};
