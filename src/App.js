import React from 'react';
import Cards from './Components/Cards/Cards';
import DropDown from './Components/DropDown/DropDown';
import { Chart } from './Components/Charts/Charts';
import LocationCards from './Components/Cards/LocationCard';
import { IncrementChart } from './Components/Charts/IncrementChart';
import { GeoChart } from './Components/Charts/GeoChart';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Loading from './Loading';
import { Table } from './Components/Table/Table'


const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "50px"
  },
  chartContainer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-evenly",
  }
})

function App() {

  const classes = useStyle()

  const [globalData, setGlobalData] = React.useState({
    overviewData: {},
    mapData: [],
    countryData: [],
    countryStats: [],
    location: "",
    loading: true,
    selectedCountry: "",
    country: ""
  })

  React.useEffect(() => {
    Promise.all([fetch(`https://covid19.mathdro.id/api`)
      .then(res => res.json()),
    fetch(`https://covid19.mathdro.id/api/confirmed`)
      .then(res => res.json()),
    fetch(`https://ipapi.co/json/`)
      .then(res => res.json())])
      .then(([data, mapData, ipDetails]) => {
        console.log(ipDetails)
        setGlobalData({ ...globalData, overviewData: data, mapData, location: ipDetails.country_name, countryCode: ipDetails.country_code, loading: false })
      }
      )
  }, [])

  const handleCountryChange = (para) => {
    console.log(para)
    Promise.all([fetch(`https://pomber.github.io/covid19/timeseries.json`)
      .then(res => res.json()),
    fetch(`https://covid19.mathdro.id/api/${para ? "countries/" + para : ""}`)
      .then(res => res.json())])
      .then(([data, stats]) => {
        console.log(stats);
        setGlobalData({
          ...globalData,
          countryData: data[para],
          countryStats: stats,
          selectedCountry: para
        })
      })
  };

  return (
    <>
      {!globalData.loading ? (
        <>
          {console.log(globalData.countryData)}
          <div className={classes.container}>
            <Cards name={"Infected"} globalData={globalData.overviewData.confirmed} data={globalData.countryStats.confirmed} lastUpdate={globalData.overviewData.lastUpdate} color={"blue"} />
            <Cards name={"Death"} globalData={globalData.overviewData.deaths} data={globalData.countryStats.deaths} lastUpdate={globalData.overviewData.lastUpdate} color={"red"} />
            <Cards name={"Recovered"} globalData={globalData.overviewData.recovered} data={globalData.countryStats.recovered} lastUpdate={globalData.overviewData.lastUpdate} color={"green"} />
          </div>
          <DropDown handleCountryChange={handleCountryChange} selectedCountry={globalData.selectedCountry} />
          <div className={classes.chartContainer}>
            <Chart data={globalData.overviewData} countryData={globalData.countryData} selectedCountry={globalData.selectedCountry} />
            <GeoChart data={globalData.mapData} handleCountryChange={handleCountryChange} />
          </div>
          <Table />
          <div className={classes.chartContainer}>
            <IncrementChart selectedCountry={globalData.selectedCountry} />
            <LocationCards location={globalData.location} countryCode={globalData.countryCode} />
          </div>
        </>) : <Loading />}
    </>
  );
}

export default App;
