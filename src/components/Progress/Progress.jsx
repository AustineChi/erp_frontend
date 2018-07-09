import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Progress(props) {
  const { classes, loading } = props;
  return (
    (loading)?
    <div className={classes.root}>
      <LinearProgress color="secondary" variant="query" />
    </div>
    : ''
  );
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(Progress);