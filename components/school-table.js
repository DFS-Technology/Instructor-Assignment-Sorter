import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  DataTypeProvider,
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
        <SaveIcon />
        ):id === 'cancel' ? (
          <ClearIcon />
          ):null}
    {...restProps}
  >
    
  </TableEditColumn.Command>
);


export const TableEditCommand = withStyles(styles, { name: 'TableEditCommand' })(TableEditCommandBase);


const getRowId = row => row.id;

const ShirtFormatter = ({ value }) => <Chip label={value} />;

const ShirtEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value}
    onChange={event => onValueChange(event.target.value)}
    style={{ width: '100%' }}
  >
    <MenuItem value="S">
      S
    </MenuItem>
    <MenuItem value="M">
      M
    </MenuItem>
    <MenuItem value="L">
      L
    </MenuItem>
    <MenuItem value="XL">
      XL
    </MenuItem>
  </Select>
);

const ShirtTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ShirtFormatter}
    editorComponent={ShirtEditor}
    {...props}
  />
);

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? 'Yes' : 'No'}
    onChange={event => onValueChange(event.target.value === 'Yes')}
    style={{ width: '100%' }}
  >
    <MenuItem value="Yes">
      Yes
    </MenuItem>
    <MenuItem value="No">
      No
    </MenuItem>
  </Select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);
const Root = props => <Grid.Root {...props} style={{ height: '100%' , width: '100%'}} />;

export default () => {
  const [columns] = useState([
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
  ]);
  const [rows, setRows] = useState([]);
  const [booleanColumns] = useState(['car','returner']);
  const [shirtColumn] = useState(['shirtSize']);
  const [defaultHiddenColumnNames] = useState([]);
  const [defaultColumnWidths] = useState([
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
  ]);
  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);

  const ToolbarRoot = ({
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

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };


  
  return (
    <Paper>
      <Grid
        rows={rows}
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
        <BooleanTypeProvider
          for={booleanColumns}
        />
        <ShirtTypeProvider
          for={shirtColumn}
        />
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
        />
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
