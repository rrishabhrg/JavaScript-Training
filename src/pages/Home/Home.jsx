/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid } from '@material-ui/core';
import { NavBar, Prompt, SideBar, Chips } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';
import { SnackbarHOC } from '../../Contexts';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disable: true,
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
        // const { value } = this.props;      // For Opening SnackBar
        // console.log('Value-->', value);
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
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            this.setState({
                selectedCountry: selectedCountry,
            });
            this.handleClose();
            alert('Your Country Code Is: ' + selectedCountry);
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
        const { value } = this.props;      // For Opening SnackBar
        console.log('Value-->', value);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
                found: res.data.meta.found,
                page: 0,
                limit: res.data.meta.limit
            });
        });
    }

    getRadioList = (selectedCountry) => {                          // Handler For Retrieving Data Inside SideBar(RadioGroup) After The Selection Of Country From The DropDown
        const limitRadio = 10000;
        const method = 'get';
        const url = 'https://api.openaq.org/v1/cities?country=' + selectedCountry + '&limit=' + limitRadio;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                cityList: res.data.results,
            });
        });
    }

    getCheckBoxList = () => {                                      // Handler For Retrieving Data Inside SideBar(CheckBox) After The Selection Of Country From The DropDown
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
        const { selectedCountry } = this.state;
        let { chipData } = this.state;
        if (selectCity === '') {
            chipData.push({ label: selectCity });
        } else {
            chipData.pop({ label: selectCity });
            chipData.push({ label: selectCity });
        }
        this.setState({
            selectCity,
            disable: false,
        });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
        });
    }

    handleClickChange = (event) => {                                             // Handler for Checkbox
        const selectParam = event.target.value;
        const { selectedCountry, selectCity } = this.state;
        let { arrCheckBox, chipData } = this.state;
        if (arrCheckBox.filter(item => selectParam === item.label).length) {
            arrCheckBox.pop(item => selectParam !== item.label);
        } else {
            arrCheckBox.push({ label: selectParam })
        }
        if (chipData.filter(item => selectParam === item.label).length) {
            chipData.filter(item => selectParam !== item.label);
        } else {
            chipData.push({ label: selectParam });
        }
        this.setState({
            selectParam,
        },() => this.handleClickChange);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
        })
    }

    handleHasGeo = () => {                                                 // Handler For Has-Geo
        let { chipData } = this.state;
        chipData.push({ label: 'HASGEO' });
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements';
        const data = {};
        callApi({ method, url, data }).then((res) => {
            const response = res.data.results;
            console.log('HAS-GEO', response);
            if (!response) {
                return 'NO SUCH DATA AVAILABLE'
            } else {
                this.setState({
                    tableList: res.data.results,
                });
            }
        })
    }

    // handleSort = (sort, orderBy) => async () => {
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

    handleSort = (sort, orderBy) => () => {                             // Handler for Sorting
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
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&order_by[]=' + orderBy + '&sort[]=' + sort;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
        })
    }

    handleSearch = (event) => {                             // Handler for Searching
        const location = event.target.value;
        this.setState({
            location
        });
        console.log('Targeted Location Is', location);
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements?location=' + location;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
        })
    }

    // handleChangePage = () => {                                 // Handler For Pagination
    //     let { page, limit, selectedCountry } = this.state;
    //     this.setState({
    //         page: page + 1
    //     })
    //     const method = 'get';
    //     const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&page=' + page + '&limit=' + limit;
    //     const data = {};
    //     callApi({ method, url, data }).then((res) => {
    //         this.setState({
    //             tableList: res.data.results,
    //         });
    //     })
    // }

    handleChangePage = () => {                                 // Handler For Pagination
        let { page, limit, selectedCountry, selectCity, arrCheckBox, selectParam } = this.state;
        let url;
        this.setState({
            page: page + 1
        })
        console.log('length Is', arrCheckBox.length);
        console.log('Selected Item In CheckBox Is', selectParam);
        if (selectCity === '') {
            url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&page=' + page + '&limit=' + limit;
        } else if (selectCity !== '') {
            url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&page=' + page + '&limit=' + limit;
        } else if (arrCheckBox.length > 0) {
            url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam + '&page=' + page + '&limit=' + limit;
        }
        const method = 'get';
        // const url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&page=' + page + '&limit=' + limit;
        const data = {};
        callApi({ method, url, data }).then((res) => {
            this.setState({
                tableList: res.data.results,
            });
        })
    }

    handleDelete = chipToDelete => () => {                                 // Handler For Deleting Chip
        console.log('delete function is called');
        const { chipData } = this.state;
        if (chipData.filter(item => item.label === chipToDelete.label).length) {
            console.log('inside if statement');
            // chipData.pop(item => item.label !== chipToDelete.label);
            chipData.pop(item => item.label);
            // this.setState({
            //     // chipData: chipData.pop(item => item.label !== chipToDelete.label)
            //     chipData: chipData.pop(item => item.label)
            // });
            console.log('ChipData After Execution Of If Statement', chipData);
            console.log('Length Of Array In Delete Handler', chipData.length);
        }
    };

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
            chipData,
            sort,
            page,
            limit,
            found
        } = this.state;
        console.log('LIMIT', limit);
        console.log('ARR_CHIPDATA', chipData)
        console.log('Length Of ARR_CHIPDATA', chipData.length)
        console.log('ARR_CHECKBOX', this.state.arrCheckBox)
        console.log('Length Of ARR_CHECKBOX', this.state.arrCheckBox.length)
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
                    chipsArr={chipData}
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
                            city={selectCity}
                            param={selectParam}
                            cities={cityList}
                            parameters={paramsList}
                            show={disable}
                            doChange={this.handleClickChange}
                            makeChange={this.handleOnChange}
                            btnClick={this.handleHasGeo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TableList
                            tableData={tableList}
                            sortArrow={sort}
                            pages={page}
                            limits={limit}
                            founds={found}
                            sorting={this.handleSort}
                            pageChange={this.handleChangePage}
                        />
                    </Grid> 
                </Grid>
            </React.Fragment>
        )
    }
}

// export default Home;
export default SnackbarHOC(Home);
