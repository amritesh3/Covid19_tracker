import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "#303030",
        color: "#dddcdc",
        padding: "10px"
    },

    formControl: {
        margin: theme.spacing(2),
        backgroundColor: "#303030",
        color: "#dddcdc",
        width: 120,
        alignContent: "center",
        width: "50%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function DropDown(props) {

    const classes = useStyles();

    const [countryState, setCountryState] = React.useState({
        countryData: [],
    });

    React.useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/countries`)
            .then(res => res.json())
            .then(data => setCountryState({ ...countryState, countryData: data.countries.map(country => country.name) }))
    }, [])
    const handleChange = (event) => {
        props.handleCountryChange(event.target.value)
    };

    return (
        <FormControl variant="filled" className={classes.formControl}>
            {/* <Paper className={classes.paper}> */}
            <InputLabel htmlFor="country-native-simple" style={{ color: "#dddcdc" }}>Country</InputLabel>
            <Select
                native
                value={props.selectedCountry}
                onChange={handleChange}
                style={{ color: "#dddcdc" }}
            >
                <option aria-label="None" value="" disabled={true}></option>
                <option aria-label="None" value="">global</option>
                {countryState.countryData.map(countryName => <option value={countryName}>{countryName}</option>)}
            </Select>
            {/* </Paper> */}
        </FormControl>
    );
}

export default DropDown;