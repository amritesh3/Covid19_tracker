import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css';
import { apiUrl, header } from '../../Constant'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { StateTable } from './IndianStateTable'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        width: "95%",
        marginTop: "20px",
        marginLeft: "40px",
        height: "600px",
        backgroundColor: "#303030",
        color: "#dddcdc",
    },
    table: {
        backgroundColor: "#303030",
        color: "#dddcdc",
    },
    content: {
        marginTop: "30px"
    }
}))


export const Table = (props) => {


    const [dailyData, setDailyData] = React.useState({ data: [] })

    const tableStyle = {
        borderColor: "black",
    }

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    const columns = [{
        Header: 'Name',
        accessor: 'country',
        style: tableStyle
    },
    {
        Header: 'New Cases',
        accessor: 'cases.new',
        style: tableStyle
    },
    {
        Header: 'Active',
        accessor: 'cases.active',
        style: tableStyle

    },
    {
        Header: 'Confirmed',
        accessor: 'cases.total',
        style: tableStyle

    },

    {
        Header: 'Recovered',
        accessor: 'cases.recovered',
        style: tableStyle

    },

    {
        Header: 'Death',
        accessor: 'deaths.total',
        style: tableStyle

    },
    ]

    React.useEffect(() => {
        fetch(`${apiUrl}/statistics`, { headers: header })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDailyData({ ...dailyData, data: data["response"] })
            })
    }, [])

    return (<div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="black"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Indian State Data" {...a11yProps(0)} />
                <Tab label="World Country Data" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <StateTable />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <ReactTable columns={columns} data={dailyData.data} showPagination={true} defaultPageSize={10} className={classes.table}></ReactTable>
            </TabPanel>
        </SwipeableViews>
    </div>



    )
}