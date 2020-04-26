import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Flag from 'react-world-flags';



export default function LocationCards(props) {

    const useStyles = makeStyles({
        root: {
            width: "30%",
            backgroundColor: "#303030",
            color: "#dddcdc",
            height: "600px"
        },
        media: {
            margin: "0px",
            padding: "0 px",
            opacity: 0.5,
        },
    });

    const classes = useStyles();

    const [locationData, setLocationData] = React.useState({
        data: []
    })

    React.useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/countries/${props.countryCode}/deaths`).then(res => res.json())
            .then(data => {
                console.log(data)
                setLocationData({ ...locationData, data: data })
            })

    }, [])

    return (
        <Card className={classes.root}>
            <CardContent>
                <Flag code={props.countryCode} className={classes.media} />
                <Typography gutterBottom variant="h5" component="h2">
                    Your current location : {props.location}
                </Typography>
                <Typography gutterBottom variant="h4" component="h2">
                    Statistics for {props.location}
                    <hr />
                </Typography>
                {locationData.data.length &&
                    (<><Typography variant="h5">
                        Confirmed : {locationData.data[0].confirmed}
                    </Typography>
                        <Typography variant="h5" component="p">
                            Death : {locationData.data[0].deaths}
                        </Typography>
                        <Typography variant="h5">
                            Recovered : {locationData.data[0].recovered}
                        </Typography>
                        <Typography variant="h5">
                            Active : {locationData.data[0].active}
                        </Typography></>)}
            </CardContent>
        </Card>
    );
}