import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import darkUnica from "highcharts/themes/dark-unica";
import moment from 'moment';

// darkUnica(Highcharts);
darkUnica(Highcharts)
const useStyles = makeStyles({
    root: {
        width: "61.5%",
        height: "600px",
        paddingRight: "20px",
        backgroundColor: "#303030",
        color: "#dddcdc",

    },
    content: {
        marginTop: "30px"
    }
})


export const IncrementChart = (props) => {

    const classes = useStyles()

    const [dailyData, setDailyData] = React.useState({ data: [] })

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
                type: 'line',
                backgroundColor: "#303030",
                style: {
                    fontFamily: 'Sans-serif'
                }
            },
            rangeSelector: {
                allButtonsEnabled: true,
            },

            title: {
                text: "Daily increment of Global confirmed cases"
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
                data: data.map(record => [moment(record.reportDate).valueOf(), record.deltaConfirmed]),
                pointStart: moment(data[0].reportDate),
                tooltip: {
                    valueDecimals: 2
                }
            },
            ]
        }
        )

    }

    console.log(props.selectedCompany)
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                {dailyData.data.length &&
                    <HighchartsReact highcharts={Highcharts} options={createOptions(dailyData.data)} constructorType={"stockChart"} />}
            </CardContent>
        </Card>
    )
}