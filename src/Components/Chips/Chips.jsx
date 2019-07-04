import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    }
});

class Chips extends React.Component {
    render() {
        const { classes, chipsArr, remove } = this.props;
        return (
            <Paper className={classes.root}>
                <Chip label="Applied Filters" className={classes.chip} variant="outlined" />
                {
                    chipsArr.map(data => (
                        <Chip
                            variant="outlined"
                            color="secondary"
                            label={data.label}
                            className={classes.chip}
                            onDelete={remove(data.label)}
                        />
                    ))
                }
            </Paper>
        );
    }
}

export default withStyles(styles)(Chips);
