import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  navLink: {
    display: 'block',
    width: '100%',
    textDecoration: 'none',
  },
  activeNavLink: {
    backgroundColor: theme.palette.background.active
  }
});

function navigationItem(props) {
  const { classes } = props;
  return (
    <NavLink to={props.url || '/'} className={classes.navLink} activeClassName={classes.activeNavLink} exact={props.exact}>
      <ListItem button>
          {props.icon ?
            <ListItemIcon>
              {props.icon}
            </ListItemIcon>
          : null }
        
          <ListItemText primary={props.text} />
      </ListItem>
    </NavLink>
  );
}

export default withRouter(withStyles(styles)(navigationItem));