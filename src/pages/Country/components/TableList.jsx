/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';
import { TableDemo } from '../../../Components';
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
        };
    }

    componentDidMount = async () => {
        const method = 'get';
        const url = 'https://api.openaq.org/v1/cities';
        const data = {};
        try {
            console.log('This is try block');
            const res = await callApi({ method, url, data });
            console.log('The response is:', res);
            // console.log('The list is:', res.data.results[0]);
            // console.log('The list is:', res.data.results[10]);
            this.setState({
                list: res.data.results,
            });
        } catch (error) {
            console.log('ERROR OCCURS---->', error);
        }
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
            order, orderBy, page, rowsPerPage, openEdit, openDelete, btnDisabled, Errors, list,
        } = this.state;
        return (
            <React.Fragment>
                <TableDemo
                    id="id"
                    data={CountryList}
                    // data={list}
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
            </React.Fragment>
        );
    }
}

export default TableList;
