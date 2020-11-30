import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Plugin} from '@devexpress/dx-react-core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { makeStyles } from '@material-ui/core/styles';

import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import DataTypeProviders from './datatypeProviders';
import {deleteDocuments, addDocuments, editDocuments} from '../../lib/firestoreApi';

import {instructorColumns, instructorDefaultColumnWidths, instructorDefaultColumnOrder} from './instructorColumns';
import {schoolColumns, schoolDefaultColumnWidths,schoolDefaultColumnOrder} from './schoolColumns';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';

import { useAuth } from "../../lib/useAuth.js";
import { useData } from "../../lib/useData";
import {mutate} from 'swr';

import Loading from '../loading';

import { CSVLink } from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';

const instructorExportColumns = [
    { key: 'name', label: 'Name'},
    { key: 'gender', label: 'Gender'},
    { key: 'schoolYear', label: 'School Year'},
    { key: 'major', label: 'Major'},
    { key: 'university', label: 'University'},
    { key: 'region', label: 'Region'},
    { key: 'startingLocation', label: 'Address'},
    { key: 'car', label: 'Car 🚗', description:'Weather they have a car or not'},
    { key: 'returner', label: 'Returning'},
    { key: 'shirtSize', label: 'Shirt Size 👕'},
    { key: 'programs', label: 'Programs'},
    { key: 'languages', label: 'Languages'},
  ];


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

  TableFilterRow, 
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
      <Tooltip title="New" placement="top">
      <AddIcon />
      </Tooltip>
    ): id === 'edit' ? (
      <Tooltip title="Edit">
      <EditIcon />
      </Tooltip>
      
    ):id === 'delete' ? (
      <Tooltip title="Delete">
      <DeleteIcon />
      </Tooltip>
      
    ):id === 'commit' ? (
      <Tooltip title="Save">
      <CheckIcon />
      </Tooltip>
      
    ):id === 'cancel' ? (
      <Tooltip title="Cancel">
      <ClearIcon />
      </Tooltip>
      
    ):null}
    {...restProps}
  >
  </TableEditColumn.Command>
);

export const TableEditCommand = withStyles(styles, { name: 'TableEditCommand' })(TableEditCommandBase);


const getRowId = row => row.id;


const Root = props => <Grid.Root {...props} style={{ display: 'flex', height: '100%' , width: '100%'}} />;
const useStyles = makeStyles((theme) => ({
  chip:{
    margin: '1.5px',
  },
}));
export default function Table({
  table_type, 
  rows, error,
  programData, programError,
}){
  console.log("2. "+table_type+" Component");
  const classes = useStyles();
  const auth = useAuth();

  const [columns] = useState((table_type === 'Instructors' )? instructorColumns : schoolColumns);
  const [BooleanColumns] = useState((table_type === 'Instructors' )? ['car','returning_instructor'] : ['program_time_flexibility','is_virtual']);
  const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirt_size'] : []);
  const [InstProgramColumns] = useState((table_type === 'Instructors' )?['programs']:[]);
  const [SchoolProgramColumns] = useState((table_type === 'Instructors' )?[]:['programs']);
  const [ScheduleColumns] = useState(['schedule']);
  const [ListColumns] = useState((table_type === 'Instructors' )?['languages_spoken','region']:['location_preferences','region','special_language_request']);
  const [defaultColumnWidths] = useState((table_type === 'Instructors' )? instructorDefaultColumnWidths : schoolDefaultColumnWidths);
  const [defaultColumnOrder] = useState((table_type === 'Instructors' )? instructorDefaultColumnOrder : schoolDefaultColumnOrder);
  const [defaultHiddenColumnNames] = useState([]);
  const [tableColumnExtensions] = useState((table_type === 'Instructors' )?
  [
    { columnName: 'programs', wordWrapEnabled: true },
    { columnName: 'schedule', wordWrapEnabled: true },
    { columnName: 'languages_spoken', wordWrapEnabled: true },
  ]:
  [
    { columnName: 'schedule', wordWrapEnabled: true },
    { columnName: 'special_language_request', wordWrapEnabled: true },
  ]);

  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);

  const InstructorProgramFormatter = ({row:{id}, value}) => {
    if(!value || !Object.keys(value).length){
      return <></>;
    }
    const programs = [];
    for (const [program, pref] of Object.entries(value)){
      const colorObj = programData[program]['color'];
      const chipColor = 'rgba('+colorObj['r'].toString()+','+
        colorObj['g'].toString()+','+
        colorObj['b'].toString()+','+
        colorObj['a'].toString()+')';
      const textColor = chipColor>'#888888'?'#333333':'#dddddd';
        programs.push(<Chip 
          label={program+': '+pref.toString()}
          key={String(id)+'InstProgramChip'+program}
          style={{backgroundColor:chipColor,  color:'white',fontWeight:'600'}}
          className={classes.chip}
        />);
    }
    return (<>{programs}</>);
  };
  const  InstProgramTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={InstructorProgramFormatter}
            {...props}
        />
    );
  };
  const SchoolProgramFormatter = ({row:{id}, value}) => {
    if(!value || !value.length){
      return <></>;
    }
    const programs = [];
    for (const program of value){
      const colorObj = programData[program]['color'];
      const chipColor = 'rgba('+colorObj['r'].toString()+','+
        colorObj['g'].toString()+','+
        colorObj['b'].toString()+','+
        colorObj['a'].toString()+')';
      const textColor = chipColor>'#888888'?'#000000':'#ffffff';
        programs.push(<Chip 
          label={program}
          key={String(id)+'SchoolProgramChip'+program}
          className={classes.chip}
          style={{backgroundColor:chipColor, color:'white',fontWeight:'600'}}
        />);
    }
    return (<>{programs}</>);
  };
  const SchoolProgramTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={SchoolProgramFormatter}
            {...props}
        />
    );
  };

  if(auth.currentSeason === ''){
    return(<h1>Season not selected.</h1>);
  }else if((!rows && !error)||(!programData && !programError)){
    return (<Loading />);
  }else if(error || programError){
    console.log("Error::useData(table_type,auth.)::Error", error);
    return (<h1>ERROR. Check console logs</h1>);
  }



  const ToolbarRootBase = ({children}) => (
    <Toolbar.Root>
      <div style={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
      <div style={{display: 'flex'}}>
      <CSVLink data={rows} headers={instructorExportColumns}>
      <Tooltip title="Export to CSV">
        <IconButton >
          <GetAppIcon/>
        </IconButton>
      </Tooltip>
      
      </CSVLink>
      </div>
      <div style={{display: 'flex'}}>
      {children}
      <Tooltip title={"Filter "+filterToggle+"/2"}>
      <IconButton onClick={() => setFilterToggle((filterToggle+1)%3)}>
        <FilterListIcon />
      </IconButton>
      </Tooltip>
      </div>
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
  };
  return (
    <Paper elevation={3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '96%', height: '-webkit-calc(96% - 64px)', height: '-moz-calc(96% - 64px)',height: 'calc(96% - 64px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        rootComponent={Root}
      >
        
        <SortingState defaultSorting={[]}/>
        <IntegratedSorting />
        
        <DataTypeProviders 
          BooleanColumns={BooleanColumns} 
          ShirtColumns={ShirtColumns} 
          ScheduleColumns={ScheduleColumns}
          ListColumns={ListColumns}
        />
        <InstProgramTypeProvider for={InstProgramColumns} />
        <SchoolProgramTypeProvider for={SchoolProgramColumns} />
        
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
          columnExtensions={tableColumnExtensions}
        />
        
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnReordering
          defaultOrder={defaultColumnOrder}
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
        <ColumnChooser messages={{showColumnChooser:"Hide Columns"}}/>
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
