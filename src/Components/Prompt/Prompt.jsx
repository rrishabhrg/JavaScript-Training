/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


class SimpleDialogDemo extends React.Component {
    state = {
        open: false,
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const {
            open,
        } = this.state;
        
        return (
            <React.Fragment>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Select Your Country
                </Button>
                <Dialog open={open} onClose={this.handleClose} fullWidth="true" aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Select Your Country</DialogTitle>
                    <DialogContent>
                        <FormControl required>
                            <InputLabel htmlFor="country-required">Country</InputLabel>
                            <Select
                                //   value={values.age}
                                //   onChange={handleChange}
                                name="age"
                                inputProps={{
                                    id: 'country-required',
                                }}
                                // className={classes.selectEmpty}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default SimpleDialogDemo;
