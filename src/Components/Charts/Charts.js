import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import Highcharts, { Axis } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import darkUnica from "highcharts/themes/dark-unica";
import moment from 'moment';
import { BarChart } from './BarChart';
import Button from '@material-ui/core/Button';
// darkUnica(Highcharts);
darkUnica(Highcharts)
const useStyles = makeStyles({
    root: {
        width: "45%",
        height: "600px",
        paddingRight: "20px",
        backgroundColor: "#303030",
        color: "#dddcdc",

    },
    content: {
        marginTop: "30px"
    },
    button: {
        width: "50%",
        marginTop: "0px"
    }
})


export const Chart = (props) => {

    const classes = useStyles()

    const [dailyData, setDailyData] = React.useState({ data: [], graphStyle: "line" })

    React.useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/daily`)
            .then(res => res.json())
            .then(data => setDailyData({ ...dailyData, data }))
    }, [])


    const createOptions = (data) => {
        console.log(data)
        return ({
            chart: {
                height: 550,
                type: dailyData.graphStyle,
                backgroundColor: "#303030",
                style: {
                    fontFamily: 'Sans-serif'
                }
            },
            rangeSelector: {
                allButtonsEnabled: true,
            },

            yAxis: {
                lineWidth: 1,
                opposite: false,
            },

            legend: {
                enabled: true
            },


            series: [{
                name: 'infected',
                color: '#0066FF',
                data: data.map(record => [moment(props.selectedCountry ? record.date : record.reportDate).valueOf(), props.selectedCountry ? record.confirmed : record.totalConfirmed]),
                pointStart: moment(props.selectedCountry ? data[0].date : data[0].reportDate),
                tooltip: {
                    valueDecimals: 2
                }
            },
            {
                name: 'death',
                color: '#df232c',
                data: data.map(record => [moment(props.selectedCountry ? record.date : record.reportDate).valueOf(), props.selectedCountry ? record.deaths : record.deaths.total]),
                pointStart: moment(props.selectedCountry ? data[0].date : data[0].reportDate),
                tooltip: {
                    valueDecimals: 2
                }
            }
            ]
        }
        )

    }

    console.log(props.selectedCountry)
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Button variant="contained" color="primary" onClick={() => setDailyData({ ...dailyData, graphStyle: "column" })} className={classes.button}>
                    Bar
                </Button>
                <Button variant="contained" color="primary" onClick={() => setDailyData({ ...dailyData, graphStyle: "line" })} className={classes.button}>
                    Line
                </Button>
                {console.log(!props.selectedCountry)}
                {dailyData.data.length &&
                    <HighchartsReact highcharts={Highcharts} options={createOptions(props.selectedCountry ? props.countryData : dailyData.data)} constructorType={"stockChart"} />}
            </CardContent>
        </Card>
    )
}