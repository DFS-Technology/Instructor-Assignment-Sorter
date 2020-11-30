import { CSVLink } from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';

const instructorColumns = [
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


export default function({data}){
  return(
    <CSVLink data={data} headers={instructorColumns}>
      <GetAppIcon/>
    </CSVLink>
  );
}
