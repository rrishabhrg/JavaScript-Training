/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid } from '@material-ui/core';
import { NavBar, Prompt, SideBar, Chips } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disable: true,
            location: '',
            selectedCountry: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            selectCity: {},
            countryList: {},
            tableList: {},
            cityList: {},
            paramsList: {},
            arrCheckBox: [],
            chipData: [{}],
        };
    }

    componentDidMount = async () => {
        console.log('component did mount');
        const token = localStorage.getItem('token');
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
            this.getRadioList(token);
            this.getCheckBoxList();
        }
    }

    handleClickOpen = () => {                                                      // Handler For Opening The Dialog For DropDown List Of Countries
        this.setState({
            open: true,
        });
    }

    handleCountrySelect = (event) => {                                             // Handler For Selecting The Country From DropDown List Of Countries
        // const { value } = this.props;
        // console.log('Value', value);
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            // value.onOpenSnackbar();
            this.setState({
                selectedCountry: selectedCountry,
            });
            this.handleClose();
            this.getTableData(selectedCountry);
            this.getRadioList(selectedCountry);
            this.getCheckBoxList();
            localStorage.setItem('token', event.target.value)
        }
    }

    handleClose = () => {                                                      // Handler For Closing The Dialog Of DropDown List After The Selection Of Country
        this.setState({
            open: false,
        });
    }

    getTableData = async (selectedCountry) => {                         // Handler For Retrieving Data Inside Table After The Selection Of Country From The DropDown
        console.log('table function');
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

    // getTableData(selectedCountry) {
    //     console.log('table function');
    //     return new Promise((resolve, reject) => {
    //         const method = 'get';
    //         const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry;
    //         const data = {};
    //         const res = callApi({ method, url, data }).then(() => {
    //             console.log('RESPONSE--response', res);
    //             this.setState({
    //                 tableList: res.data.results,
    //             });
    //             resolve();
    //         }).catch(err => {
    //             console.log('ERROR OCCURS---->', err);
    //             reject();
    //         });
    //     });
    // }

    getRadioList = async (selectedCountry) => {                          // Handler For Retrieving Data Inside SideBar(RadioGroup) After The Selection Of Country From The DropDown
        console.log('radio function');
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

    getCheckBoxList = async () => {                                      // Handler For Retrieving Data Inside SideBar(CheckBox) After The Selection Of Country From The DropDown
        console.log('checkbox function');
        const method = 'get';
        const url = 'https://api.openaq.org/v1/parameters';
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                paramsList: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    handleNavBarClickOpen = async () => {                                // Handler For Opening The DropDown Box If User Want To Change The Country
        console.log('NavBar Function Called.')
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

    handleOnChange = async (event) => {                                                  // Handler for RadioGroup
        const selectCity = event.target.value;
        const { selectedCountry, tableList, chipData } = this.state;
        let { arrCheckBox } = this.state;
        arrCheckBox.push({ label: selectCity })
        console.log('Chips Of Radio', chipData);
        console.log('Selected City Is', selectCity);
        this.setState({
            selectCity,
            disable: false,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity;
        const data = {};
        console.log('First');
        try {
            console.log('Second');
            const res = await callApi({ method, url, data });
            console.log('Third');
            console.log('Response After Selecting City From Radio', res);
            this.setState({
                tableList: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
        console.log('Selected City After Sometime Is', selectCity);
        console.log('222222-->table data', tableList ? tableList[0] : '');
    }

    handleClickChange = async (event) => {                                                // Handler for Checkbox
        const selectParam = event.target.value;
        const { selectedCountry, selectCity } = this.state;
        let { arrCheckBox } = this.state;
        if (arrCheckBox.filter(item => selectParam === item).length) {
            arrCheckBox.filter(item => selectParam !== item);
        } else {
            arrCheckBox.push({ label: selectParam })
        }
        this.setState({
            selectParam,
        },() => this.handleClickChange);
        console.log('Length Of My Array Is', arrCheckBox.length);
        console.log('My Array', this.state.arrCheckBox);
        console.log('selectParam', selectParam);
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

    handleSearch = async (event) => {                             // Handler for Searching
        const { location } = this.state;
        this.setState({
            location: event.target.value,
        });
        console.log('Searching For', location);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?location=' + location;
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

    handleDelete = () => {                                 // Handler For Deleting Chip
        const { chipData } = this.state;
        if (chipData.filter(item => item.label === item).length) {
            chipData.filter(item => item.label !== item);
        } else {
            chipData.push(item => item.label)
        }
    };

    render() {
        const { countryList, open, selectedCountry, tableList, cityList, paramsList, selectCity, selectParam, disable, arrCheckBox } = this.state;
        console.log('11111-->table data', tableList ? tableList[0] : '');
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
                <Chips
                    city={selectCity}
                    chips={arrCheckBox}
                    remove={this.handleDelete()}
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
                            show={disable}
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
