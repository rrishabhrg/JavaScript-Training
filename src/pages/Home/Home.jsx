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
            open: false,
            countryList: {},
            tableList: {},
        };
    }

    componentDidMount = async () => {
        const token = localStorage.getItem('selectedCountry');
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
    
    handleCountrySelect = async (event) => {
        this.setState({
            selectCountry: event.target.value,
        });
        localStorage.setItem('selectedCountry', event.target.value);
        // alert("You're inside", this.state.selectedCountry);
        this.getTableData();
        this.handleClose();
    }

    getTableData = async () => {
        const { selectCountry } = this.state;
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

    render() {
        const { countryList, open, selectCountry, tableList, } = this.state;
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
                            sideBarData={tableList}
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
