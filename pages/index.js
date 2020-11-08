import Layout from '../components/layout/layout'
import Table from '../components/table/table'
import Programs from '../copmonents/sortingPagesComponents/programs'

import { useRequireAuth } from "../lib/useAuth";
import { useData } from "../lib/useData";


import Loading from '../components/loading';

export default function App() {
  console.log("1. App Main Page");

  const auth = useRequireAuth();
  const {data, error} = useData('Seasons', true);
  const {data: instructorRows} = useData('Instructors', auth.currentSeason, data);
  const {data: schoolRows} = useData('Schools', auth.currentSeason, data);

  if(!auth || !auth.user || (!data && !error) || !instructorRows || !schoolRows){
    return (<Loading />);
  }else if(error){
    console.log("Error::useData('Seasons',null)::Error", error);
    return (<h1>ERROR. Check console logs</h1>);
  }

  auth.setSeasonList(data);
  if(!auth.currentSeason){
    auth.setCurrentSeason(data[0]);
  }

  if(!auth.seasonList || !auth.currentSeason){
    return (<Loading />);
  }
  return (
    <Layout  pageName={auth.pageName}>
      {auth.pathName === 'Home'         ?   null: null}
      {auth.pageName === 'Instructors'  ?   <Table table_type={auth.pageName} rows={instructorRows}/>: null}
      {auth.pageName === 'Schools'      ?   <Table table_type={auth.pageName} rows={schoolRows}/>:     null}
      {auth.pathName === 'Programs'     ?   <Programs/>: null}
    </Layout>
  );
}
