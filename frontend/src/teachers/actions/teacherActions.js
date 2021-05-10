import axios from "axios";
import {getTokenConfig} from "./classroom";
import {ADD_SEMESTER, ADD_SUBJECT} from "./types";



export const createSemester = async (authState,dispatch,data)=>{

    const config=getTokenConfig(authState);
    console.log(data);

    const response=await axios.post("http://127.0.0.1:8000/api/classroom/semester/",data,config)

    if (response.status==200){
        dispatch(
            {
                type:ADD_SEMESTER,
                payload:response.data
            }
        );
    }

}


export const createSubject = (authState,dispatch,data)=>{

    const config=getTokenConfig(authState);
    console.log(data);

    axios.post("http://127.0.0.1:8000/api/classroom/subject/",data,config).then((resp)=>{
        console.log(resp);
        dispatch({
            type:ADD_SUBJECT,
            payload:resp.data
        })

        console.log("Dispatched Add Subject")
    }).catch((error)=>{
        console.log(error);
    })


}

