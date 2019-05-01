import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';

import Money from '../../components/Money/Money';

import utils from './utils';

const styles = theme => {
  const nameColor = theme.palette.primary.dark;

  return {
    card: {
      width: '16%',
      minWidth: 200,
      minHeight: 180,
      display: 'inline-block',
      margin: '0 40px 30px 0'
    },
    inactiveCard: {
      opacity: 0.5,
      '&:hover': {
        opacity: 1,
        '& h4': {
          color: nameColor
        }
      },
      '& h4': {
        color: theme.palette.state.inactive
      },
      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
    },
    budgetName: {
      color: nameColor
    }
  };
};

function budgetTile(props) {
  const {data: budget} = props;
  const {classes} = props;
  const startDate = utils.formatDate(budget.startDate);
  const endDate = utils.formatDate(budget.endDate);

  const cardClasses = [classes.card];
  const current = isCurrent(budget);
  if (!current) {
    cardClasses.push(classes.inactiveCard);
  }

  return (
    <Card className={cardClasses.join(' ')}>
      <CardContent>
        <Typography variant="h4" className={classes.budgetName}>
          {budget.name}
        </Typography>
        <Typography>
          {startDate} - {endDate}
        </Typography>
        <Typography>
          {budget.total}
        </Typography>
        <Typography>
          <Money value={budget.allowed} highlight />
        </Typography>
      </CardContent>
    </Card>
  );
}

function isCurrent(budget) {
  const now = new Date();
  const start = new Date(budget.startDate);
  const end = new Date(budget.endDate);

  return now >= start && now < end;
}

export default withStyles(styles)(budgetTile);