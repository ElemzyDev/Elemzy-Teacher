import {Fragment} from "react";
import React from "react";
import Nav from "../components/Nav";
import {loadDashboardData} from "../actions/classroom";
import {useEffect} from "react";
import { useSelector} from "react-redux";
import {useDispatch} from 'react-redux';

import StudentList from "../components/StudentsList";
import TeacherActions from "../components/TeacherActions";
import {Grid} from "@material-ui/core";


export const TeacherDashboard = ()=>{
    const dispatch = useDispatch();

    const authState = useSelector(state => state.auth);
    const classRoomState=useSelector(state => state.classroom);
    
    console.log(classRoomState);

    useEffect(()=>{
        loadDashboardData(authState,dispatch);

    },['']);

    return (
        <Fragment>
            <Nav/>
            
            <Grid container>
                <Grid item sm={8} lg={8}>
                    <StudentList/>
                </Grid>

                {/* Teacher actions */}
                <Grid item sm>

                    <TeacherActions/>
                
                </Grid>
            </Grid>
        </Fragment>
    )
}