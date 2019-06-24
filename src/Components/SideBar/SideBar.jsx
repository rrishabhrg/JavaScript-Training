import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

class SideBar extends React.Component {
    render() {
        const { sideBarData } = this.props;
        if (!(sideBarData.length)) {
            return (
                <CircularProgress />
            );
        }
        return (
            <React.Fragment>
                <div style={{ width: '25%' }}>
                    <h3>Filters</h3>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel>City</FormLabel>
                            <div style={{ overflowY: 'scroll', width: '100%', height: '200px', position: 'relative' }}>
                                <RadioGroup
                                    name="city"
                                >
                                    {
                                        sideBarData.map(row => (
                                            <FormControlLabel key={row.city} label={row.city} value={row.city} control={<Radio />}>
                                                {row.city}
                                            </FormControlLabel>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </FormControl>
                        <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                            <FormLabel>Parameters</FormLabel>
                            <div style={{ overflowY: 'scroll', width: '100%', height: '200px', position: 'relative' }}>
                                <FormGroup>
                                    {
                                        sideBarData.map(row => (
                                            <FormControlLabel key={row.city} label={row.parameter} control={<Checkbox />}>
                                                {row.parameter}
                                            </FormControlLabel>
                                        ))
                                    }
                                </FormGroup>
                            </div>
                        </FormControl>
                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>
                            <FormLabel component="legend">HasGeo</FormLabel>
                        </FormControl>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar;
