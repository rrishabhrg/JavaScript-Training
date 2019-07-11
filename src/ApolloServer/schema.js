import gql from "graphql-tag";

export const COUNTRY_LIST = gql`
  {
    countryNew {
      cities
      code
      count
      locations
      name
    }
  }
`;

export const CITY_LIST = gql`
  query cityNew($countryToken: String){
    cityNew(countryToken: $countryToken) {
      city
      count
      country
      locations
    }
  }
`;

export const PARAMETERS_LIST = gql`
  {
    parameterNew {
      description
      id
      name
      preferredUnit
    }
  }
`;

export const TABLE_DATA = gql`
  query tableNew($countryToken: String){
    tableNew(countryToken: $countryToken) {
      city
      location
      parameter
      value
      unit
    }
  }
`;

export const TABLE_DATA_RADIO = gql`
  query tableRadio($countryToken: String, $cityToken: String){
    tableRadio(countryToken: $countryToken, cityToken: $cityToken) {
      city
      location
      parameter
      value
      unit
    }
  }
`;

export const TABLE_DATA_CHECK = gql`
  query tableCheck($countryToken: String, $cityToken: String, $paramsToken: String){
    tableCheck(countryToken: $countryToken, cityToken: $cityToken, paramsToken: $paramsToken) {
      city
      location
      parameter
      value
      unit
    }
  }
`;

export const TABLE_DATA_HASGEO = gql`
  {
    tableHasGeo {
      city
      location
      parameter
      value
      unit
    }
  }
`;

export const TABLE_DATA_SORT = gql`
  query tableSort($countryToken: String, $orderToken: String, $sortToken: String){
    tableSort(countryToken: $countryToken, orderToken: $orderToken, sortToken: $sortToken) {
      city
      location
      parameter
      value
      unit
    }
  }
`;

export const TABLE_DATA_SEARCH = gql`
  query tableSearch($locationToken: String){
    tableSearch(locationToken: $locationToken) {
      city
      location
      parameter
      value
      unit
    }
  }
`;
