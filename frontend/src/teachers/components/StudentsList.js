import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Icon,
  Button,
  IconButton,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

//Table Component Importing
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

// Dialog
import { useStyles } from "./styles/StudentsListStyles";

import GlobalStudentListDialog from "./GlobalStudentListDialog";

// Dispatch
import { useDispatch } from "react-redux";

// Actions import
import { addRemoveStudent } from "../actions/classroom";


function StudentsList() {
  const classes = useStyles();

  // States
  const classInfo = useSelector((state) => state.classroom);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // For dialog box
  const [open, setOpen] = useState(false);

  // Perforing add remove of student from classroom
  const addRemoveStudentOnClick = (event, actionType) => {

    const std_obj = {
      type: actionType,
      student_id: event.currentTarget.getAttribute("data-student_id"),
    };

    addRemoveStudent(authState, dispatch, std_obj);

  };


  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const slicedStudents=classInfo.students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Paper elevation={1} className={classes.root}>
        <div className="stdlist-head">
          {/* Container head */}
          <Grid container>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                Students
              </Typography>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                Class - {classInfo.classroom.standard}
              </Typography>
            </Grid>
          </Grid>

          {/* Students Table */}

          <Grid container>
            <Grid item sm>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody className={classes.studentsListBody}>

                  {slicedStudents.map((student) => (
                    <>
                      <TableRow>
                        <TableCell className={classes.stdNameCell}>{student.user_info.firstname}</TableCell>
                        <TableCell size="small" align="right">
                          <IconButton
                            data-student_id={student.student_profile.id}
                            onClick={(event) =>
                              addRemoveStudentOnClick(event, "remove_student")
                            }
                           className={classes.remove_btn}>
                            <RemoveCircleOutlineIcon color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}

                </TableBody>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  component="div"
                  count={classInfo.students.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}>

                </TablePagination>
              </Table>
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <Grid item sm></Grid>

          <Grid item>
            <Button
              onClick={() => setOpen(true)}
              color="primary"
              variant="contained"
            >
              Add Student
            </Button>
          </Grid>
        </Grid>

      </Paper>
      <GlobalStudentListDialog open={open} setOpen={setOpen} addRemoveStudentOnClick={addRemoveStudentOnClick}/>
    </div>
  );
}


export default StudentsList;
