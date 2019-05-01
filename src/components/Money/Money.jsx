import React from 'react';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core';

const styles = {
  positive: {
    color: green[400]
  },
  negative: {
    color: red[400]
  }
};

function money(props) {
  const { value, highlight, classes } = props;
  let className = '';
  if (highlight) {
    className = value > 0 ? classes.positive : classes.negative;
  }
  
  const preparedValue = `₴${Math.round(+value) / 100}`;

  return (
    <span className={className}>
      {preparedValue}
    </span>
  );
}

export default withStyles(styles)(money);