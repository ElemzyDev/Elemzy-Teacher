import React from "react";
import {makeStyles} from "@material-ui/core";
import {AppBar,Toolbar,IconButton,Grid,InputBase,Badge,Typography,CssBaseline} from "@material-ui/core";
import NotificationNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';


// React redux
import {useSelector} from "react-redux";

const useStyles=makeStyles({

  toolbar:{
    minHeight:"50px"
  },

  root:{
    backgroundColor:"#fff",
    color:"black"
  }


})

const Nav = () => {

  const classes=useStyles();
  const userInfo=useSelector(state=>state.auth);
  const classInfo=useSelector(state=>state.classRoom);

  return (
    <>

    <CssBaseline/>

    <AppBar position="static" className={classes.root}>

      <Toolbar className={classes.toolbar}>

          <Grid container>

            <Grid item>
              1
            </Grid>

            <Grid item sm>
              2
            </Grid>

            <Grid item>
              3
            </Grid>

          </Grid>
        
      </Toolbar>
    
    </AppBar>


    </>

  )
}



export default Nav;