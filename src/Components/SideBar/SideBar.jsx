import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

class SideBar extends React.Component {
  render() {
    const { city, makeChange, cities, parameters, doChange, show, btnClick } = this.props;
    if (!(cities.length)) {
      return <CircularProgress />
    }
    if (!(parameters.length)) {
      return <CircularProgress />;
    }
    return (
      <React.Fragment>
        <Paper>
          <div style={{ width: '25%' }}>
            <h3>Filters</h3>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">City</FormLabel>
                <div style={{ overflowY: 'scroll', width: '100%', height: '208px', position: 'relative' }}>
                  <RadioGroup
                    aria-label="City"
                    name="city"
                    value={city}
                    onChange={makeChange}
                  >
                    {
                      cities.map(row => (
                        <FormControlLabel
                          // key={row.city}
                          label={row.city}
                          value={row.city}
                          control={<Radio />}
                        >
                          {row.city}
                        </FormControlLabel>
                      ))
                    }
                  </RadioGroup>
                </div>
              </FormControl>
              <FormControl component="fieldset" style={{ marginTop: '20px' }} disabled={show}>
                <FormLabel>Parameters</FormLabel>
                <div style={{ overflowY: 'scroll', width: '100%', height: '200px', position: 'relative' }}>
                  <FormGroup>
                    {
                      parameters.map(row => (
                        <FormControlLabel
                          key={row.city}
                          label={row.id}
                          onChange={doChange}
                          control={<Checkbox
                            value={row.id}
                          />}
                        >
                          {row.id}
                        </FormControlLabel>
                      ))
                    }
                  </FormGroup>
                </div>
              </FormControl>
              <FormControl component="fieldset" style={{ marginTop: '30px' }}>
                <Button variant="contained" color="secondary" onClick={btnClick}>HasGeo</Button>
              </FormControl>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}

export default SideBar;
