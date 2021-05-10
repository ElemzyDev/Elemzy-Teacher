import {useDispatch} from "react";
import {LOAD_CLASSROOM,LOAD_TEACHERS,ADD_STUDENT,REMOVE_STUDENT,LOAD_SEMESTERS} from './types'
import axios from "axios";
import {useSelector} from "react";



const CLASSROOM_URL="http://127.0.0.1:8000/api/classroom";
const STUDENTLIST_URL="http://127.0.0.1:8000/api/studentslist";


export const loadDashboardData = (authState,dispatch) =>{
    const config=getTokenConfig(authState);

    axios.get(CLASSROOM_URL,config).then(resp=>{
        if(resp.status==200){

            dispatch({
                type:LOAD_CLASSROOM,
                payload:resp.data
            })
        }

    }).catch(error=>{
        //Handling errors
    })

    // Loading semesters
    axios.get("http://127.0.0.1:8000/api/classroom/semester/",config).then((resp)=>{
        if(resp.status===200){
            dispatch({
                type:LOAD_SEMESTERS,
                payload:resp.data
            })
        }
    }).catch(error=>{
        //Handling errors
    })

    // Loading teachers
    axios.get("http://127.0.0.1:8000/api/teacherslist",config).then((resp)=>{
        if(resp.status===200){
            dispatch({
                type:LOAD_TEACHERS,
                payload:resp.data
            })
        }
    }).catch(error=>{
        //Handling errors
    })


    // lOAD STUDENTS LISt
    axios.get(STUDENTLIST_URL,config).then(response=>{
        if(response.status===200){

            dispatch({
                type:"LOAD_STUDENTS",
                payload:response.data
            })
        }
    }).catch(error=>{
        //Handling errors
    })
}


export const getTokenConfig = (authState)=>{


    const token=authState.token;
     // Headers
    const config = {
        headers: {
        "Content-Type": "application/json",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    } else {
        let localtoken = localStorage.getItem("token");
        if (localtoken) config.headers["Authorization"] = `Token ${localtoken}`;
    }

    return config

}

export const addRemoveStudent = async (authState,dispatch,std_obj)=>{

    const config=getTokenConfig(authState);

    if (std_obj.type=="add_student"){

        const response=await axios.put(CLASSROOM_URL,std_obj,config);
        
        if(response.status===200){
            console.log("Good");
            console.log(response.data);

            dispatch({
                type:ADD_STUDENT,
                payload:response.data
            })

        }

    }else if ((std_obj.type=="remove_student")){
        const response=await axios.put(CLASSROOM_URL,std_obj,config);
        console.log(response.data);

        if(response.status===200){
            console.log("Good");
            console.log(response.data);

            dispatch({
                type:REMOVE_STUDENT,
                payload:response.data
            })

        }
        
    
    }

}