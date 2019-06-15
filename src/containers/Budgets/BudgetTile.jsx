import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';

import Money from '../../components/Money/Money';
import DeleteBudgetConfirmation from './DeleteBudgetConfirmation';
import utils from './utils';
import Service from '../../services/Service';

const styles = theme => {
  const nameColor = theme.palette.primary.dark;

  const tileHeightTransition = theme.transitions.create('height', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  });
  return {
    tile: {
      width: '22%',
      minWidth: 200,
      margin: '0 40px 30px 0',
      height: 120,
      display: 'inline-block',
      '&:hover': {
        height: 252,
        transition: tileHeightTransition,
      },
      transition: tileHeightTransition
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
      width: '100%',
      margin: '16px 0 0 0',
      padding: '8px 0',
      textAlign: 'center',
      color: 'white',
      background: theme.palette.action.delete
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
      <Card className={classes.tile}>
        <CardContent>
          <Typography variant="h4" className={classes.budgetName}>
            {budget.name}
          </Typography>
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
          <DeleteForever />
        </div>
      </Card>
      <DeleteBudgetConfirmation open={confirmDeletion} handleCancel={cancelDeletion} handleOK={acceptDeletion} budgetName={budget.name} />
    </React.Fragment>
  );
}

export default withStyles(styles)(budgetTile);