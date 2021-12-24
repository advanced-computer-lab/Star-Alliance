import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStickyNote } from "@fortawesome/free-solid-svg-icons";

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import Alert from "../Components/Alert";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import FlightService from "../Services/FlightService";
import PopupView from "./PopupView.js";
import UpdateForm from "./UpdateForm";
import { pink, red, blue, black } from "@mui/material/colors";
import { ReservationCtx } from "../Context/ReservationContext";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { EditReservationCtx } from "../Context/EditReservationContext";
import { useHistory } from "react-router-dom";
import { UserCtx } from "../Context/GlobalContext";
import { all } from "express/lib/application";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      columns: {
        "& .MuiDataGrid-columnHeaderTitle": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
        },
      },
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme }
);

const ReservationView = () => {
  //const [Editreservation, setEditReservation] = useContext(EditReservationCtx);
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  let history = useHistory();

  const classes = useStyles();
  const [User, setUser] = useContext(UserCtx);

  const [popupOpen, setPopupOpen] = useState(false); // the initial state of the dialog is set to false
  const [popupChild, setpopupChild] = useState(); // the initial state of the dialog is set to false

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [SOTrows, setSOTRows] = React.useState([]);

  const [isLoading, setisLoading] = useState(true);
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };

  function getTime(date1, date2) {
    var hours2 = new Date(date2).getHours();
    // console.log("hours2", hours2);
    var hours1 = new Date(date1).getHours();
    // console.log("hours", hours1);
    var minutes2 = new Date(date2).getMinutes();
    // console.log("minutes2", minutes2);

    var minutes1 = new Date(date1).getMinutes();
    // console.log("minutes1", minutes1);

    // console.log("Day:", new Date(date1).getDate());
    var hours = 0;
    var minutes = 0;
    if (minutes2 != minutes1) {
      if (minutes2 > minutes1) {
        minutes = minutes2 - minutes1;
      } else if (minutes2 < minutes1) {
        minutes = minutes2 + (60 - minutes1);
        hours1 = hours1 + 1;
      } else {
        if (minutes2 == 0) {
          minutes = minutes1;
        } else {
          minutes = minutes2;
        }
      }
    }
    if (hours2 > hours1) {
      hours = hours2 - hours1;
    } else if (hours2 == hours1) {
      hours = 0;
    } else {
      hours = 24 - hours1 + hours2;
    }
    while (minutes > 60) {
      hours = hours + 1;
      minutes = minutes - 60;
    }
    if (minutes == 60) {
      hours = hours + 1;
      minutes = minutes - 60;
    }
    var duration = hours + " hours " + minutes + " minutes";
    return duration;
  }

  let row2 = [];
  const CancelReservation = React.useCallback(
    (id) => () => {
      const deletedRow = rows.filter((row) => row.id === id)[0];
      console.log("deletedRow", deletedRow);
      const resp = window.confirm("Are you sure you want to delete", "");
      const data2 = {
        flightNumber: deletedRow.flightNumber,
        reservation: deletedRow.reservDet.reservationID,
        id: User.id,
      };
      if (resp) {
        console.log("yes i did");
        FlightService.CancelReservation(data2)
          .then((res) => {
            console.log("OK ===> ", res);
            updateReservationList();
          })
          .catch((err) => {
            console.log("errr <===", err.response);
            const errorMessage = err.response.data;
            // alert(errorMessage);
            setPopupOpen(true);
            setpopupChild(<h3>{errorMessage}</h3>);
          });
      }
    },
    [rows]
  );
  console.log("rows", rows);
  const updateReservationList = () => {
    const data = { id: User.id };
    console.log("sddfwf", data);
    FlightService.GetAllReservedFlights(data)
      .then((data) => {
        console.log("recived ===> ", data);

        const allfl = [];
        let j = 0;
        const allflid1 = [];
        const allflid2 = [];
        for (let i = 0; i < (data.data.length ); i ++) {
          allflid1.push(data.data[i].flight2._id)
          allflid2.push(data.data[i].flight1._id)
        }
        for (let i = 0; i < (data.data.length * 2); i = i + 2) {
          console.log("j", j);
          const reservId = data.data[j]._id;
          const reservDet1 = {
            cabin: data.data[j].cabinClass,
            EditedFlight: data.data[j].flight1,
            EditedFlightNum: data.data[j].flight1.flightNumber,
            companions: data.data[j].companions,
            currentFlightSeats: data.data[j].fligh1seats,
            reservationID: reservId,
            which: "flight1",
            unEditedFlightID:allflid1[j],
            flight2Seats: data.data[j].fligh2seats,
            remianFlightDate: data.data[j].flight2.departureTime,
            flighttotalPrice: data.data[j].flight1totalPrice
          };
          allfl[i] = data.data[j].flight1;
          allfl[i]._id = i;
          allfl[i].reservDet = reservDet1;
          allfl[i].TicketName = data.data[j].TicketName;
          allfl[i].seatNum = data.data[j].fligh1seats;
          allfl[i].cabin = data.data[j].cabinClass;
          allfl[i].baggage = data.data[j].baggageAllowance.number;
          allfl[i].duration=getTime(data.data[j].flight1.departureTime,data.data[j].flight1.arrivalTime)


          const reservDet2 = {
            EditedFlight: data.data[j].flight2,
            EditedFlightNum: data.data[j].flight2.flightNumber,
            cabin: data.data[j].cabinClass,
            companions: data.data[j].companions,
            currentFlightSeats: data.data[j].fligh2seats,
            reservationID: reservId,
            which: "flight2",
            unEditedFlightID: allflid2[j],
            flight2Seats: data.data[j].fligh1seats,
            remianFlightDate: data.data[j].flight1.departureTime,
            flighttotalPrice: data.data[j].flight2totalPrice
          };
          allfl[i + 1] = data.data[j].flight2;
          allfl[i + 1]._id = i + 1;
          allfl[i + 1].reservDet = reservDet2;
          allfl[i + 1].TicketName = data.data[j].TicketName;
          allfl[i+1].seatNum = data.data[j].fligh2seats;
          allfl[i+1].cabin = data.data[j].cabinClass;
          allfl[i+1].baggage = data.data[j].baggageAllowance.number;
          allfl[i+1].duration=getTime(data.data[j].flight2.departureTime,data.data[j].flight2.arrivalTime)

          
          j++;
 
        
      }
     
        console.log("hena1", data.data);
        console.log("hena", allfl);
        allfl.forEach((resv) => {
          resv["id"] = resv["_id"];
          const formatDateTime = (input) =>
            input ? moment(input).format("yyyy-MM-DD hh:mmA") : null;

          resv["arrivalTime"] = formatDateTime(resv["arrivalTime"]);
          resv["departureTime"] = formatDateTime(resv["departureTime"]);
          // resv["companionName"] = (resv["companionName"]);
        });
        console.log("data - => ", data);
        setisLoading(false);

        setSOTRows(allfl);

        console.log("rows", rows);

        console.log("datsssda - => ", allfl);
      })
      .catch((err) => {
        console.log(err);
        console.log("errr <===", err.response);
        // const errorMessage = err.response.data;
        //alert(errorMessage);
      }, []);
  };

  const EditReservation = React.useCallback((id) => () => {
    console.log(id);
    const EditedRow = rows.filter((row) => row.id === id)[0];
    console.log("Edittttttt", EditedRow);
    // contains the details of the edited flight
    const oldReservation = EditedRow;
    setSearchFlights({
      ...searchFlights,
      oldReservation,
    });
    history.push("/EditFlight");
  });

  const EditSeat = React.useCallback((id) => () => {
    const EditedSeat = rows.filter((row) => row.id === id)[0];
    console.log("Edittttttt", EditedSeat);
    // contains the details of the edited flight
    const oldReservation = EditedSeat;
    setSearchFlights({
      ...searchFlights,
      oldReservation,
    });
    history.push("/SelectNewSeat");
  });
  const Mail = React.useCallback((id) => () => {
    const mail1 = rows.filter((row) => row.id === id)[0];
    //const resp = window.confirm("Do you want a Email with all details", "");
    console.log("mail", mail1);
    const data= { arrivalTime:mail1.arrivalTime,arrivalAirport:mail1.arrivalAirport,departureAirport:mail1.departureAirport,departureTime:mail1.departureTime,seatNum:mail1.seatNum,cabin:mail1.reservDet.cabin,reservationID:mail1.reservDet.reservationID,flightNumber:mail1.flightNumber,id: User.id};
    console.log("momo",data);
    //if (resp) {
      console.log("momo111",data);
    FlightService.email(data).then(({ data }) => {
      showAlert("Mail was sent Successfully");


    })

  },[rows]); 
  const columns = React.useMemo(
    () => [
      {
        field: "TicketName",
        headerName: "Name",

        flex: 1,
      },
      {
        field: "flightNumber",
        headerName: "Flight Number",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        flex: 1,
      },
      {
        field: "departureAirport",
        headerName: "Departure Airport",
        flex: 1,
      },
      {
        field: "arrivalAirport",
        headerName: "Arrival Airport",
        flex: 1,
      },
      {
        field: "departureTime",
        headerName: "Departure Time",
        flex: 1,
      },
      {
        field: "arrivalTime",
        headerName: "Arrival Time",
        flex: 1,
      },
      {
        field: "duration",
        headerName: "Trip Duration",
        flex: 1,
      },
      {
        field: "cabin",
        headerName: "Cabin Class",
        flex: 1,
      },
      {
        field: "baggage",
        headerName: "Baggage Allowance",
        flex: 1,
      },
      {
        field: "seatNum",
        headerName: "Seat",

        flex: 1,
      },

      {
        field: "actions",
        type: "actions",
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={EditReservation(params.id)}
            // showInMenu
          />,
          <GridActionsCellItem
          icon={<EmailIcon sx={{ color: blue[600] }} />}
          label="Email"
          onClick={Mail(params.id)}
          // showInMenu
        />,
          <GridActionsCellItem
            icon={<EventSeatIcon />}
            label="Seats"
            onClick={EditSeat(params.id)}
            // showInMenu
          />,
          <GridActionsCellItem
            icon={<CancelIcon sx={{ color: red[500] }} />}
            label="Cancel"
            onClick={CancelReservation(params.id)}
            // showInMenu
          />,
        ],
      },
    ],
    [CancelReservation, EditReservation, EditSeat, Mail]
  );

  useEffect(() => {
    // Initial load

    setisLoading(true);
    updateReservationList();
  }, []);

  useEffect(() => {
    console.log("rowsssssssssssssss",SOTrows);
    setRows(SOTrows);
  }, [SOTrows]);

  console.log("rows3", rows);
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />

        <h6>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Home Page{" "}
          </Link>
          <FontAwesomeIcon icon={faArrowRight} /> <b>My Reservations</b>
        </h6>
      </div>
      <PopupView
        showDialog={popupOpen}
        setshowDialog={setPopupOpen}
        title="updateForm"
      >
        {popupChild}
      </PopupView>
      <div className="mt-5 w-100">
        <DataGrid
          className={classes.columns}
          rows={rows}
          columns={columns}
          autoHeight={true}
          autoWidth={true}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default ReservationView;
