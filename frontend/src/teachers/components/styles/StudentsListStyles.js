import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
      minHeight: "60vh",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between"
    },
    
    actionBtn:{
        fontSize:"0.8rem",
        lineHeight:"None",
        borderRadius:"0.2rem",
        fontWeight:"bold"
    },
    globalStdName:{
        color:"grey",
        
    },

    // {Table body}
    studentsListBody:{  
      minxHeight:"50rem",
      overflow:"scroll",

      "& .MuiTableCell-root":{
        padding:"2px"
      }

    },


    remove_btn:{
      padding:"0px"  
    },

    stdNameCell:{
      color: "#5a5959"
    }
  
  
  }));

  