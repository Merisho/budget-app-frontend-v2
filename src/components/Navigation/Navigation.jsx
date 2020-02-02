import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import NavigationItem from './NavigationItem';

const desktopDrawerWidth = 240;

const styles = theme => ({
  menuIcon: {
    height: 20,
    marginTop: 10,
    marginLeft: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: 1,
    position: 'relative',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: desktopDrawerWidth,
    },
  },
  openedDrawer: {
    width: 360,
    [theme.breakpoints.up('sm')]: {
      width: desktopDrawerWidth,
    },
  },
});

function navigation(props) {
  const { classes } = props;
  const [opened, setNavState] = React.useState(false);

  function handleDrawerToggle() {
    setNavState(!opened);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        className={classes.menuIcon}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        classes={{
          paper: `${classes.drawerPaper} ${opened ? classes.openedDrawer : ''}`,
        }}
      >
        <Divider />
        <List onClick={handleDrawerToggle}>
          <NavigationItem url="/" text="Home" icon={<Home />} exact />
          <NavigationItem url="/dashboard" text="Dashboard" exact />
          <NavigationItem url="/budgets" text="Budgets" />
          <NavigationItem url="/addtransaction" text="Add transaction" exact />
        </List>
      </Drawer>
    </>
  );
}

export default withStyles(styles)(navigation);