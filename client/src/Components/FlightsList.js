import { useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

import moment from "moment";
import FlightService from "../Services/FlightService";

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

  const columns = [
    {
      field: "flightNumber",
      headerName: "Flight Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "arrivalAirport",
      headerName: "Arrival Airport",
      headerAlign: "right",
      flex: 1,
    },
    {
      field: "departureAirport",
      headerName: "Departure Airport",
      flex: 1,
    },
    {
      field: "arrivalTime",
      headerName: "Arrival Time",
      flex: 1.25,
    },
    {
      field: "departureTime",
      headerName: "Departure Time",
      flex: 1.25,
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
  ];
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

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [SOTrows, setSOTRows] = React.useState([]);

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

  useEffect(() => {
    FlightService.GetAllFlights()
      .then(({ data }) => {
        console.log("recived ===> ", data);
        // Pre-Proccessing

        data.forEach((flight) => {
          flight["id"] = flight["_id"];
          const formatDateTime = (input) =>
            moment(input).format("yyyy-MM-DD hh:mmA");
          flight["arrivalTime"] = formatDateTime(flight["arrivalTime"]);
          flight["departureTime"] = formatDateTime(flight["departureTime"]);
        });

        console.log("data - => ", data);
        setSOTRows(data);
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
        alert(errorMessage);
      }, []);
  }, []);
  useEffect(() => {
    setRows(SOTrows);
  }, [SOTrows]);

  return (
    <>
      <div className="mt-5 w-100">
        <DataGrid
          className={classes.columns}
          rows={rows}
          columns={columns}
          autoHeight={true}
          autoWidth={true}
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
