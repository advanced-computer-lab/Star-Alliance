import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';




const columns = [
  { field: 'flightNumber', headerName: 'Flight Number', width: 130 },
  { field: 'departureTime', headerName: 'Departure Time', width: 200 },
  {
    field: 'departureAirport',
    headerName: 'Departure Airport',
    type: 'number',
    width: 180,
  },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'arrivalAirport', headerName: 'Arrival Airport', width: 130 },

//   {
//     field: 'arrivalAirport',
//     headerName: 'Arrival Airport',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];


const rows = [{id:"1",arrivalAirport:"FEJ",flightNumber: '222',departureAirport: 'LAX',departureTime: "2022-01-11T22:00:00.000Z",type:"economy"}];
const ChooseFlight = ()=> {
  return (
      
    <div style={{ height: 400, width: '100%' }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
export default  ChooseFlight;