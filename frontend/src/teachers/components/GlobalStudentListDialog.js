import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SchoolIcon from "@material-ui/icons/School";
import AddCircleIcon from "@material-ui/icons/AddCircle";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
    Paper,
    Typography,
    Grid,
    Icon,
    Button,
    IconButton,
  } from "@material-ui/core";


import { useSelector } from "react-redux";
import {useStyles} from "./styles/StudentsListStyles";

const GlobalStudentListDialog = ({ open, setOpen ,addRemoveStudentOnClick}) => {

    const globalStudents=useSelector(state=>state.classroom.globalStudents);
    const classes=useStyles();

  return (
    <div>
      <Dialog
        open={open}s
        onClose={(value) => setOpen(value)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <Grid container>
            <Grid item sm>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {globalStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          color="grey"
                          className={classes.globalStdName}
                        >
                          {student.name}
                        </Typography>
                      </TableCell>

                      <TableCell size="small" align="right">
                        <IconButton
                          data-student_id={student.id}
                          onClick={(event) =>
                            addRemoveStudentOnClick(event, "add_student")
                          }
                        >
                          <AddCircleIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(!open)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GlobalStudentListDialog;
