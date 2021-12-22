import http from "./http-common";

class ReservationService {
  reserveNew(data) {
    return http.post("/User/AddReservation", data);
  }
  reserveNewFlight(data) {
    return http.post("/User/AddEditReservation", data);
  }
  reservePayment(data) {
    return http.post("/User/CreateCheckoutSession", data);
  }
  reserveRefund(data) {
    return http.post("/User/RefundCheckoutSession", data);
  }
}

export default new ReservationService();
