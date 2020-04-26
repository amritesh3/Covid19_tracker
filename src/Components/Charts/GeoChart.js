import React from 'react';
import Chart from "react-google-charts";
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { color } from 'highcharts';

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
    }
})

export const GeoChart = props => {

    const classes = useStyles();

    let cookedData = props.data.map(cases => [cases.countryRegion, props.data.filter(a => a.countryRegion === cases.countryRegion).reduce((prev, cur) => prev + cur.confirmed, 0)])

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="GeoChart"
                    data={
                        [['Country', 'Infected']].concat(cookedData)
                    }
                    options={{
                        datalessRegionColor: '#b9b9b9',
                        colorAxis: { colors: ['#dab08e', '#d1894e', '#c40000'] },
                        backgroundColor: "#303030",
                        color: "#dddcdc",
                        defaultColor: '#000000',
                    }}

                    chartEvents={[
                        {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                                const chart = chartWrapper.getChart();
                                const selection = chart.getSelection()[0];
                                if (selection.length === 0) return;
                                const region = cookedData[selection[0].row + 1];
                                console.log(selection);
                                alert("Selected : " + region);
                                props.handleCountryChange(region[0])
                                if (region[0] == "India") {
                                    let drilldownValue = "IN";

                                    // set region option, draw chart
                                    chartWrapper.setOption('region', drilldownValue);
                                    chartWrapper.draw();
                                }
                            }
                        }
                    ]}

                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    rootProps={{ 'data-testid': '1' }}
                />
            </CardContent>
        </Card>
    )
}
