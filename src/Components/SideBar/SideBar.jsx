import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

class SideBar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <div style={{ width: '25%' }}>
                            <h3>Filters</h3>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel>City</FormLabel>
                                    <RadioGroup
                                        aria-label="Gender"
                                        name="gender1"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="ABC" />
                                        <FormControlLabel value="male" control={<Radio />} label="PQR" />
                                        <FormControlLabel value="other" control={<Radio />} label="XYZ" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset">
                                    <FormLabel>Parameters</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox value="gilad" />}
                                            label="GiladGray"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="jason" />}
                                            label="JasonKillian"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="antoine" />}
                                            label="AntoineLlorca"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">HasGeo</FormLabel>
                                </FormControl>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default SideBar;
