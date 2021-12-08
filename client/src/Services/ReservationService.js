import http from "./http-common";

class ReservationService {
  reserveNew(data) {
    return http.post("/Admin/AddReservation", data);
  }
  reserveNewFlight(data) {
    return http.post("/Admin/AddEditReservation", data);
  }
}

export default new ReservationService();
