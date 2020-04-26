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


export const StateTable = (props) => {

  const [dailyData, setDailyData] = React.useState({ data: [] })

  const tableStyle = {
    borderColor: "black",
  }

  const classes = useStyles();


  const columns = [{
    Header: 'STATE',
    accessor: 'state',
    style: tableStyle
  },
  {
    Header: 'New Cases',
    accessor: 'deltaconfirmed',
    style: tableStyle
  },
  {
    Header: 'Active',
    accessor: 'active',
    style: tableStyle

  },
  {
    Header: 'Confirmed',
    accessor: 'confirmed',
    style: tableStyle

  },

  {
    Header: 'Recovered',
    accessor: 'recovered',
    style: tableStyle

  },

  {
    Header: 'Death',
    accessor: 'deaths',
    style: tableStyle

  },
  ]

  React.useEffect(() => {
    fetch(`https://api.covid19india.org/data.json`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDailyData({ ...dailyData, data: data["statewise"] })
      })
  }, [])

  return (
    <ReactTable columns={columns} data={dailyData.data} showPagination={true} defaultPageSize={10} className={classes.table}></ReactTable>
  )
}