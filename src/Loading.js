import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const loadStyles=makeStyles(theme=>({
    loading: {
        display: "block",
        position: "fixed",
        top: "50%",
        right: "50%",
        zIndex: theme.zIndex.drawer,
      }
}))
export default function Loading(props){
    const classes=loadStyles();
    return(
        <CircularProgress
        color="secondary"
        size={80}
        thickness={2}
        className={classes.loading}
      />
      )
}