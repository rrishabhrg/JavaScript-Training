import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Demo = () => (
  <Query
    query={gql`
      {
        countryNew{
          cities
          code
          count
          locations
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        console.log('loading', loading);
        return <p>Loading...</p>;
      }
      else if (error) {
        console.log('error', error);
        return <p>Error :(</p>;
      }
      else {
        console.log('data', data);
        return data.countryNew.map(({ cities, code, count, locations, name }) => (
          <div>
            <p>{`Name Of The Country is ${name}.`}</p>
            <p>{`Code of ${name} is ${code}.`}</p>
            <p>{`Cities: ${cities}`}</p>
            <p>{`Locations: ${locations}`}</p>
            <p>{`Count: ${count}`}</p><hr/>
          </div>
        ));
      }
    }}
  </Query>
);

export default Demo;
