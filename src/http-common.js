import axios from "axios";
var baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8081/";
} else {
  baseURL = "http://project2.eaglesoftwareteam.com";
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