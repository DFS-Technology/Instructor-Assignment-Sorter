import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Plugin} from '@devexpress/dx-react-core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';


const ShirtFormatter = ({ value }) => <Chip label={value} />;
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;


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
// function ProgramTypeProvider(props){
//     return (
//         <DataTypeProvider
//             formatterComponent={ProgramFormatter}
//             editorComponent={ProgramEditor}
//             {...props}
//         />
//     );
// };

// function ScheduleTypeProvider(props){
//     return (
//         <DataTypeProvider
//             formatterComponent={ScheduleFormatter}
//             editorComponent={ScheduleEditor}
//             {...props}
//         />
//     );
// };

function DataTypeProviders({BooleanColumns, ShirtColumns, ProgramColumns, ScheduleColumns}){
    return (
        <Plugin>
            <BooleanTypeProvider for={BooleanColumns} />
            <ShirtTypeProvider for={ShirtColumns} />
            {/* <ProgramTypeProvider for={ProgramColumns} />
            <ScheduleTypeProvider for={ScheduleColumns} /> */}
        </Plugin>
    );  
};

export default DataTypeProviders