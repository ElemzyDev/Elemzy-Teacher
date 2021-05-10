import {Typography,Button,TextField,InputLabel,Select,MenuItem,FormControl} from "@material-ui/core";
import {useDispatch} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


import {createSemester, createSubject} from "../actions/teacherActions";

const useStyles=makeStyles(theme=>({
    root:{
     
        "& .MuiFormControl-root":{
            width:"100%",
            marginBottom:"1em"
        },
        "& .MuiDialog-paperWidthSm":{
            width:"35%"
        }
    }

}))


const DialogForm = (props)=>{

    
    const classes=useStyles();
    const {open,setOpen,onCreateBtnHandler,title} = props;
    
    return (
        // Open close if open true dialog will pop up
        <Dialog open={open} onClose={()=>setOpen(false)}  className={classes.root}>


            <DialogContent>

                <Typography variant="h6" color="textSecondary">
                    {title}
                </Typography>

                <form>
                    {props.children}
                </form>
                

            </DialogContent>

            <DialogActions>

                {/* SUbmit data btn  */}
                <Button variant="outlined" color="primary" size="small" onClick={onCreateBtnHandler}>
                    Create
                </Button>

                {/* Dialog Close Btn */}
                <Button variant="text" onClick={()=>setOpen(false)} size="small">
                    Close
                </Button>

            </DialogActions>
        </Dialog>
    
    )
}



// Main semester form
export const SemesterForm = ({open,setOpen})=>{
    // Name property is reffered to semester name
    const dispatch = useDispatch();

    const initialData={
        name:""
    }
    const [data,setData]=useState(initialData);
  
    const onChangeHandler = (e)=>{
        setData({
            [e.target.name]:e.target.value
        })
    }

    // Auth state
    const authState=useSelector(state=>state.auth);

    return (
        <DialogForm open={open} setOpen={setOpen} title={"Create Semester"} onCreateBtnHandler={()=>createSemester(authState,dispatch,data)}>
            <TextField id="standard-basic" label="Semester" name="name" value={data.name} onChange={onChangeHandler}/>
        </DialogForm>
    
    )
}

// Main subject form
export const SubjectForm = ({open,setOpen})=>{

    // name - name of subject
    // semester - id of semester
    // subject_teacher - id of teacher
    
    const initialData= {
        name:"",
        semester:null,
        subject_teacher:null

    }

    const authState=useSelector(state=>state.auth);
    const [data,setData]=useState(initialData);
    const classroomState=useSelector(state=>state.classroom);

    const dispatch=useDispatch()


    // Getting the name of the input and setting it to input_name:value
    const onChangeHandler=(e)=>{
        // Updating the data state
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const onCreateBtnHandler = ()=>{
        createSubject(authState,dispatch,data);
        setOpen(false);
    }

    return (
        
        <DialogForm open={open} setOpen={setOpen} title={"Create Subject"} onCreateBtnHandler={onCreateBtnHandler}>

            <FormControl>
                <TextField id="standard-basic" label="Subject" name="name" value={data.name} onChange={onChangeHandler}/>
            </FormControl>
            
            <FormControl>
                <InputLabel htmlFor="teacher">
                    Teacher
                </InputLabel>

                <Select id="teacher" onChange={onChangeHandler} name="subject_teacher" value={data.subject_teacher}>
                  { 
                    classroomState.teachers.map((teacher)=>(
                        <MenuItem value={teacher.pk}>{teacher.name}</MenuItem>
                    ))
                  }
                </Select>

            <FormControl>

                <InputLabel htmlFor="semester">
                    Semester
                </InputLabel>

                <Select id="semester" value={data.semester} name="semester" onChange={onChangeHandler}>
                   {
                       classroomState.semesters.map((semester)=>{
                            return <MenuItem value={semester.pk}>{semester.name}</MenuItem>
                       })
                   }
                </Select>

            </FormControl>

            </FormControl>


        </DialogForm>
    
    )
}
