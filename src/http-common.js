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
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With":"XMLHttpRequest",
    "Access-Control-Allow-Origin":"*",
    crossDomain: true
  }
});