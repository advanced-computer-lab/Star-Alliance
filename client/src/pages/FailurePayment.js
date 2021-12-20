import {useContext, useEffect} from "react";
import { UserHomeCtx } from "../Context/UserHomeContext";
import UserService, { UserCtx } from "../Services/UserService.js";

import ReservationService from "../Services/ReservationService.js";
const FailurePayment = () => {

    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="col-8 offset-2">Payment Failed</h1>
           
        </div>
    );

}
export default FailurePayment;