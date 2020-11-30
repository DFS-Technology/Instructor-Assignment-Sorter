export default function Sort(instructorRows, schoolRows, programData){
    var instructors = [];
    var schools = [];

    const unassignedInstructors = {};
    const assignedInstructors = {};
    const instructorList = {};

    for (const instructor of instructorRows){
        if (instructor['programs'].includes(currentProgram)){
            instructors.push(instructor);
        }
    }
    for (const school of schoolRows){
        if (school['programs'].includes(currentProgram)){
            schools.push(school);
        }
    }
    var ret = {};
    var i = 0;
    for (const school of schools){
        ret[school['name']] = []
        for(i = 0; i < school['numInstructors']; i++){
            ret[school['name']].push(instructors.pop())
        }
    }
    return ret;

}