import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600]
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

function StatusSnackbar(props) {
  const { classes } = props;

  let Icon = CheckCircleIcon;
  let contentClass = classes.success;
  if (props.variant === 'error') {
    Icon = ErrorIcon;
    contentClass = classes.error;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={4000}
      onClose={props.handleClose}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={contentClass}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {props.message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={props.handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}

StatusSnackbar.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(StatusSnackbar);