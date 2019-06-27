/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import React from 'react';
import { MyContext } from './SnackbarProvider';

export const SnackbarHOC = (Component) => (props) => {
  return (
    <MyContext.Consumer>
      {
        contextData => {
          return (<Component {...props} value={contextData} />);
        }
      }
    </MyContext.Consumer>
  );
};
