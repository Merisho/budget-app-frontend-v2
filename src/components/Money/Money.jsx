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

  const preparedValue = `₴${formatDigits(Math.round(+value) / 100)}`;

  return (
    <span className={className}>
      {preparedValue}
    </span>
  );
}

function formatDigits(n) {
  const str = n.toString();
  if (str.length <= 3) {
      return str;
  }

  const mod = str.length % 3;
  let formatted = str.slice(0, mod);
  for (let i = mod; i <= str.length - 3; i += 3) {
      if (formatted !== '') {
          formatted += ',';
      }

      formatted += str.slice(i, i + 3);
  }

  return formatted;
}

export default withStyles(styles)(money);