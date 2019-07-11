/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class Prompt extends React.Component {
  render() {
    const { countryData, close, dialogOpen, change, name } = this.props;
    return (
      <React.Fragment>
        <Dialog open={dialogOpen} onClose={close} fullWidth aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select Your Country</DialogTitle>
          <DialogContent>
            <FormControl required>
              <InputLabel shrink={true} disableAnimation htmlFor="country-required">Country</InputLabel>
              <Select
                onChange={change}
                value={name}
                inputProps={{
                  name: 'name',
                  id: 'name-simple',
                }}
              >
                {
                  countryData.length && countryData.map(item => (
                    <MenuItem value={item.code} key={item.name}>{item.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Prompt;
