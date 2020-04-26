import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
// darkUnica(Highcharts);

const useStyles = makeStyles({
    root: {
        height: "600px",
        paddingRight: "20px",
        backgroundColor:"#303030",
        color:"#dddcdc",

    },
    content: {
        marginTop: "30px"
    }
})


export const BarChart = (props) => {

    const classes = useStyles()

    const createOptions = (data,country) => {
        console.log(data)
        return ({
            chart: {
                type: 'column',
                backgroundColor:"#303030",
                style: {
                    fontFamily: 'Sans-serif'
                }
            },
            title: {
                text: 'Covid19 Impact on '+country
            },
            xAxis: {
                categories:  ['Deaths', 'Infected', 'Recovered']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Cases'
                },
            },
            legend: {
                align: 'right',
                x: -20,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{name:country,data:[data.deaths.value,data.confirmed.value,data.recovered.value]}]
        })
    }


    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>

                {console.log(props.data)}
                <HighchartsReact highcharts={Highcharts} options={createOptions(props.data,props.selectedCountry)} />
            </CardContent>
        </Card>
    )
}