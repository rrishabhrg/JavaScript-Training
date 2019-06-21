/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { TableDemo, Prompt } from '../../../Components';
import { CountryList } from '../Data';
import { callApi } from '../../../lib';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            page: 0,
            rowsPerPage: 10,
            list: {},
            open: false,
            tableList: {},
        };
    }

    componentDidMount = async () => {
        this.handleClickOpen();
        const method = 'get';
        const url = 'https://api.openaq.org/v1/countries';
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                list: res.data.results,
            });
            console.log('Country Response Is', res);
            if (res) {
                localStorage.setItem('SelectedCountry', res.data.results.name);
            }
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleCountryChange = async (event) => {
        this.setState({
            name: event.target.value,
        });
        const method = 'get';
        // const url = 'https://api.openaq.org/v1/measurements?country=IN';
        const url = 'https://api.openaq.org/v1/measurements';
        const data = {};
        try {
            const res = await callApi({ method, url, data });
            this.setState({
                tableList: res.data.results,
            });
            const { tableList } = this.state;
            console.log('My List Is---->', tableList);
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    handleSort = (order, orderBy) => () => {
        if (order === 'asc') {
            this.setState({
                order: 'desc',
            });
        } else {
            this.setState({
                order: 'asc',
            });
        }
    }

    handleChangePage = (page, rowsPerPage) => {
        if (page <= rowsPerPage) {
            this.setState({
                page: page + rowsPerPage,
                rowsPerPage: rowsPerPage + rowsPerPage,
            });
        }
    }

    getDateFormatted = () => {
        return moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    }

    render() {
        const { match } = this.props;
        const {
            order, orderBy, page, rowsPerPage, list, open, name, tableList,
        } = this.state;
        if (!list.length) {
            return (
                <CircularProgress />
            );
        }
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <div style={{ width: '25%' }}>
                            <h3>Filters</h3>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel>City</FormLabel>
                                    <RadioGroup
                                        aria-label="Gender"
                                        name="gender1"
                                        // className={classes.group}
                                        // value={value}
                                        // onChange={handleChange}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="ABC" />
                                        <FormControlLabel value="male" control={<Radio />} label="PQR" />
                                        <FormControlLabel value="other" control={<Radio />} label="XYZ" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset">
                                    <FormLabel>Parameters</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox value="gilad" />}
                                            label="GiladGray"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="jason" />}
                                            label="JasonKillian"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="antoine" />
                                            }
                                            label="AntoineLlorca"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">HasGeo</FormLabel>
                                </FormControl>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Prompt
                            dialogOpen={open}
                            countryData={list}
                            close={this.handleClose}
                            change={this.handleCountryChange}
                            name={name}
                        />
                        <TableDemo
                            id="id"
                            data={tableList}
                            columns={[
                                {
                                    field: 'city',
                                    label: 'City',
                                },
                                {
                                    field: 'location',
                                    label: 'Location',
                                },
                                {
                                    field: 'parameter',
                                    label: 'Parameter',
                                },

                                {
                                    field: 'value',
                                    label: 'Value',
                                },
                                {
                                    field: 'unit',
                                    label: 'Unit',
                                },
                                {
                                    field: 'createdAt',
                                    label: 'Date',
                                    format: this.getDateFormatted,
                                },
                            ]}
                            orderBy={orderBy}
                            order={order}
                            onSort={this.handleSort}
                            onSelect={this.handleSelect}
                            count={100}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={this.handleChangePage}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default TableList;
