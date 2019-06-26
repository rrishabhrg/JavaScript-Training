import React from 'react';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavBar, Prompt, SideBar } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            location: '',
            selectedCountry: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            selectCity: {},
            selectParam: {},
            countryList: {},
            tableList: {},
            cityList: {},
            paramsList: {},
        };
    }

    componentDidMount = async () => {
        console.log('home did mount');
        const token = localStorage.getItem('token');
        // console.log('TOKEN', token);
        // console.log(this.state.selectedCountry);
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
            this.getTableData(token);
            this.getSideBarData(token);
        }
    }

    handleNavBarClickOpen = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
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
        }
    }
    
    handleCountrySelect = (event) => {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            this.setState({
                selectedCountry: selectedCountry,
            });
            this.getTableData(selectedCountry);
            this.getSideBarData(selectedCountry);
            localStorage.setItem('token', event.target.value);
            this.handleClose();
        }
        
    }

    getTableData = async (selectedCountry) => {
        console.log('table function');
        // console.log('Selected Country Inside getTableData', selectedCountry);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry;
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

    getSideBarData = async (selectedCountry) => {
        console.log('sidebar function');
        const method = 'get';
        const url = 'https://api.openaq.org/v1/cities?country=' + selectedCountry;
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                cityList: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    handleOnChange = async (event) => {       // Handler for Radio
        const { selectedCountry, selectCity } = this.state;
        console.log('Selected City Is', selectCity);
        console.log('Selected Event Is', event.target.value);
        this.setState({
            selectCity: event.target.value,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity;
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
        const { selectedCountry, selectCity, selectParam } = this.state;
        // console.log('My Parameters Are:', selectParam);
        console.log('event.target.value for check_box-->:', event.target.value);
        this.setState({
            selectParam: event.target.value,
        })
        // console.log('The Parameters Are:', selectParam);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam;
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

    // handleSort = async (order, orderBy) => {          // Handler for Sorting
    //     if (order === 'asc') {
    //         this.setState({
    //             order: 'desc',
    //         });
    //     } else {
    //         this.setState({
    //             order: 'asc',
    //         });
    //     }
    // }

    handleSearch = async (event) => {          // Handler for Searching
        const { location } = this.state;
        this.setState({
            location: event.target.value,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/locations?location=' + location;
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

    render() {
        const { countryList, open, selectedCountry, tableList, selectCity, selectParam, cityList, paramsList } = this.state;
        // console.log('My Parameters Are:', selectParam);
        // console.log('table data', tableList);
        // console.log('ORDER', order);
        return (
            <React.Fragment>
                <NavBar
                    yourCountry={selectedCountry}
                    dialogOpen={open}
                    countryData={countryList}
                    name={selectedCountry}
                    close={this.handleClose}
                    change={this.handleCountrySelect}
                    ClickOpen={this.handleNavBarClickOpen}
                    makeSearch={this.handleSearch}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Prompt
                            dialogOpen={open}
                            countryData={countryList}
                            name={selectedCountry}
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
                            cities={cityList}
                            parameters={paramsList}
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
