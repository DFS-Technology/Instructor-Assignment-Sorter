  import {useState} from 'react'
  import Grid from '@material-ui/core/Grid';

  import ProgramsPageTitleBar from './programsPageTitleBar';

  import ProgramCards from './programCards';
  import SortPage from '../sortingPagesComponents/programs';

  import { useAuth } from "../../lib/useAuth.js";
  import { mutate } from 'swr';


  import Loading from '../loading';
  import { formatMs } from '@material-ui/core';

  export default function Programs({
    programData, 
    instructorRows, 
    schoolRows, 
    error,
  }){
    console.log('2. Programs Component');

    const {currentSeason} = useAuth();  
    const [sortPageToggle, setSortPageToggle] = useState(false);
    const [tableViewSwitch, setTableViewSwitch] = useState(false);
    const [rawSchoolData, setRawSchoolData] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleProgramChange = ({oldProgramName, newProgramName, deleting})=>{
      if(!deleting && oldProgramName === newProgramName){
        return null
      }
      for(const instructor of instructorRows){
        const index = instructor['programs_teaching'].indexOf(oldProgramName)
        if(index > -1){
          if(!deleting){
            instructor['programs_teaching'][index] = newProgramName;
            instructor['programs'][newProgramName] = instructor['programs'][oldProgramName];
          }else{
            instructor['programs_teaching'].splice(index,1);
          }
          delete instructor['programs'][oldProgramName];
        }
      }
      for(const school of schoolRows){
        if(school['programs'].hasOwnProperty(oldProgramName)){
          if(!deleting){
            school['programs'][newProgramName] = school['programs'][oldProgramName];
          }
          delete school['programs'][oldProgramName];
        } 
      }

      mutate(['Instructors', currentSeason], instructorRows, false);
      mutate(['Schools', currentSeason], schoolRows, false);

      return null;
    }
   
    const newSortHandler = async () => {
      console.log(currentSeason);
      const request = {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
          body: JSON.stringify({'Season': currentSeason}),
      };
      console.log(request);
      const matchObject = await fetch(
              'https://apurva29.pythonanywhere.com/sort',
              request)
          .then(response => response.json());
      console.log(matchObject);
      const instructorDict = {};
      const unassignedInstructors = {};
      for(const instructor of instructorRows){
        instructorDict[instructor['id']] = instructor;
        unassignedInstructors[instructor['id']] = 0;
      }
      const schoolDict = {};
      for(const school of schoolRows){
        schoolDict[school['id']] = school;
      }
      



      for(const program in matchObject){
        const assignedSchools = {};
        var assignedInstructors = 0;
        for(const schoolID in matchObject[program]){
          assignedSchools[schoolID] = {};
          for(const instructorID in matchObject[program][schoolID]){
            assignedSchools[schoolID][instructorID] = instructorDict[instructorID];
            assignedSchools[schoolID][instructorID]['schedule'] = matchObject[program][schoolID][instructorID];
            if(instructorID in unassignedInstructors){
              assignedInstructors += 1;
              delete unassignedInstructor[instructorID];
            }
          }
        }
        programData[program]['assigned_schools'] = assignedSchools;
        programData[program]['assigned_instructors'] = assignedInstructors;
      }
      programData['unassigned_instructors'] = Object.keys(unassignedInstructor).length;
      mutate(['Programs', currentSeason], programData, false);
      setLoading(false);
      setRawSchoolData(schoolDict);
  };
  

    if(currentSeason === ''){
      return(<h1>Season not selected.</h1>);
    }else if(((!programData || !instructorRows || !schoolRows) && !error )|| loading){
      return (<Loading />);
    }else if(error){
      console.log("Error::useData(table_type,auth.)::Error", error);
      return (<h1>ERROR. Check console logs</h1>);
    }

    return(<>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <ProgramsPageTitleBar 
          sortPageToggle={sortPageToggle} 
          setSortPageToggle={setSortPageToggle}
          tableViewSwitch={tableViewSwitch}
          setTableViewSwitch={setTableViewSwitch}
          programData={programData}
          newSortHandler={newSortHandler}
          setLoading={setLoading}
        />
        {sortPageToggle?  
          <SortPage  
            programData={programData} 
            rawSchoolData={rawSchoolData}
          />
          :
          <ProgramCards 
            programData={programData} 
            handleProgramChange={handleProgramChange} 
          />
        } 
      </Grid>
    </>);
                    
          
  }

