import Layout from '../components/layout/layout'
import Table from '../components/table/table'

import { useRequireAuth } from "../lib/useAuth";
import { useData } from "../lib/useData";

import Loading from '../components/loading';

export default function App() {
  console.log("1. App Main Page");
  const auth = useRequireAuth();
  const {seasonList, instructorData, schoolData} = useData(auth.currentSeason);

  if(!auth || !auth.user || !seasonList || !instructorData || !schoolData)
  {return (<Loading />);}
  auth.setSeasonList(seasonList);
  auth.setCurrentSeason(auth.currentSeason?auth.currentSeason:seasonList[0]);
  if(!auth.seasonList || !auth.currentSeason){return (<Loading />);}
  return (
    <Layout  pageName={auth.pageName}>
      {auth.pageName === 'Instructors' ? <Table table_type='Instructors' data={instructorData}/>: null}
      {auth.pageName === 'Schools' ? <Table table_type='Schools' data={schoolData}/>: null}
    </Layout>
  );
}
// Create extra component so Data doesn't get downloaded until auth.