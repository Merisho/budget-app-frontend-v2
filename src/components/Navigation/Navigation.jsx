import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Home from '@material-ui/icons/Home';

import NavigationItem from './NavigationItem';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
});

function navigation(props) {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper),
      }}
    >
      <Divider />
      <List>
        <NavigationItem url="/" text="Home" icon={<Home />} exact />
        <NavigationItem url="/dashboard" text="Dashboard" exact />
        <NavigationItem url="/budgets" text="Budgets" />
        <NavigationItem text="Create transactions" exact />
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(navigation);