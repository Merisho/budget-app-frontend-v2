import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';

const styles = {
  backBtn: {
    textDecoration: 'none',
    display: 'block',
    marginBottom: '24px'
  }
};

function back(props) {
  return (
    <Link to={props.target} className={props.classes.backBtn}>
      <Button variant="contained">
        <KeyboardBackspace />
        &nbsp;
        {props.children}
      </Button>
    </Link>
  );
}

export default withStyles(styles)(back);