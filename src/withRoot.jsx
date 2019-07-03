import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightblue from '@material-ui/core/colors/lightBlue';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import CssBaseline from '@material-ui/core/CssBaseline';

const deleteColor = red[700];
const editColor = amber[600];

const theme = createMuiTheme({
  palette: {
    state: {
      inactive: grey[400],
    },
    action: {
      approve: green[500],
      delete: deleteColor,
      highlightedDelete: red[500],
      edit: editColor,
      highlightedEdit: amber[400]
    },
    background: {
      active: green[100]
    },
    primary: {
      light: lightblue[400],
      main: lightblue[600],
      dark: lightblue[800],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    secondaryText: {
      main: '#ffffff'
    }
  },
  actionIcons: {
    delete: {
      color: deleteColor,
      cursor: 'pointer'
    },
    edit: {
      color: editColor,
      cursor: 'pointer'
    }
  },
  typography: {
    useNextVariants: true,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;