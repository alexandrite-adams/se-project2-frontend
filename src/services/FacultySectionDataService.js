import http from "../http-common";
class FacultySectionDataService {
  getAll() {
    return http.get("/schedule-t2/facultySection");
  }
  // get(id) {
  //   return http.get(`/schedule-t2/id/${id}`);
  // }
  // create(data) {
  //   return http.post("/schedule-t2", data);
  // }
  // update(id, data) {
  //   return http.put(`/schedule-t2/${id}`, data);
  // }
  // delete(id) {
  //   return http.delete(`/schedule-t2/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/schedule-t2`);
  // }
}
export default new FacultySectionDataService();
