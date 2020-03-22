import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validate } from 'email-validator';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function BudgetCollaborators(props) {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  function handleAddCollaborator() {
    if (!validate(email)) {
      setInvalidEmail(true);
      return;
    }

    setInvalidEmail(false);

    props.onAdd && props.onAdd(email);
  }
  
  const classes = useStyles();
  const collabs = props.budget.collaborators || [];

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Budget collaborators</DialogTitle>
      <List>
        {collabs.map(collab => (
          <ListItem key={collab.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={collab.login} secondary={collab.email} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="remove">
                <RemoveIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

        <ListItem>
          <TextField
              autoFocus
              required
              error={invalidEmail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              margin="dense"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="add" onClick={handleAddCollaborator}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Dialog>
  );
}

BudgetCollaborators.propTypes = {
  open: PropTypes.bool.isRequired,
  budget: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func
};
