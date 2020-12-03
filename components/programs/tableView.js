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

import DataTypeProviders, {ScheduleFormatter} from '../table/datatypeProviders';


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
import GetAppIcon from '@material-ui/icons/GetApp';

import {
  EditingState,

  SortingState,
  IntegratedSorting,

  PagingState,
  IntegratedPaging,

  FilteringState,
  IntegratedFiltering,

  GroupingState,
  IntegratedGrouping,
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
  
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import { selectedRowsCountSelector } from '@material-ui/data-grid';



const TableEditCommand = ({...restProps}) => {
  return null;
};



const programDefaultColumnWidths = [
  { columnName: 'name', width: 165 },
  { columnName: 'schedule', width: 290},
  // { columnName: 'gender', width: 90 },
  // { columnName: 'year_of_instruction', width: 130 },
  // { columnName: 'major', width: 80 },
  // { columnName: 'university', width: 110 },
  // { columnName: 'region', width: 135 },
  // { columnName: 'address', width: 185 },
  { columnName: 'car', width: 100 },
  { columnName: 'returning_instructor', width: 110 },
  // { columnName: 'shirt_size', width: 130 },
  { columnName: 'programs', width: 250 },
  // { columnName: 'languages_spoken', width: 180 },
  
  // { columnName: 'city', width: 100},
  // { columnName: 'phone_number', width: 100},

];
const programDefaultColumnOrder = [
  'name',
  // 'programs',
  'schedule',
  // 'region',
  // 'car',
  // 'major',
  // 'returning_instructor',
  // 'year_of_instruction',
  // 'university',
  // 'languages_spoken',
  // 'address',
  // 'shirt_size',
  // 'gender',
  // 'city',
  // 'phone_number',
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
  rows,
  programData,
  instructorDict,
  schoolDict,
}){
  const programColumns = [
    { name: 'editing', title: '', getCellValue: ()=>''},
    { name: 'name', title: 'Name', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['name']:''
    }},
    { name: 'schedule', title: 'Assigned Schedule'},
    { name: 'car', title: 'Car', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['car']:false
    }},
    { name: 'returning', title: 'Returning', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['returning_instructor']:false
    }},
    { name: 'programs', title: 'Program Pref.', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['programs']:{}
    }},
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
  console.log("2. Program Component");
  const classes = useStyles();
  const auth = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(false);

  const [columns] = useState(programColumns);
  const [BooleanColumns] = useState(['car','returning']);
//   const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirt_size'] : []);
  const [InstProgramColumns] = useState(['programs']);
//   const [SchoolProgramColumns] = useState((table_type === 'Instructors' )?[]:['programs']);
  const [ScheduleColumns] = useState(['schedule']);
//   const [ListColumns] = useState((table_type === 'Instructors' )?['languages_spoken','region']:['location_preferences','region','special_language_request']);
  const [defaultColumnWidths] = useState(programDefaultColumnWidths);
  const [defaultColumnOrder] = useState(programDefaultColumnOrder);
  const [defaultHiddenColumnNames] = useState([]);
  const [lockList, setLockList] = useState([]);
  const [tableColumnExtensions] = useState([
    // { columnName: 'programs', wordWrapEnabled: true },
    // { columnName: 'name', width: 165},
    // { columnName: 'editing', wordWrapEnabled: true, width: 120},
    // { columnName: 'schedule', wordWrapEnabled: true, width: 275},
    // { columnName: 'car', wordWrapEnabled: true, width: 65},
    // { columnName: 'returning', wordWrapEnabled: true, width: 100},
    // { columnName: 'oldSchedule', wordWrapEnabled: true, width: 250},
    { columnName: 'name', width: 165},
    { columnName: 'editing', wordWrapEnabled: true, width: 120},
    { columnName: 'schedule', wordWrapEnabled: true, width: 275},
    { columnName: 'car', wordWrapEnabled: true, width: 65, align: 'center'},
    { columnName: 'returning', wordWrapEnabled: true, width: 100, align: 'center'},
    { columnName: 'programs', wordWrapEnabled: true, width: 250},
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
  const TableCell = ({children, ...restProps}) => {
    return (
      <VirtualTable.Cell
        {...restProps}
        style={{padding:dense?'0.25vh':null, textAlign:restProps.column.name === 'editing'?'center':null}}
      >
        {restProps.column.name === 'editing'?
          <Tooltip title="Edit">
            <IconButton style={{textAlign:'center',alignSelf:'center',padding:dense?'11px':'14px'}} onClick={()=>{
              setEditedRow(()=>tableRow.row); 
              setEditOpen(()=>true);
            }}>
              <EditIcon 
                color='primary' 
                fontSize={dense?'small':'default'}
                classes={{fontSizeLarge: classes.fontSizeLarge}}
              />
            </IconButton>
          </Tooltip>
        :
          children
        }
      </VirtualTable.Cell>
    );
  };
  const TableHeaderCell = ({children, ...restProps}) => {
    
    return (
      <TableHeaderRow.Cell
        {...restProps}
        style={{textAlign:'center',alignSelf:'center', padding:dense?'1vh':null}}
      >
        {restProps.column.name === 'editing'?
          <Typography color='primary' variant='button' style={{textAlign:'center', padding:dense?'1vh':null}}>
            Manual Assignment
          </Typography>
        :
          <div style={{display:'block'}}>{restProps.column.title}</div>
        }
      </TableHeaderRow.Cell>
    );
  };
  
  const ToolbarRoot = ({children, ...restProps}) => (
    <Toolbar.Root {...restProps} style={{minHeight:dense?"0px":null}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
      <div style={{display: 'flex'}}>
      <Tooltip title="Save PDF">
        <IconButton >
          <GetAppIcon/>
        </IconButton>
      </Tooltip>
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
  const GroupCellCentent = ({column, row}) => {
    if (column.name === 'program'){
      return SchoolProgramFormatter({row: {id: column.name}, value:[row.value]});
    }else{
      return (<span>
          {schoolDict[row.value]['name']+'    '}
          <Chip label={schoolDict[row.value]['is_virtual']?'Virtual':'In-Person'}
            style={{backgroundColor:schoolDict[row.value]['is_virtual']?'#DBDAEB':'#D7F4F4'}}
          />
          {ScheduleFormatter({row:{id: row.value},value: schoolDict[row.value]['programs'][Object.keys(schoolDict[row.value]['programs'])[0]]})}
      </span>);
    }
  };
  if(auth.currentSeason === ''){
    return(<h1>Season not selected.</h1>);
  }
  // else if((!rows && !error)||(!programData && !programError)){
  //   return (<Loading />);
  // }else if(error || programError){
  //   console.log("Error::useData(table_type,auth.)::Error", error);
  //   return (<h1>ERROR. Check console logs</h1>);
  // }

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
    <EditEntry 
      open={editOpen} 
      setOpen={setEditOpen} 
      editedRow={editedRow}
    />

    
    <Paper elevation={3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '94%', height: '-webkit-calc(94% - 70px)', height: '-moz-calc(94% - 70px)',height: 'calc(94% - 70px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rootComponent={Root}
      >
        

        <DataTypeProviders 
          BooleanColumns={BooleanColumns} 
          ShirtColumns={[]} 
          ScheduleColumns={ScheduleColumns}
          ListColumns={[]}
        />
        <InstProgramTypeProvider for={InstProgramColumns} />
        
        {filterToggle == 1 ? <FilteringState defaultFilters={[]} /> :
         filterToggle == 2 ? <FilteringState defaultFilters={[]} />: 
         null}
         {filterToggle == 1 ? <IntegratedFiltering /> :
         filterToggle == 2 ? <IntegratedFiltering />: 
         null}
        
        
        <GroupingState
          grouping={[{ columnName: 'program' }, { columnName: 'school'}]}
        />
        <IntegratedGrouping />
        
        <VirtualTable 
          height='100%'
          width='100%'
          columnExtensions={tableColumnExtensions}
          rowComponent={TableRow}
          cellComponent={TableCell}
        />

        <TableHeaderRow 
          cellComponent={TableHeaderCell} 
        />

        <Toolbar rootComponent={ToolbarRoot}/>

        {filterToggle == 1 ? <TableFilterRow/> :
         filterToggle == 2 ? <TableFilterRow showFilterSelector/> : 
         null}
        <TableGroupRow 
          contentComponent={GroupCellCentent}
        />
      </Grid>
    </Paper>
  </>);
};

function EditEntry({
  open,
  setOpen,
  editedRow,
}){


  return(<></>);

}