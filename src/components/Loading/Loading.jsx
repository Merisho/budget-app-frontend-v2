import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { ReactComponent as Loading } from '../../assets/loading.svg';

const styles = theme => ({
  loading: {
    margin: '100px auto',
    display: 'block'
  }
});

function loading(props) {
  const { children, inProgress, classes } = props;

  return (
    <div>
      {inProgress ? <Loading className={props.className || classes.loading} /> : children}
    </div>
  );
}

export default withStyles(styles)(loading);
