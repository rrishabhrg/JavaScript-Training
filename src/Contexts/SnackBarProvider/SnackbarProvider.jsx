import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';

export const MyContext = React.createContext();

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackbarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
    };
  }

  handleOpenSnackBar = (message) => {
    this.setState({
      open: true,
      message,
    });
  }

  closeSnackBar = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open, message } = this.state;
    const { children, classes } = this.props;
    return (
      <React.Fragment>
        <MyContext.Provider
          value={{
            onOpenSnackbar: this.handleOpenSnackBar,
            message,
          }}
        >
          { children }
        </MyContext.Provider>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={this.closeSnackBar}
          onClick={this.closeSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span id="message-id" className={classes.message}>{message}</span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}

SnackbarProvider.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.func,
};

SnackbarProvider.defaultProps = {
  classes: undefined,
  children: undefined,
};

export default withStyles(styles)(SnackbarProvider);
