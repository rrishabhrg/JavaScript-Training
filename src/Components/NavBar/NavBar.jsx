/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
    },
    dropdown: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 5
    },
    search: {
        display: 'flex',
        flex: 3,
        justifyContent: 'end',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        width: theme.spacing(62),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        display: 'flex',
    },
    inputInput: {
        display: 'flex',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class NavBar extends React.Component {
    render() {
        const { classes, yourCountry, dialogOpen, close, change, name, countryData, ClickOpen, makeSearch } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div>
                            <Typography variant="title">
                                <div>
                                    Know Your Globe !!!!
                                </div>
                                <div>
                                    All About Countries Geography
                                </div>
                            </Typography>
                        </div>
                        <div className={classes.dropdown}>
                            <div>
                                <Typography variant="title">Your Country Code : {yourCountry}</Typography><br/>
                                <Typography variant="title">Change Country :</Typography>
                                <Button onClick={ClickOpen} size={"small"}>
                                    <KeyboardArrowDown />
                                </Button>
                            </div>
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
                        </div>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                onChange={makeSearch}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar);
