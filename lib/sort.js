export default function Sort(instructorRows, schoolRows, programData){
    var instructors = [];
    var schools = [];

    const unassignedInstructors = {};
    const assignedInstructors = {};
    const instructorList = {};

    const returnObject;

    for (const school of schoolRows){
        
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