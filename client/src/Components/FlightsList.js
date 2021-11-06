import { useEffect, useState, useRef } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import moment from "moment";
import FlightService from "../Services/FlightService";
import PopupView from "./PopupView.js";
import UpdateForm from "./UpdateForm";

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

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarExport />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const FlightsList = () => {
  const classes = useStyles();
  const [popupOpen, setPopupOpen] = useState(false); // the initial state of the dialog is set to false
  const [popupChild, setpopupChild] = useState(); // the initial state of the dialog is set to false

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [SOTrows, setSOTRows] = React.useState([]);

  const [isLoading, setisLoading] = useState(true);

  const deleteFlight = React.useCallback(
    (id) => () => {
      // setTimeout(() => {
      //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      // });
      const deletedRow = rows.filter((row) => row.id === id)[0];
      const resp = window.confirm("Are you sure you want to delete", "");
      if (resp) {
        FlightService.DeleteFlight(deletedRow)
          .then((res) => {
            console.log("OK ===> ", res);
            updateFlightList();
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

  const updateFlight = React.useCallback(
    (id) => () => {
      const successCB = () => {
        setPopupOpen(false);
        updateFlightList();
      };

      // setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      const updatedRow = rows.filter((row) => row.id === id)[0];
      console.log("updated row = ", updatedRow);
      setPopupOpen(true);
      setpopupChild(<UpdateForm data={updatedRow} successCB={successCB} />);
    },
    [rows]
  );

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
        headerAlign: "right",
        flex: 1,
      },
      {
        field: "departureTime",
        headerName: "Departure Time",
        flex: 1.35,
      },
      {
        field: "arrivalTime",
        headerName: "Arrival Time",
        flex: 1.35,
      },

      {
        field: "firstSeatsNum",
        headerName: "First Class Seats",
        flex: 1,
      },
      {
        field: "economySeatsNum",
        headerName: "Economy Class Seats",
        flex: 1,
      },
      {
        field: "businessSeatsNum",
        headerName: "Business Class Seats",
        flex: 1,
      },
      {
        field: "firstClassPrice",
        headerName: "First Class Price",
        flex: 1,
      },
      {
        field: "businessClassPrice",
        headerName: "Business Class Price",
        flex: 1,
      },
      {
        field: "economyClassPrice",
        headerName: "Economy Class Price",
        flex: 1,
      },
      {
        field: "arrivalTerminal",
        headerName: "Arrival Terminal",
        flex: 1,
      },
      {
        field: "departureTerminal",
        headerName: "Departure Terminal",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Update"
            onClick={updateFlight(params.id)}
            // showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteFlight(params.id)}
            // showInMenu
          />,
        ],
      },
    ],
    [deleteFlight, updateFlight]
  );

  // "_id": "617be2ec9fa58494388aca3c",
  // "__v": 0,
  // "flightNumber": "155646"
  // "arrivalAirport": "jedda",
  // "departureAirport": "cairo",
  // "arrivalTime": "2016-05-18T16:00:00.000Z",
  // "departureTime": "2016-05-18T16:00:00.000Z",
  // "businessSeatsNum": 5,
  // "economySeatsNum": 3,
  // "firstSeatsNum": 4,
  // "firstClassPrice": 3333,
  // "economyClassPrice": 2222,
  // "businessClassPrice": 2222,

  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = SOTrows.filter((row) => {
      return Object.keys(row).some((field) => {
        if (row[field] == null) return false;
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  const updateFlightList = () => {
    FlightService.GetAllFlights()
      .then(({ data }) => {
        console.log("recived ===> ", data);
        // Pre-Proccessing

        data.forEach((flight) => {
          flight["id"] = flight["_id"];
          const formatDateTime = (input) =>
            input ? moment(input).format("yyyy-MM-DD hh:mmA") : null;

          flight["arrivalTime"] = formatDateTime(flight["arrivalTime"]);
          flight["departureTime"] = formatDateTime(flight["departureTime"]);
        });

        console.log("data - => ", data);
        setisLoading(false);
        setSOTRows(data);
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
        alert(errorMessage);
      }, []);
  };

  useEffect(() => {
    // Initial load

    setisLoading(true);
    updateFlightList();
  }, []);

  useEffect(() => {
    setRows(SOTrows);
  }, [SOTrows]);

  return (
    <>
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
          components={{ Toolbar: QuickSearchToolbar }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
        />
      </div>
    </>
  );
};

export default FlightsList;
