import Layout from '../components/layout'
import InstructorTable from '../components/instructor-table'


export default function Home() {
  return (
    <Layout  pageName='Instructors'>
        <InstructorTable />
    </Layout>
  );
}
