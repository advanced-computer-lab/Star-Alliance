import http from "./http-common";

class FlightService {
  updateFlight(data) {
    return http.post("/Admin/UpdateFlight", data);
  }
  createFlight(data) {
    return http.post("/Admin/createFlight", data);
  }
  updateUser(data) {
    return http.post("/User/UpdateUser", data);
  }
  // TODO: Remove
  passcheck(data, resp) {
    return http.post("/User/changePassword", data, resp);
  }
  updatepass(data) {
    return http.post("/Admin/updatepass", data);
  }
  GetFlightInfo(data) {
    return http.post("/Admin/GetFlightInfo", data);
  }
  GetInfo(data) {
    return http.post("/Admin/GetInfo", data);
  }
  GetUserInfo(data) {
    return http.post("/User/GetUserInfo", data);
  }
  GetAllFlights(data) {
    return http.get("/Admin/GetAllFlights");
  }
  GetAllReservedFlights(data) {
    return http.get("/User/GetAllReservedFlights");
  }
  DeleteFlight(data, resp) {
    return http.post("/Admin/DeleteFlight", data, resp);
  }
  CancelReservation(data, resp) {
    return http.post("/User/CancelReservation", data, resp);
  }
  GetRequestedFlights(data) {
    return http.post("/GetRequestedFlights", data);
  }
}

export default new FlightService();
