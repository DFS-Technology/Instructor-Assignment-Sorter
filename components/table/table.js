import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import DataTypeProviders from './datatype-providers';
import {getDocuments, addDocuments, editDocuments} from '../../lib/firestore-api';


import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';

import { useAuth } from "../../lib/use-auth.js";

import {
  EditingState,

  SortingState,
  IntegratedSorting,

  PagingState,
  IntegratedPaging,

  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,

  ColumnChooser,
  TableColumnVisibility,
  Toolbar,

  VirtualTable,

  TableColumnResizing,

  DragDropProvider,
  TableColumnReordering,

  PagingPanel,

  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';

const styles = theme =>({
  button:{
    margin: theme.spacing(0, 1),
  },
});

const TableEditCommandBase = ({
  id, text, ...restProps
}) => (
    
  <TableEditColumn.Command
    id={id}
    text={id === 'add' ? (
      <AddIcon />
   ): id === 'edit' ? (
    <EditIcon />
    ):id === 'delete' ? (
      <DeleteIcon />
      ):id === 'commit' ? (
        <CheckIcon />
        ):id === 'cancel' ? (
          <ClearIcon />
          ):null}
    {...restProps}
  >
    
  </TableEditColumn.Command>
);
const instructorDefaultColumnWidths = [
  { columnName: 'name', width: 80 },
  { columnName: 'gender', width: 90 },
  { columnName: 'schoolYear', width: 130 },
  { columnName: 'major', width: 80 },
  { columnName: 'university', width: 110 },
  { columnName: 'region', width: 90 },
  { columnName: 'startingLocation', width: 100 },
  { columnName: 'car', width: 100 },
  { columnName: 'returner', width: 110 },
  { columnName: 'shirtSize', width: 130 },
  { columnName: 'programs', width: 110 },
  { columnName: 'languages', width: 120 },
];
const schoolDefaultColumnWidths = [
  { columnName: 'name', width: 100 },
  { columnName: 'address', width: 100 },
  { columnName: 'schoolYear', width: 100 },
  { columnName: 'programs', width: 100 },
  { columnName: 'numInstructors', width: 100 },
  { columnName: 'schedule', width: 100 },
  { columnName: 'languageRequests', width: 100 },
  { columnName: 'vtrOrinPerson', width: 100 },
  { columnName: 'locationPref', width: 100 },
];
const instructorColumns = [
  { name: 'name', title: 'Name'},
  { name: 'gender', title: 'Gender'},
  { name: 'schoolYear', title: 'School Year'},
  { name: 'major', title: 'Major'},
  { name: 'university', title: 'University'},
  { name: 'region', title: 'Region'},
  { name: 'startingLocation', title: 'Address'},
  { name: 'car', title: 'Car 🚗', description:'Weather they have a car or not'},
  { name: 'returner', title: 'Returning'},
  { name: 'shirtSize', title: 'Shirt Size 👕'},
  { name: 'programs', title: 'Programs'},
  { name: 'languages', title: 'Languages'},
];
const schoolColumns = [
  { name: 'name', title: 'Name'},
  { name: 'address', title: 'Address'},
  { name: 'schoolYear', title: 'School Year'},
  { name: 'programs', title: 'Programs'},
  { name: 'numInstructors', title: 'No. of Instructors'},
  { name: 'schedule', title: 'Schedule'},
  { name: 'languageRequests', title: 'Language Requests'},
  { name: 'vtrOrinPerson', title: 'Virtual or In-Person'},
  { name: 'locationPref', title: 'Location Prefrence'},
];

export const TableEditCommand = withStyles(styles, { name: 'TableEditCommand' })(TableEditCommandBase);


const getRowId = row => row.id;


const Root = props => <Grid.Root {...props} style={{ height: '100%' , width: '100%'}} />;

export default function Table({table_type}) {
  const auth = useAuth();

  const [columns] = useState((table_type === 'Instructors' )? instructorColumns : schoolColumns);
  // const [rows, setRows] = useState(getDocuments(userPackage, table_type));
  // const [rows, setRows] = useState([]);
  const [BooleanColumns] = useState((table_type === 'Instructors' )? ['car','returner'] : []);
  const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirtSize'] : []);
  const [defaultHiddenColumnNames] = useState([]);
  const [defaultColumnWidths] = useState((table_type === 'Instructors' )? instructorDefaultColumnWidths : schoolDefaultColumnWidths);

  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);

  const ToolbarRootBase = ({
    children
  }) => (
      
    <Toolbar.Root>
      <div style={{display: 'flex', margin: '0px 0px 0px auto'}}>
      {children}
      <IconButton onClick={() => setFilterToggle((filterToggle+1)%3)}>
        <FilterListIcon />
      </IconButton>
      </div>
      
    </Toolbar.Root>
  );
  const ToolbarRoot = withStyles(styles, { name: 'ToolbarRoot' })(ToolbarRootBase);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    let rows = (table_type === 'Instructors' )? auth.instructorRows : auth.schoolRows;
    if (added) {
      const newIds = addDocuments(auth.currentSeason, table_type, added);
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          // id: newIds[index],
          id: added.length + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      editDocuments(auth.currentSeason, table_type, changed, changedRows);
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    console.log('+++++++++++++ Commited Changes ++++++++++++++');
    (table_type === 'Instructors' )? auth.changeInsturctorRow(changedRows) : auth.changeSchoolRows(changedRows);
    // setRows(changedRows);
  };
  
  return (
    <Paper>
      <Grid
        rows={(table_type === 'Instructors' )? auth.instructorRows : auth.schoolRows}
        columns={columns}
        getRowId={getRowId}
        rootComponent={Root}
      >
        
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={25}
        />
        <IntegratedPaging />
        <SortingState
          defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
        />
        <IntegratedSorting />
        
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
        />
        <DataTypeProviders BooleanColumns={BooleanColumns} ShirtColumns={ShirtColumns}/>
        <DragDropProvider />
        <VirtualTable 
          height='auto'
          width='auto'
        />
        
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnReordering
          defaultOrder={['name','gender','schoolYear','major','university','region','startingLocation','car','returner','shirtSize','programs','languages']}
        />
        <TableHeaderRow 
          showSortingControls 
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <PagingPanel
          pageSizes={pageSizes}
        />
        <Toolbar rootComponent={ToolbarRoot}/>
        <ColumnChooser/>
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          commandComponent = {TableEditCommand}
        />
        {filterToggle == 1 ? <TableFilterRow/> :
         filterToggle == 2 ? <TableFilterRow showFilterSelector/> : 
         null}
      </Grid>
    </Paper>
  );
};
