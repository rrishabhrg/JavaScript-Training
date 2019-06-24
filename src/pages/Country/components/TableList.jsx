/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TableDemo } from '../../../Components';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            page: 0,
            rowsPerPage: 10,
        };
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
        const {
            order, orderBy, page, rowsPerPage,
        } = this.state;
        const { tableData } = this.props;
        if (!tableData.length) {
            return (
                <CircularProgress />
            );
        }
        return (
            <React.Fragment>
                <TableDemo
                    id="id"
                    data={tableData}
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