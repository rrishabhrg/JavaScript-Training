/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         flexGrow: 1,
//     },
//     stem: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'end',
//         flexGrow: 1,
//     },
// });

class Footer extends React.Component {

    render() {

        // const { classes } = this.props;
        return (
            <div>
                <AppBar position="relative">
                    <div>This is footer</div>
                </AppBar>
            </div>
        );
    }
}

// export default withStyles(styles)(Footer);
export default Footer;
