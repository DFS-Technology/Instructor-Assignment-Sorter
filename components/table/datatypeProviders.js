import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Plugin} from '@devexpress/dx-react-core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';




const ShirtFormatter = ({ value }) => <Chip label={value} />;
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} style={{backgroundColor:value?'#F9DEA6':null}} />;


function ShirtEditor({ value, onValueChange }){
    return (
        <Select
            input={<Input />}
            value={value}
            onChange={event => onValueChange(event.target.value)}
            style={{ width: '100%' }}
        >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
        </Select>
    );
};
function BooleanEditor({ value, onValueChange }){
    return (
        <Select
            input={<Input />}
            value={value ? 'Yes' : 'No'}
            onChange={event => onValueChange(event.target.value === 'Yes')}
            style={{ width: '100%' }}
        >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
        </Select>
    );
};




function BooleanTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={BooleanFormatter}
            editorComponent={BooleanEditor}
            {...props}
        />
    );
};
function ShirtTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={ShirtFormatter}
            editorComponent={ShirtEditor}
            {...props}
        />
    );
};

const scheduleVal = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
};
const scheduleText = {
    'Monday': 'Mon',
    'Tuesday': 'Tue',
    'Wednesday': 'Wed',
    'Thursday': 'Thu',
    'Friday': 'Fri',
};
const dayVal = {
    'Mon':0,
    'Tue':1,
    'Wed':2,
    'Thu':3,
    'Fri':4,
};
const numList = [1,2,3,4,5];
const dayColor = numList.map((item) => 'hsl(41,81%,'+String(63*(1+(item-3)*0.175))+'%)');



const ScheduleFormatter = ({row: {id}, value}) => {
    if(!value || !Object.keys(value).length){
        return <></>;
    }
    const schedule = [];
    for (const day in  value){
        for(const timeSlot of value[day]){
            const chipText = scheduleText[day]+' '+timeSlot['start']+'-'+timeSlot['end'];
            schedule.push([chipText, dayColor[scheduleVal[day]]]);
        }
    }
    schedule.sort((a,b)=>dayVal[a[0].slice(0,3)]-dayVal[b[0].slice(0,3)]);
    return (<div>{schedule.map((chipInfo) => (<Chip 
        label={chipInfo[0]}
        key={String(id)+'ScheduleChip'+chipInfo[0]}
        style={{margin:'1.5px', backgroundColor:chipInfo[1],fontWeight:'450'}}
        // style={{backgroundColor:chipColor, color:textColor,}}
    />))}</div>);
};
export function ScheduleTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={ScheduleFormatter}
            {...props}
        />
    );
  };
  const ListFormatter = ({row:{id}, value}) => {
    if(!value || !value.length){
        return <></>;
    }
    const listItems = [];
    for (const item of value){
        listItems.push(<Chip 
          label={item}
          key={String(id)+'ListItem'+item}
          style={{margin:'1.5px'}}
        />);
    }
    return (<>{listItems}</>);
  };
  const  ListTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={ListFormatter}
            {...props}
        />
    );
  };

function DataTypeProviders({BooleanColumns, ShirtColumns, ScheduleColumns,ListColumns}){
    return (
        <Plugin>
            <BooleanTypeProvider for={BooleanColumns} />
            <ShirtTypeProvider for={ShirtColumns} />
            <ScheduleTypeProvider for={ScheduleColumns} />
            <ListTypeProvider for={ListColumns} />
        </Plugin>
    );  
};

export default DataTypeProviders
