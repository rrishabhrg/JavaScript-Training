/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    stem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        flexGrow: 1,
    },
});

class Footer extends React.Component {

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="sticky" className={classes.stem}>
                    <div>This is footer</div>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
// export default Footer;
