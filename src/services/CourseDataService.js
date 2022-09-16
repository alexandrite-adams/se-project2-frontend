import http from "../http-common";
class CourseDataService {
  getAll() {
    return http.get("/course-t2");
  }
  get(id) {
    return http.get(`/course-t2/${id}`);
  }
  create(data) {
    return http.post("/course-t2", data);
  }
  update(id, data) {
    return http.put(`/course-t2/${id}`, data);
  }
  delete(id) {
    return http.delete(`/course-t2/${id}`);
  }
  deleteAll() {
    return http.delete(`/course-t2`);
  }
  findByName(name) {
    return http.get(`/course-t2?name=${name}`);
  }
}
export default new CourseDataService();