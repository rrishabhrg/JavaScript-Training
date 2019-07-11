/* eslint-disable no-unused-vars */
import React from 'react';
import { withApollo } from "react-apollo";
import { Grid } from '@material-ui/core';
import { NavBar, Prompt, SideBar, Chips } from '../../Components';
import { TableList } from '../Country';
import { callApi, CITIES, COUNTRIES, FETCHES, LATEST, LOCATIONS, MEASUREMENTS, PARAMETERS, SOURCES } from '../../lib';
import { config } from '../../config';
import {
  COUNTRY_LIST,
  CITY_LIST,
  PARAMETERS_LIST,
  TABLE_DATA,
  TABLE_DATA_RADIO,
  TABLE_DATA_CHECK,
  TABLE_DATA_HASGEO,
  TABLE_DATA_SORT,
  TABLE_DATA_SEARCH
} from '../../ApolloServer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disable: true,
      selectedCountry: localStorage.getItem('token'),
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
    const token = localStorage.getItem('token');
    if (!token) {
      this.handleNavBarClickOpen();
    } else {
      this.getTableData(token);
      this.getRadioList(token);
      this.getCheckBoxList();
    }
  }

  handleClickOpen = () => {       // Handler For Opening The Dialog For DropDown List Of Countries
    this.setState({
      open: true
    })
  }

  handleCountrySelect = (event) => {       // Handler For Selecting The Country From DropDown List Of Countries
    const selectedCountry = event.target.value;
    this.setState({
      selectedCountry
    })
    this.handleClose();
    alert('Your Country Code Is: ' + selectedCountry);
    this.getTableData(selectedCountry);
    this.getRadioList(selectedCountry);
    this.getCheckBoxList();
    localStorage.setItem('token', event.target.value)
  }

  handleClose = () => {       // Handler For Closing The Dialog Of DropDown List After The Selection Of Country
    this.setState({
      open: false
    })
  }

  // getTableData = (selectedCountry) => {       // Handler For Retrieving Data Inside Table After The Selection Of Country From The DropDown
  //   const { tableList } = this.state;
  //   const uri = MEASUREMENTS + '?country=' + selectedCountry;
  //   const url = config.URL + uri;
  //   this.setState({
  //     tableList
  //   }, () => this.handleCallApi(url))
  // }

  handleCallApi = (url) => {       // Handler for API call.
    const method = 'get';
    const data = {};
    callApi({ method, url, data }).then((res) => {
      this.setState({
        tableList: res.data.results,
        found: res.data.meta.found,
        page: 0,
        limit: res.data.meta.limit
      })
    })
  }

  getTableData = async (selectedCountry) => {
    const { client } = this.props;
    const response = await client.query({
      query: TABLE_DATA,
      variables: { countryToken: selectedCountry }
    })
    console.log('TABLE DATA ARE', response);
    this.setState({
      tableList: response.data.tableNew
    })
  }

  getRadioList = async (selectedCountry) => {       // Handler For Retrieving Data Inside SideBar(RadioGroup) After The Selection Of Country From The DropDown
    // const limitRadio = 10000;
    // const method = 'get';
    // const uri = CITIES + '?country=' + selectedCountry + '&limit=' + limitRadio;
    // const url = config.URL + uri;       //  https://api.openaq.org/v1/cities?country=selectedCountry&limit=limitRadio
    // const data = {};
    // callApi({ method, url, data }).then((res) => {
    //   this.setState({
    //     cityList: res.data.results
    //   })
    // })
    const { client } = this.props;
    const response = await client.query({
      query: CITY_LIST,
      variables: { countryToken: selectedCountry }
    })
    console.log('CITIES ARE', response);
    this.setState({
      cityList: response.data.cityNew
    })
  }

  getCheckBoxList = async () => {       // Handler For Retrieving Data Inside SideBar(CheckBox) After The Selection Of Country From The DropDown
    // const method = 'get';
    // const uri = PARAMETERS;
    // const url = config.URL + uri;
    // const data = {};
    // callApi({ method, url, data }).then((res) => {
    //   this.setState({
    //     paramsList: res.data.results
    //   })
    // })
    const { client } = this.props;
    const response = await client.query({
      query: PARAMETERS_LIST
    })
    console.log('PARAMETERS ARE', response);
    this.setState({
      paramsList: response.data.parameterNew
    })
  }

  handleNavBarClickOpen = async () => {       // Handler For Opening The DropDown Box If User Want To Change The Country
    this.handleClickOpen();
    // const method = 'get';
    // const uri = COUNTRIES;
    // const url = config.URL + uri;
    // const data = {};
    // callApi({ method, url, data }).then((res) => {
    //   this.setState({
    //     countryList: res.data.results
    //   })
    // })
    const { client } = this.props;
    const response = await client.query({
      query: COUNTRY_LIST
    });
    console.log('COUNTRIES ARE', response);
    this.setState({
      countryList: response.data.countryNew
    })
  }

  handleOnChange = async (event) => {       // Handler for RadioGroup
    const selectCity = event.target.value;
    const { selectedCountry } = this.state;
    let { chipData } = this.state;
    if (selectCity === '') {
      chipData.push({ label: selectCity });
    } else {
      chipData.pop({ label: selectCity });
      chipData.push({ label: selectCity });
    }
    // const uri = MEASUREMENTS + '?country=' + selectedCountry + '&city=' + selectCity;
    // const url = config.URL + uri;
    // this.setState({
    //   selectCity,
    //   disable: false,
    //   tableList
    // }, () => this.handleCallApi(url))
    const { client } = this.props;
    const response = await client.query({
      query: TABLE_DATA_RADIO,
      variables: { countryToken: selectedCountry, cityToken: selectCity }
    })
    console.log('TABLE DATA BASED ON SELECTED CITY ARE', response);
    this.setState({
      tableList: response.data.tableRadio,
      selectCity,
      disable: false
    })
  }

  handleClickChange = async (event) => {       // Handler for Checkbox
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
    // const uri = MEASUREMENTS + '?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam;
    // const url = config.URL + uri;
    const { client } = this.props;
    const response = await client.query({
      query: TABLE_DATA_CHECK,
      variables: { countryToken: selectedCountry, cityToken: selectCity, paramsToken: selectParam }
    })
    console.log('TABLE DATA BASED ON SELECTED CITY AND PARAMETER ARE', response);
    this.setState({
      selectParam,
      tableList: response.data.tableCheck
    })
  }

  handleHasGeo = async () => {       // Handler For Has-Geo
    const { tableList } = this.state;
    let { chipData } = this.state;
    chipData.push({ label: 'HASGEO' });
    // const uri = MEASUREMENTS;
    // const url = config.URL + uri;
    if (!tableList) {
      return 'NO SUCH DATA AVAILABLE'
    } else {
      const { client } = this.props;
      const response = await client.query({
        query: TABLE_DATA_HASGEO,
        // variables: { countryToken: selectedCountry, cityToken: selectCity, paramsToken: selectParam }
      })
      this.setState({
        tableList: response.data.tableHasGeo
      })
    }
  }

  handleSort = async (sort, orderBy) => {       // Handler for Sorting
    const { selectedCountry, tableList } = this.state;
    if (sort === "asc") {
      this.setState({
        sort: "desc"
      })
    } else {
      this.setState({
        sort: "asc"
      })
    }
    // const uri = MEASUREMENTS + '?country=' + selectedCountry + '&order_by[]=' + orderBy + '&sort[]=' + sort;
    // const url = config.URL + uri;
    // this.setState({
    //   tableList
    // }, () => this.handleCallApi(url))
    const { client } = this.props;
    const response = await client.query({
      query: TABLE_DATA_SORT,
      variables: { countryToken: selectedCountry, orderToken: orderBy, sortToken: sort }
    })
    this.setState({
      tableList: response.data.tableSort
    })
  }

  handleSearch = async (event) => {       // Handler for Searching
    // const { tableList } = this.state;
    const location = event.target.value;
    // const uri = MEASUREMENTS + '?location=' + location;
    // const url = config.URL + uri;
    const { client } = this.props;
    const response = await client.query({
      query: TABLE_DATA_SEARCH,
      variables: { locationToken: location }
    })
    this.setState({
      location,
      tableList: response.data.tableSearch
    })
  }

  handleChangePage = () => {       // Handler For Pagination
    let { page, limit, selectedCountry, selectCity, arrCheckBox, selectParam, tableList } = this.state;
    let url;
    this.setState({
      page: page + 1
    })
    if (!selectCity) {
      console.log('if');
      console.log('City', selectCity);
      url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&page=' + page + '&limit=' + limit;
    } else if (selectCity !== '' && arrCheckBox.length === 1) {
      console.log('else-if-1');
      url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam + '&page=' + page + '&limit=' + limit;
    } else if (selectCity !== '' && arrCheckBox.length === 2) {
      console.log('else-if-2');
      url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&parameter[]=' + selectParam + '&parameter[]=' + selectParam + '&page=' + page + '&limit=' + limit;
    } else if (selectCity) {
      console.log('else-if-3');
      console.log('City', selectCity);
      url = 'https://api.openaq.org/v1/measurements?country=' + selectedCountry + '&city=' + selectCity + '&page=' + page + '&limit=' + limit;
    } else {
      console.log('else');
    }
    this.setState({
      tableList
    }, () => this.handleCallApi(url))
  }

  handleDelete = chipToDelete => () => {       // Handler For Deleting Chip
    const { chipData } = this.state;
    if (chipData.filter(item => item.label === chipToDelete).length) {
      chipData.filter(item => item.label !== chipToDelete);
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

export default withApollo(Home);
