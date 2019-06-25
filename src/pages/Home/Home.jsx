import React from 'react';
import { Grid } from '@material-ui/core';
import { NavBar, Prompt, SideBar } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            selectCountry: localStorage.getItem('selectedCountry') ? localStorage.getItem('selectedCountry') : '',
            selectCity: '',
            selectParam: '',
            open: false,
            countryList: {},
            tableList: {}
        };
    }

    componentDidMount = async () => {
        const token = localStorage.getItem('selectedCountry');
        // console.log('TOKEN', token);
        // console.log(this.state.selectCountry);
        if (!token) {
            this.handleClickOpen();
            const method = 'get';
            const url = 'https://api.openaq.org/v1/countries';
            const data = {};
            try {
                const res = await callApi({ method, url, data });
                this.setState({
                    countryList: res.data.results,
                });
            } catch (error) {
                console.log('ERROR OCCURS---->', error);
            }
        } else {
            this.getTableData();
        }
    }
    
    handleCountrySelect = (event) => {
        this.setState({
            selectCountry: event.target.value,
        });
        localStorage.setItem('selectedCountry', event.target.value);
        this.handleClose();
        // alert("You're inside"+this.state.selectedCountry);
        this.getTableData();
    }

    getTableData = async () => {
        const { selectCountry } = this.state;
        console.log('Selected Country Inside getTableData', selectCountry);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectCountry;
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                tableList: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    handleNavBarClickOpen = async () => {
        const token = localStorage.getItem('selectedCountry');
        if (token) {
            localStorage.removeItem('selectedCountry');
            this.handleClickOpen();
            const method = 'get';
            const url = 'https://api.openaq.org/v1/countries';
            const data = {};
            try {
                const res = await callApi({ method, url, data });
                this.setState({
                    countryList: res.data.results,
                });
            } catch (error) {
                console.log('ERROR OCCURS---->', error);
            }
        } else {
            this.getTableData();
        }
    }

    handleOnChange = async (event) => {       // Handler for Radio
        const { selectCountry, selectCity } = this.state;
        console.log('Selected City Is', selectCity);
        console.log('Selected Event Is', event.target.value);
        this.setState({
            selectCity: event.target.value,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectCountry + '&city=' + selectCity;
        const data = {};
        console.log('First');
        try {
            console.log('Second');
            const res = await callApi({ method, url, data });
            console.log('Third');
            console.log('Response for radio', res);
            this.setState({
                tableList: res.data.results,
            });
            console.log('table data', this.state.tableList);
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    handleClickChange = async (event) => {       // Handler for Checkbox
        const { selectCountry, selectCity, selectParam } = this.state;
        // console.log('My Parameters Are:', selectParam);
        this.setState({
            selectParam: event.target.value,
        })
        // console.log('The Parameters Are:', selectParam);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectCountry + '&city=' + selectCity + '&parameter[]=' + selectParam;
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                tableList: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    render() {
        const { countryList, open, selectCountry, tableList, selectCity, selectParam } = this.state;
        // console.log('My Parameters Are:', selectParam);
        // console.log('table data', tableList);
        return (
            <React.Fragment>
                <NavBar
                    yourCountry={selectCountry}
                    dialogOpen={open}
                    countryData={countryList}
                    name={selectCountry}
                    close={this.handleClose}
                    change={this.handleCountrySelect}
                    ClickOpen={this.handleNavBarClickOpen}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Prompt
                            dialogOpen={open}
                            countryData={countryList}
                            name={selectCountry}
                            close={this.handleClose}
                            change={this.handleCountrySelect}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <SideBar
                            makeChange={this.handleOnChange}
                            doChange={this.handleClickChange}
                            city={selectCity}
                            param={selectParam}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TableList
                            tableData={tableList}
                        />
                    </Grid> 
                </Grid>
            </React.Fragment>
        )
    }
}

export default Home;
