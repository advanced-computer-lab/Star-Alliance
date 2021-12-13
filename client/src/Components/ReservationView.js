import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

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
  const [popupOpen, setPopupOpen] = useState(false); // the initial state of the dialog is set to false
  const [popupChild, setpopupChild] = useState(); // the initial state of the dialog is set to false

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [SOTrows, setSOTRows] = React.useState([]);

  const [isLoading, setisLoading] = useState(true);

  const CancelReservation = React.useCallback(
    (id) => () => {
      const deletedRow = rows.filter((row) => row.id === id)[0];
      const resp = window.confirm("Are you sure you want to delete", "");
      if (resp) {
        FlightService.CancelReservation(deletedRow)
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

  const updateReservationList = () => {
    FlightService.GetAllReservedFlights()
      .then((data) => {
        console.log("recived ===> ", data);

        // Pre-Proccessing

        //   data.forEach((resv) => {
        // resv.flight["id"] = resv.flight["_id"];
        /* const formatDateTime = (input) =>
            input ? moment(input).format("yyyy-MM-DD hh:mmA") : null;

            resv.flight["arrivalTime"] = formatDateTime(resv.flight["arrivalTime"]);
            resv.flight["departureTime"] = formatDateTime(resv.flight["departureTime"]);*/
        // });
        const allfl = [];
        let j = 0;
        for (let i = 0; i < data.data.length * 2; i = i + 2) {
          const reservId = data.data[j]._id;
          const reservDet1 = {
            cabin:data.data[j].cabinClass,
            EditedFlight:data.data[j].flight1,
            EditedFlightNum:data.data[j].flight1.flightNumber,
            companions: data.data[j].companions,
            currentFlightSeats: data.data[j].fligh1seats,
            reservationID: reservId,
            which: "flight1",
            unEditedFlightID: data.data[j].flight2._id,
            flight2Seats: data.data[j].fligh2seats,
          };
          allfl[i] = data.data[j].flight1;
          allfl[i].id = i;
          allfl[i].reservDet = reservDet1;
          const reservDet2 = {
            EditedFlight:data.data[j].flight2,
            EditedFlightNum:data.data[j].flight2.flightNumber,
            cabin:data.data[j].cabinClass,
            companions: data.data[j].companions,
            currentFlightSeats: data.data[j].fligh2seats,
            reservationID: reservId,
            which: "flight2",
            unEditedFlightID: data.data[j].flight1._id,
            flight2Seats: data.data[j].fligh1seats,
          };
          allfl[i + 1] = data.data[j].flight2;
          allfl[i + 1].id = i + 1;
          allfl[i + 1].reservDet = reservDet2;
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
        });
        console.log("data - => ", data);
        setisLoading(false);

        setSOTRows(allfl);
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

  const columns = React.useMemo(
    () => [
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
            onClick={CancelReservation(params.id)}
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
    [CancelReservation, EditReservation, EditSeat]
  );

  useEffect(() => {
    // Initial load

    setisLoading(true);
    updateReservationList();
  }, []);

  useEffect(() => {
    setRows(SOTrows);
  }, [SOTrows]);

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
