import http from "./http-common";

class ReservationService {
  reserveNew(data) {
    return http.post("/Admin/AddReservation", data);
  }
}

export default new ReservationService();
