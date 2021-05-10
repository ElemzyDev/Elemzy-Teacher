import {LOAD_CLASSROOM,ADD_STUDENT,LOAD_STUDENTS,LOAD_SEMESTERS,REMOVE_STUDENT, ADD_SEMESTER, ADD_SUBJECT, LOAD_TEACHERS} from "../actions/types";
import {produce} from "immer";

const initialState={
    classroom:{},
    students:[],
    globalStudents:[],
    semesters:[],
    teachers:[]
}

export const classRoomReducer = (state=initialState,action)=>{

    switch(action.type){

        case LOAD_CLASSROOM:
            const classroom=action.payload.classroom;
            const students=action.payload.students;

            return {...state,classroom,students}

        case LOAD_STUDENTS:
            
            // Loading global students
            return {...state,globalStudents:action.payload};

        case ADD_STUDENT:
            {
            const addedStudent=action.payload;
            const {classroomStudents,globalStudents} = addStudent(state.globalStudents,state.students,addedStudent);
            

            return {...state,globalStudents:[...globalStudents],students:[...classroomStudents]}
            }
        case REMOVE_STUDENT:
            {
            
            const removedStudent=action.payload;
            const {classroomStudents,globalStudents} = removeStudent(state.globalStudents,state.students,removedStudent);
            
            return {...state,globalStudents:[...globalStudents],students:[...classroomStudents]}
            }

        case ADD_SEMESTER:
            {
                const newSemester={name:action.payload.name,pk:action.payload.pk,subjects:[]}

                for (let semester of state.semesters){
                    if(semester.pk===newSemester.pk){
                        return state;
                    }
                }

                const newState=produce(state,draft=>{
                    draft.semesters.push(newSemester)
                })

            return newState;
            }
          
        
        case LOAD_SEMESTERS:
            {
                const newState =  produce(state,draft=>{
                    draft.semesters=action.payload;
                })

                return newState;
            }

    
        case LOAD_TEACHERS:

            {
                const newState =  produce(state,draft=>{
                    draft.teachers=action.payload;
                })

                return newState;
            }

        case ADD_SUBJECT:
            {
                const newSubject=action.payload;

                const newState=produce(state,draft=>{
                    for(let semester of draft.semesters){
                        if(semester.pk===newSubject.semester){
                            semester.subjects.push(newSubject);
                        }
                    }
                })

                return newState;
                
            }

        default:

            return state

    }

}



const addStudent = (globalStudents,classroomStudents,studentObj)=>{

    // Adding student to students list based on id of studentObj


    // studentObj => {"user_profile":user_obj,"student_profile":studentOBj}

    let isStudentExist=false;
    

    for(let student of classroomStudents){
        if((student.user_info.id===studentObj.user_info.id) && 
        (student.student_profile.id===studentObj.student_profile.id)){
            isStudentExist=true;
        }
    
    }

    if(!isStudentExist){
        classroomStudents.push(studentObj)
    }

    const newGlobalStudents=globalStudents.filter((student)=>{
        if(student.id===studentObj.student_profile.id){
            return false;
        }

        return true;
    })


    return {globalStudents:[...newGlobalStudents],classroomStudents:[...classroomStudents]}
}


const removeStudent = (globalStudents,classroomStudents,studentObj)=>{

    // Removing student from students list based on id of studentObj


    // studentObj => {"user_profile":user_obj,"student_profile":studentOBj}

    let isStudentExist=false;
    
    for(let student of globalStudents){
        if((student.id===studentObj.id)){

            isStudentExist=true;
        }
    
    }
    // if not exists push it or add it
    if(!isStudentExist){
        globalStudents.push(studentObj)
    }

    // Filtering so the list will have all items except studentObj
    const newClassroomStudents=classroomStudents.filter((student)=>{
        if(student.student_profile.id===studentObj.id){
            return false;
        }

        return true;
    })


    return {classroomStudents:[...newClassroomStudents],globalStudents:[...globalStudents]}

}
