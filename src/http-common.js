import axios from "axios";
var baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost/";
} else {
  baseURL = "/course-t2/";
}

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
});