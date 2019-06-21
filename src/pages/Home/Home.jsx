import React from 'react';
import { NavBar, Prompt, SideBar } from '../../Components';
import { TableList } from '../Country';
import { callApi } from '../../lib';
import { Grid } from '@material-ui/core';

class Home extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            countryList: {},
            selectedCountry: localStorage.getItem('selectedCountry') ? localStorage.getItem('selectedCountry') : '',
            open: false,
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
                console.log('Response for countries in dropdown box is', res);
                this.setState({
                    countryList: res.data.results,
                });
                console.log('Dropdown list is', this.state.countryList);
            } catch (error) {
                console.log('ERROR OCCURS---->', error);
            }
        } else {
            this.getTableData();
        }
    }
    
    handleCountrySelect = async (event) => {
        this.setState({
            selectedCountry: event.target.value,
        });
        localStorage.setItem('selectedCountry', event.target.value);
        this.getTableData();
        this.handleClose();
    }

    getTableData = async () => {
        const method = 'get';
        const url = 'https://api.openaq.org/v1/measurements';
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            console.log('Response for data in table is', res);
            this.setState({
                tableList: res.data.results,
            });
            console.log('Table data is', this.state.tableList);
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
        const { countryList, open, selectedCountry, tableList } = this.state;
        return (
            <React.Fragment>
                <NavBar/>
                <Prompt
                    dialogOpen={open}
                    countryData={countryList}
                    name={selectedCountry}
                    close={this.handleClose}
                    change={this.handleCountrySelect}
                />
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={10}>
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
