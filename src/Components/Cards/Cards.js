import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';

export default function Cards(props) {

    const useStyles = makeStyles({
        root: {
            width: "30%",
            borderBottom:"7px solid "+props.color,
            backgroundColor:"#303030",
            color:"#dddcdc",          
        },
        media: {
            height: "10px",
        },
        global:{
            marginTop:"4px",
            display : props.data?"block":"none",
            borderTop:"1.25px solid #888888",
            paddingTop:"20px",
            letterSpacing:"3px",
        }
    });

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="h3" color={props.name==="Death"?"error":"initial"}>
                    {console.log(props.data)}
                    <CountUp start={0} end={props.data?props.data.value:props.globalData.value} separator=","/>
                </Typography>
                <Typography variant="body2" component="p">
                    {new Date(props.lastUpdate).toDateString()}
                </Typography>
                <Typography variant="subtitle1">
                    Number of {props.name} cases
                </Typography>
                <Typography variant="h4" className={classes.global}>
                    <Divider light={true} variant={"inset"}/>
                    {props.globalData.value}
                </Typography>
            </CardContent>
        </Card>
    );
}