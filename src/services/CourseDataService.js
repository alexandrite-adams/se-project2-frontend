import http from "../http-common";
class CourseDataService {
  getAll() {
    return http.get("/course-t2");
  }
  get(id) {
    return http.get(`/course-t2/id/${id}`);
  }
  getName(name) {
    return http.get(`/course-t2/name/name=${name}`);
  }
  findByDept(dept) {
    return http.get(`/course-t2/?dept=${dept}`);
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
}
export default new CourseDataService();