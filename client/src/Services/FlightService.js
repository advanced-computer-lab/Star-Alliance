import http from "./http-common";

class FlightService {
  updateFlight(data) {
    return http.post("/Admin/UpdateFlight", data);
  }
  GetFlightInfo(data) {
    return http.post("/Admin/GetFlightInfo", data);
  }
  GetAllFlights(data) {
    return http.get("/Admin/GetAllFlights");
  }
  //   empGetAll() {
  //     return http.get("/badge/EmployeeGainedBadges");
  //   }

  //   adminGetBadges() {
  //     return http.get("/badge/adminGetBadges");
  //   }

  //   Create(data) {
  //     return http.post("/badge/CreateBadge", data);
  //   }

  //   editBadge(data) {
  //     return http.post("/badge/editBadge", data);
  //   }
}

export default new FlightService();
