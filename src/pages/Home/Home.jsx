import React from 'react';
import { Grid } from '@material-ui/core';
import { NavBar, Prompt, SideBar, Chips } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';
// import { SnackbarHOC } from '../../Contexts';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disable: true,
            location: '',
            selectedCountry: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            selectCity: {},
            selectParam: [],
            countryList: {},
            tableList: {},
            cityList: {},
            paramsList: {},
            chipData: [
                { key: 0, label: 'Angular' },
                { key: 1, label: 'jQuery' },
                { key: 2, label: 'Polymer' },
                { key: 3, label: 'React' },
                { key: 4, label: 'Vue.js' },
                { key: 5, label: 'JAVA' },
                { key: 6, label: 'Python' },
                // chipData.push({ key: 200, label: 'Mahesh' });
            ]
        };
    }

    componentDidMount = async () => {
        console.log('component did mount');
        const token = localStorage.getItem('token');
        console.log('right now token is', token);
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

    handleNavBarClickOpen = async () => {
        console.log('NavBar Function Called.')
        const token = localStorage.getItem('token');
        if (token) {
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
        // const { value } = this.props;
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            this.setState({
                selectedCountry: selectedCountry,
            });
            this.handleClose();
            this.getTableData(selectedCountry);
            this.getRadioList(selectedCountry);
            this.getCheckBoxList();
            localStorage.setItem('token', event.target.value);
            // value.onOpenSnackbar('xssxs');
        }
    }

    getTableData = async (selectedCountry) => {
        console.log('table function');
        // console.log('Selected Country Inside getTableData', selectedCountry);
        // const { value } = this.props;
        // value.onOpenSnackbar('xssxs');
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

    getRadioList = async (selectedCountry) => {
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

    getCheckBoxList = async () => {
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

    handleOnChange = async (event) => {       // Handler for Radio
        const { selectedCountry, tableList, chipData } = this.state;
        const selectCity = event.target.value;
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
            this.setState({
                tableList: res.data.results,
                chipData: chipData.push({ key: 7, label: 'C++' }),
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
        console.log('Selected City After Sometime Is', selectCity);
        console.log('222222-->table data', tableList);
    }

    handleClickChange = async (event) => {       // Handler for Checkbox
        const { selectedCountry, selectCity, check } = this.state;
        const selectParam = event.target.value;
        console.log('Selected City When Checkbox Executed Is', selectCity);
        this.setState({
            selectParam,
        })
        console.log('Dhoni-->', selectParam);
        console.log('Yuvraj-->', selectParam.length);
        if (check) {
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

    handleDelete = chipToDelete => () => {
        this.setState({
            chipData: (value => value.filter(chip => chip.key !== chipToDelete.key))
        });
    };

    render() {
        const { countryList, open, selectedCountry, tableList, cityList, paramsList, selectCity, selectParam, disable, chipData } = this.state;
        console.log('11111-->table data', tableList);
        console.log('#####-->chip data', chipData);
        if (!(chipData.length)) {
            return <div>Loading....</div>
        }
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
// export default SnackbarHOC(withStyles(styles)(Home));
// export default SnackbarHOC(Home);
