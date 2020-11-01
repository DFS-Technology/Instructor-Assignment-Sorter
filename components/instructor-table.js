import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'id', hide: true },
  { field: 'name', headerName: 'Name', width: 70 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'schoolYear', headerName: 'School Year', width: 130 },
  { field: 'major', headerName: 'Major', width: 130 },
  { field: 'university', headerName: 'University', width: 130 },
  { field: 'region', headerName: 'Region', width: 130 },
  { field: 'startingLocation', headerName: 'Address', width: 130 },
  { field: 'car', headerName: 'Car🚗', width: 130},
  { field: 'returner', headerName: 'Returning', width: 130 },
  { field: 'shirtSize', headerName: 'Shirt Size', width: auto},
  { field: 'programs', headerName: 'Programs', width: 130 },
  { field: 'languages', headerName: 'Languages', width: 130},
];

const rows = [
  { id: 1, name: 'Snow', gender: 'Jon', schoolYear: "1st Year", major: "CS", university: "UCI" },
];

export default function InstructorTable() {
  return (
    <Container fixed>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div></Container>
  );
}