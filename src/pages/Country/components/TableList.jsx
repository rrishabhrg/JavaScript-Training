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
  getDateFormatted = () => {
    return moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    const {
      tableData,
      sorting,
      sortArrow,
      pages,
      limits,
      founds,
      pageChange
    } = this.props;
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
          onSort={sorting}
          arrowDirection={sortArrow}
          onSelect={this.handleSelect}
          noPage={pages}
          noLimit={limits}
          noFound={founds}
          changePage={pageChange}
        />
      </React.Fragment>
    );
  }
}

export default TableList;
