import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
      minHeight: "60vh",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },

    // actionsBtnGroup:{
    //     width:"100%",
    //     display:"flex",
    //     justifyContent:"space-between"
    // }

  }));



  