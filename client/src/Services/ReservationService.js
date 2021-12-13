import http from "./http-common";

class ReservationService {
  reserveNew(data) {
    return http.post("/User/AddReservation", data);
  }
  reserveNewFlight(data) {
    return http.post("/User/AddEditReservation", data);
  }
}

export default new ReservationService();
