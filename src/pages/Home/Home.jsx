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
            chipData: [],
            sort: 'asc',
            orderBy: 'value',
        };
    }

    componentDidMount() {
        console.log('component did mount');
        const token = localStorage.getItem('token');
        if (!token) {
            this.handleClickOpen();
            const method = 'get';
            const url = 'https://api.openaq.org/v1/countries';
            const data = {};
            callApi({ method, url, data }).then((res) => {
                this.setState({
                    countryList: res.data.results,
                });
            });
            
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

    getTableData = (selectedCountry) => {                         // Handler For Retrieving Data Inside Table After The Selection Of Country From The DropDown
        console.log('table function');
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            console.log('xxxxxxx', res);
            this.setState({
                tableList: res.data.results,
                found: res.data.meta.found,
                page: 0,
                limit: res.data.meta.limit
            });
            console.log("Page Is", this.state.page);
        });
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

    getRadioList = (selectedCountry) => {                          // Handler For Retrieving Data Inside SideBar(RadioGroup) After The Selection Of Country From The DropDown
        console.log('radio function');
        const method = 'get';
        const url = 'https://api.openaq.org/v1/cities?country=' + selectedCountry;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                cityList: res.data.results,
            });
        });
    }

    getCheckBoxList = () => {                                      // Handler For Retrieving Data Inside SideBar(CheckBox) After The Selection Of Country From The DropDown
        console.log('checkbox function');
        const method = 'get';
        const url = 'https://api.openaq.org/v1/parameters';
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                paramsList: res.data.results,
            });
        });
    }

    handleNavBarClickOpen = () => {                                // Handler For Opening The DropDown Box If User Want To Change The Country
        console.log('NavBar Function Called.')
        this.handleClickOpen();
        const method = 'get';
        const url = 'https://api.openaq.org/v1/countries';
        const data = {};
            callApi({ method, url, data }).then((res) => {
                this.setState({
                    countryList: res.data.results,
                });
            });
    }

    handleOnChange = (event) => {                                                  // Handler for RadioGroup
        const selectCity = event.target.value;
        const { selectedCountry, tableList } = this.state;
        let { chipData } = this.state;
        if (selectCity === '') {
            chipData.push({ label: selectCity });
        } else {
            chipData.pop({ label: selectCity });
            chipData.push({ label: selectCity });
        }
        
        console.log('Selected City Is', selectCity);
        this.setState({
            selectCity,
            disable: false,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity;
        const data = {};
        console.log('First');
            console.log('Second');
            callApi({ method, url, data }).then((res) => {
                console.log('Third');
                // console.log('Response After Selecting City From Radio', res);
                this.setState({
                    tableList: res.data.results,
                });
            });
        console.log('Selected City After Sometime Is', selectCity);
        console.log('222222-->table data', tableList ? tableList[0] : '');
    }

    handleClickChange = (event) => {                                          // Handler for Checkbox
        const selectParam = event.target.value;
        const { selectedCountry, selectCity } = this.state;
        let { arrCheckBox, chipData } = this.state;
        if (arrCheckBox.filter(item => selectParam === item).length) {
            arrCheckBox.filter(item => selectParam !== item);
        } else {
            arrCheckBox.push({ label: selectParam })
        }
        if (chipData.filter(item => selectParam === item).length) {
            chipData.filter(item => selectParam !== item);
        } else {
            chipData.push({ label: selectParam });
        }
        this.setState({
            selectParam,
        },() => this.handleClickChange);
        console.log('Length Of My Array Is', arrCheckBox.length);
        console.log('My Array', arrCheckBox);
        console.log('selectParam', selectParam);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
    })
    }

    // handleSort = (sort, orderBy) => async () => {                             // Handler for Sorting
    //     const { selectedCountry } = this.state;
    //     console.log('Selected event for sorting is', orderBy);
    //     if (sort === "asc") {
    //         this.setState({
    //             sort: "desc"
    //         });
    //     } else {
    //         this.setState({
    //             sort: "asc"
    //         });
    //     }
    //     console.log("Sorting direction is", sort);
    //     const method = 'get';
    //     const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&order_by[]=' + orderBy + '&sort[]=' + sort;
    //     const data = {};
    //     try {
    //         const res = await callApi({ method, url, data });
    //         this.setState({
    //             tableList: res.data.results,
    //         });
    //         console.log('The Table Data Inside Sorting Handler', this.state.tableList);
    //     } catch (error) {
    //         console.log('ERROR OCCURS---->', error);
    //     }
    // }

    handleSort = (sort, orderBy) => () => {
        const { selectedCountry } = this.state;
        if (sort === "asc") {
            this.setState({
                sort: "desc"
            });
        } else {
            this.setState({
                sort: "asc"
            });
        }
        // return new Promise((resolve, reject) => {
            const method = 'get';
            const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&order_by[]=' + orderBy + '&sort[]=' + sort;
            const data = {};
            callApi({ method, url, data }).then((res) => {
                console.log('RESPONSE--response', res);
                this.setState({
                    tableList: res.data.results,
                });
                // resolve();
            }).catch(err => {
                console.log('ERROR OCCURS---->', err);
                // reject();
            });
        // });
    }

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

    handleChangePage = async () => {                                 // Handler For Pagination
        let { page, limit, selectedCountry } = this.state;
        console.log("Page Before Evaluation Is", page);
        console.log("Limit Before Evaluation Is", limit);
        this.setState({
            page: page + 1
        })
        console.log("Page After Evaluation Is", page);
        console.log("Limit After Evaluation Is", limit);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&page=' + page + '&limit=' + limit;
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

    handleDelete = (data) => {                                 // Handler For Deleting Chip
        const { chipData } = this.state;
        if (chipData.filter(item => item.label === item).length) {
            chipData.filter(item => item.label !== item);
        }
    }

    handleHasGeo = async () => {                                // Handler For Has-Geo
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements';
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            const response = res.data.results;
            if (!response) {
                return 'NO SUCH DATA AVAILABLE'
            } else {
                this.setState({
                    tableList: res.data.results,
                });
            }
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    render() {
        const {
            countryList,
            open,
            selectedCountry,
            tableList,
            cityList,
            paramsList,
            selectCity,
            selectParam,
            disable,
            arrCheckBox,
            chipData,
            sort,
            page,
            limit,
            found
        } = this.state;
        console.log('11111-->table data', tableList ? tableList[0] : '');
        // console.log("Chip-->", chipData);
        // console.log("Length Of CheckBox Array-->", arrCheckBox.length);
        // console.log("Array Of CheckBox-->", arrCheckBox);
        // console.log("Page In Render Is", this.state.page);
        // console.log('The Table Data Inside Render', tableList);
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
                    chips={chipData}
                    remove={this.handleDelete}
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
                            btnClick={this.handleHasGeo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TableList
                            tableData={tableList}
                            sorting={this.handleSort}
                            sortArrow={sort}
                            pages={page}
                            limits={limit}
                            founds={found}
                            pageChange={this.handleChangePage}
                        />
                    </Grid> 
                </Grid>
            </React.Fragment>
        )
    }limits
}

export default Home;
