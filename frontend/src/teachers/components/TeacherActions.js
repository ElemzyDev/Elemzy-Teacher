import React,{useState} from 'react';
import {Typography,Grid,Paper,Button,ButtonGroup,TextField,InputLabel,Select,MenuItem} from "@material-ui/core";
import {useStyles} from "./styles/TeacherActionStyles";
import {SemesterForm,SubjectForm} from "./Form";

import {FormControl} from "@material-ui/core"


function TeacherActions() {

    const classes=useStyles();

    const [semesterFormOpen,setSemesterFormOpen] = useState(false);
    const [subjectFormOpen,setSubjectFormOpen] = useState(false);

    return (
        <Paper elevation={1} className={classes.root}>

            <Typography variant="h6" component="div">
                Teacher Actions
            </Typography>

            <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group" size="small" fullWidth={true}>
                <Button onClick={()=>setSemesterFormOpen(true)}>Create Semester</Button>
                <Button onClick={()=>setSubjectFormOpen(true)}>Create Subject</Button>
            </ButtonGroup>



            <SemesterForm open={semesterFormOpen} setOpen={setSemesterFormOpen}/>
            <SubjectForm open={subjectFormOpen} setOpen={setSubjectFormOpen}/>
            
        </Paper>
    )
}
export default TeacherActions;
