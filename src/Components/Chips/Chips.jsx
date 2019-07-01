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
    },
});

class Chips extends React.Component {
    render() {
        const { classes, chips, remove } = this.props;
        console.log('My Chips Are', chips);
        console.log('Length Of Chips Are', chips.length);
        if ((chips.length)>0) {
            return (
                <Paper className={classes.root}>
                    {
                        chips.map(data => (
                            <Chip
                                key={data.key}
                                label={data.label}
                                onDelete={remove(data)}
                                className={classes.chip}
                        />
                        ))
                    }
                </Paper>
            );
        }
        return null;
    }
}

export default withStyles(styles)(Chips);
