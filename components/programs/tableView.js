//https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Plugin} from '@devexpress/dx-react-core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { makeStyles } from '@material-ui/core/styles';

import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import DataTypeProviders from './datatypeProviders';

import {instructorColumns, instructorDefaultColumnWidths, instructorDefaultColumnOrder} from './instructorColumns';
import {schoolColumns, schoolDefaultColumnWidths,schoolDefaultColumnOrder} from './schoolColumns';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';

import { useAuth } from "../../lib/useAuth.js";
import { useData } from "../../lib/useData";
import {mutate} from 'swr';

import Loading from '../loading';

import Tooltip from '@material-ui/core/Tooltip';

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
import { selectedRowsCountSelector } from '@material-ui/data-grid';



const TableEditCommand = ({...restProps}) => {
  return null;
};


const programColumns = [
    { name: 'name', title: 'Name'},
    { name: 'schedule', title: 'Assigned Schedule'},
    { name: 'school', title: 'School'},
    { name: 'program', title: 'Program'},
    // { name: 'gender', title: 'Gender'},
    // { name: 'year_of_instruction', title: 'School Year'},
    // { name: 'major', title: 'Major'},
    // { name: 'university', title: 'University'},
    // { name: 'region', title: 'Region'},
    // { name: 'address', title: 'Address'},
    // { name: 'car', title: 'Car 🚗', description:'Weather they have a car or not'},
    // { name: 'returning_instructor', title: 'Returning'},
    // { name: 'shirt_size', title: 'Shirt Size 👕'},
    // { name: 'programs', title: 'Programs'},
    // { name: 'languages_spoken', title: 'Languages'},
    // { name: 'schedule', title: 'Schedule'},
    // { name: 'city', title: 'City'},
    // { name: 'phone_number', title: 'Phone Number'},
  
  
  ];



const Root = props => <Grid.Root {...props} style={{ display: 'flex', height: '100%' , width: '100%'}} />;
const useStyles = makeStyles((theme) => ({
  chip:{
    margin: '1.5px',
  },
  label:{
    fontSize: '0.875rem',
  },
  fontSizeLarge:{
    fontWeight: 500,
    fontSize: '1.8rem',
    margin:'0px',
  },
  addIcon:{
    fontWeight: 600,
    fontSize: '2.3rem',
  },
  addIconSmall:{
    fontWeight: 500,
    fontSize: '1.8rem',
  }
}));
export default function TableView({
  sortData,
  programData,
  instructorDict,
  schoolDict,
}){
  console.log("2. Program Component");
  const classes = useStyles();
  const auth = useAuth();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(false);
  const [deletedRow, setDeletedRow] = useState(false);

  const [columns] = useState(programColumns);
//   const [BooleanColumns] = useState((table_type === 'Instructors' )? ['car','returning_instructor'] : ['program_time_flexibility','is_virtual']);
//   const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirt_size'] : []);
//   const [InstProgramColumns] = useState((table_type === 'Instructors' )?['programs']:[]);
//   const [SchoolProgramColumns] = useState((table_type === 'Instructors' )?[]:['programs']);
    const [ScheduleColumns] = useState(['schedule']);
//   const [ListColumns] = useState((table_type === 'Instructors' )?['languages_spoken','region']:['location_preferences','region','special_language_request']);
  const [defaultColumnWidths] = useState(programDefaultColumnWidths);
  const [defaultColumnOrder] = useState(programDefaultColumnOrder);
  const [defaultHiddenColumnNames] = useState([]);
  const [tableColumnExtensions] = useState([
    // { columnName: 'programs', wordWrapEnabled: true },
    { columnName: 'schedule', wordWrapEnabled: true },
    // { columnName: 'languages_spoken', wordWrapEnabled: true },
  ]);

  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);
  const [dense, setDense] = useState(false);
  const TableRow = ({ ...restProps}) => (
    <VirtualTable.Row
      {...restProps}
    />
  );
  const TableCell = ({...restProps}) => (
    <VirtualTable.Cell
      {...restProps}
      style={{padding:dense?'0.25vh':null}}
    />
  );
  const TableHeaderCell = ({...restProps}) => (
    <TableHeaderRow.Cell
      {...restProps}
      style={{textAlign:'center', padding:dense?'1vh':null}}
    
    />
  );
  const ToolbarRoot = ({children, ...restProps}) => (
    <Toolbar.Root {...restProps} style={{minHeight:dense?"0px":null}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
      <div style={{display: 'flex'}}>
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
  const TableEditColumnCell = ({tableRow, children, ...restProps}) =>(
    <TableEditColumn.Cell 
      {...restProps}
      style={{padding:'0', textAlign:'center'}}
    >
      <Tooltip title="Edit">
        <IconButton style={{padding:dense?'11px':'14px'}} onClick={()=>{
          setEditedRow(()=>tableRow.row); 
          setEditOpen(()=>true);
        }}>
          <EditIcon 
            color='primary' 
            fontSize={dense?'medium':'large'}
            classes={{fontSizeLarge: classes.fontSizeLarge}}
          />
        </IconButton>
      </Tooltip>
    </TableEditColumn.Cell>
  );
  const TableEditColumnHeaderCell = ({children, ...restProps}) => (
    <TableEditColumn.HeaderCell 
      {...restProps}
      style={{padding:'0px 1.5vw'}}
    >
    <Typography color='primary' variant='button'>
        Manual Assignment
    </Typography>
      
    </TableEditColumn.HeaderCell>
  );
  const PagingPanelContainer = ({ ...restProps})=>(<>
    <div style={{display:'grid', gridTemplateColumns:'30% auto'}}>
    <FormControlLabel
      component='div'
      control={
        <Switch 
          color='primary'
          checked={dense}
          onChange={()=>setDense(!dense)}
          name="DenseSwitch"
          size='small'
        />
      }
      label="Dense Padding"
      classes={{label:classes.label}}
      style={{ 
        gridColumn:'1 / span 1', justifySelf:'start', alignSelf:'center',
        margin:'1vh 1vw',
      }}
    />
    <PagingPanel.Container 
      {...restProps}
      style={{gridColumn:'2 / span 1', justifySelf:'end', padding:dense?'0px':null}}
    />
    
      
    </div>
  </>);

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

  const commitChanges = ({ added, changed, deleted }) => {
    return null;
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
  return (<>
    {/* <AddEntry 
      open={addOpen} 
      setOpen={setAddOpen} 
      table_type={table_type}
      
    /> */}
    <Paper elevation={3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '96%', height: '-webkit-calc(96% - 64px)', height: '-moz-calc(96% - 64px)',height: 'calc(96% - 64px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
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
          rowComponent={TableRow}
          cellComponent={TableCell}
        />
        
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnReordering
          defaultOrder={defaultColumnOrder}
        />
        <TableHeaderRow 
          showSortingControls
          cellComponent={TableHeaderCell} 
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <PagingPanel
          pageSizes={pageSizes}
          containerComponent={PagingPanelContainer}
          
        />
        <Toolbar rootComponent={ToolbarRoot}/>
        <ColumnChooser messages={{showColumnChooser:"Hide Columns"}}/>
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          width={dense?'120':'130'}
          commandComponent = {TableEditCommand}
          cellComponent = {TableEditColumnCell}
          headerCellComponent = {TableEditColumnHeaderCell}
        />
        {filterToggle == 1 ? <TableFilterRow/> :
         filterToggle == 2 ? <TableFilterRow showFilterSelector/> : 
         null}
      </Grid>
    </Paper>

  </>);
};
