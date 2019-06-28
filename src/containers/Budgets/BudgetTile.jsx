import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import Money from '../../components/Money/Money';
import DeleteBudgetConfirmation from './DeleteBudgetConfirmation';
import utils from './utils';
import Service from '../../services/Service';

const styles = theme => {
  const nameColor = theme.palette.primary.dark;

  const tileHeightTransitionParams = {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  };
  const actionButtonsTransition = theme.transitions.create('background', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.short
  });
  const actionButton = {
    display: 'inline-block',
    width: '50%',
    margin: '16px 0 0 0',
    padding: '12px 0',
    textAlign: 'center',
    color: 'white',
    transition: actionButtonsTransition,
    '&:hover': {
      transition: actionButtonsTransition
    },
    cursor: 'pointer'
  };
  return {
    tileContainer: {
      position: 'relative',
      width: '22%',
      minWidth: 200,
      margin: '0 40px 30px 0',
      display: 'inline-block',
      height: 120
    },
    tile: {
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      '&:hover': {
        height: 260,
        transition: theme.transitions.create('height', tileHeightTransitionParams),
      },
      transition: theme.transitions.create('height', {
        ...tileHeightTransitionParams,
        delay: 1000
      })
    },
    nameLink: {
      textDecoration: 'none'
    },
    budgetName: {
      color: nameColor
    },
    budgetStats: {
      overflow: 'hidden',
      width: '100%',
      margin: '12px 0 0 0'
    },
    statsItem: {
      width: '45%',
      float: 'left'
    },
    delete: {
      ...actionButton,
      '&:hover': {
        ...actionButton['&:hover'],
        background: theme.palette.action.highlightedDelete
      },
      background: theme.palette.action.delete
    },
    edit: {
      ...actionButton,
      '&:hover': {
        ...actionButton['&:hover'],
        background: theme.palette.action.highlightedEdit
      },
      background: theme.palette.action.edit
    }
  };
};

function budgetTile(props) {
  const [ confirmDeletion, setConfirmDeletion ] = React.useState(false);
  const {budget} = props;
  const {classes} = props;
  const startDate = utils.formatDate(budget.startDate);
  const endDate = utils.formatDate(budget.endDate);

  function deleteBudget(e) {
    e.preventDefault();
    setConfirmDeletion(true);
  }

  function cancelDeletion(e) {
    e.preventDefault();
    setConfirmDeletion(false);
  }

  async function acceptDeletion(e) {
    e.preventDefault();
    try {
      await Service.deleteBudget(budget.id);
      setConfirmDeletion(false);
      props.deleted && props.deleted(budget);
    } catch(err) {
      props.onError && props.onError('An error occured. Please try again');
      console.error(err);
    }
  }

  return (
    <React.Fragment>
      <div className={classes.tileContainer}>
        <Card className={classes.tile}>
          <CardContent className={classes.tileContent}>
            <Link to={`/budgets/${budget.id}`} className={classes.nameLink}>
              <Typography variant="h4" className={classes.budgetName}>
                {budget.name}
              </Typography>
            </Link>
            <Typography variant="h6">
              Period
            </Typography>
            <Typography>
              {startDate} - {endDate}
            </Typography>
            <div className={classes.budgetStats}>
              <div className={classes.statsItem}>
                <Typography variant="h6">
                  Total
                </Typography>
                <Typography>
                  <Money value={budget.total} highlight />
                </Typography>
              </div>
              <div className={classes.statsItem}>
                <Typography variant="h6">
                  Allowed
                </Typography>
                <Typography>
                  <Money value={budget.allowed} highlight />
                </Typography>
              </div>
            </div>
          </CardContent>
          <div className={classes.delete} onClick={deleteBudget}>
            <DeleteForeverIcon />
          </div>
          <div className={classes.edit}>
            <EditIcon />
          </div>
        </Card>
      </div>
      <DeleteBudgetConfirmation open={confirmDeletion} handleCancel={cancelDeletion} handleOK={acceptDeletion} budgetName={budget.name} />
    </React.Fragment>
  );
}

export default withStyles(styles)(budgetTile);