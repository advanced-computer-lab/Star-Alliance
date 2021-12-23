import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import FlightService from "../Services/FlightService";
import PopupView from "../Components/PopupView.js";
import UpdateForm from "../Components/UpdateForm";
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

const ViewChild = () => {
  let history = useHistory();
  const classes = useStyles();
  const [User, setUser] = useContext(UserCtx);

  const [popupOpen, setPopupOpen] = useState(false); // the initial state of the dialog is set to false
  const [popupChild, setpopupChild] = useState(); // the initial state of the dialog is set to false

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [SOTrows, setSOTRows] = React.useState([]);

  const [isLoading, setisLoading] = useState(true);
  let row2 = [];
  const CancelReservation = React.useCallback(
    (id) => () => {
      const deletedRow = rows.filter((row) => row.id === id)[0];
      console.log("deletedRow", deletedRow);
      const resp = window.confirm("Are you sure you want to delete", "");
      const data2 = {
        flightNumber: deletedRow.flightNumber,
        reservation: deletedRow.reservationID,
        id: User.id,
        seatNum:deletedRow.seatNum[0]
      };
      console.log("testing data2",data2)
       if (resp) {
         console.log("yes i did");
         FlightService.CancelChildReservation(data2)
           .then((res) => {
             console.log("OK ===> ", res);
             updateReservationList();

           })
           .catch((err) => {
            console.log("errr <===", err.response);
             const errorMessage = err.response.data;
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
    FlightService.GetAllChildReservedFlights(data)
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
          allfl[i] = data.data[j].flight1;
          allfl[i]._id = i;
          allfl[i].TicketName = data.data[j].TicketName;
          data.data[j].fligh1seats.shift();
          allfl[i].seatNum = data.data[j].fligh1seats;
          allfl[i].reservationID=reservId;

          allfl[i + 1] = data.data[j].flight2;
          allfl[i + 1]._id = i + 1;
          allfl[i + 1].TicketName = data.data[j].TicketName;
          data.data[j].fligh2seats.shift();
          allfl[i+1].seatNum = data.data[j].fligh2seats;
          allfl[i+1].reservationID=reservId;        
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
        field: "departureTerminal",
        headerName: "Departure Terminal",
        flex: 1,
      },
      {
        field: "arrivalTerminal",
        headerName: "Arrival Terminal",
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
            icon={<CancelIcon sx={{ color: red[500] }} />}
            label="Cancel"
            onClick={CancelReservation(params.id)}
            // showInMenu
          />,
        ],
      },
    ],
    [CancelReservation]
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
        <h6>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Home Page{" "}
          </Link>
          <FontAwesomeIcon icon={faArrowRight} /> <b>Child Reservations</b>
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

export default ViewChild;
