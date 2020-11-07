import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import DataTypeProviders from './datatypeProviders';
import {deleteDocuments, addDocuments, editDocuments} from '../../lib/firestoreApi';

import {instructorColumns, instructorDefaultColumnWidths} from './instructorColumns';
import {schoolColumns, schoolDefaultColumnWidths} from './schoolColumns';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';

import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';

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

const TableEditCommandBase = ({id, text, ...restProps}) => (
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
     {/*TODO: Try putting icons here +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
  </TableEditColumn.Command>
);

export const TableEditCommand = withStyles(styles, { name: 'TableEditCommand' })(TableEditCommandBase);


const getRowId = row => row.id;


const Root = props => <Grid.Root {...props} style={{ display: 'flex', height: '100%' , width: '100%'}} />;

export default function Table({table_type, data}) {
  const auth = useAuth();

  const [columns] = useState((table_type === 'Instructors' )? instructorColumns : schoolColumns);
  console.log('rowData Reset: ')
  const [rows, setRows] = useState(data);
  const [BooleanColumns] = useState((table_type === 'Instructors' )? ['car','returner'] : []);
  const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirtSize'] : []);
  const [defaultHiddenColumnNames] = useState([]);
  const [defaultColumnWidths] = useState((table_type === 'Instructors' )? instructorDefaultColumnWidths : schoolDefaultColumnWidths);

  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);

  const ToolbarRootBase = ({children}) => (
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
    if (added) {
      const newIds = addDocuments(auth.currentSeason, table_type, added);
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: newIds[index],
          // id: added.length + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      editDocuments(auth.currentSeason, table_type, changed, changedRows);
    }
    if (deleted) {
      deleteDocuments(auth.currentSeason, table_type, deleted);
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
      
    }
    mutate([table_type,auth.currentSeason],changedRows,false);
    // mutate([table_type,auth.currentSeason],changedRows,true);
    setRows(changedRows);
  };
  if(auth.currentSeason === ''){
    return(<div>Season not selected.</div>);
  }
  return (
    <Paper elevation = {3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '96%', height: '-webkit-calc(96% - 64px)', height: '-moz-calc(96% - 64px)',height: 'calc(96% - 64px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        rootComponent={Root}
      >
        
        <SortingState defaultSorting={[]}/>
        <IntegratedSorting />
        
        <DataTypeProviders BooleanColumns={BooleanColumns} ShirtColumns={ShirtColumns}/>
        
        {filterToggle == 1 ? <FilteringState defaultFilters={[]} /> :
         filterToggle == 2 ? <FilteringState defaultFilters={[]} />: 
         null}
        <IntegratedFiltering />
        
        <PagingState defaultCurrentPage={0} defaultPageSize={25}/>
        <IntegratedPaging />
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[]}
        />
        
        <DragDropProvider />
        <VirtualTable 
          height='100%'
          width='100%'
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
