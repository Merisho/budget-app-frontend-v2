import React from 'react';
import { connect } from 'react-redux';

import Service from '../../services/Service';

function Auth(props) {
  React.useEffect(() => {
    (async function() {
      if (props.user) {
        return;
      }
  
      const accessToken = accessTokenFromURL() || localStorage.getItem('accessToken');
      if (!accessToken) {
        redirectToSignIn();
        return;
      }
  
      const user = await Service.authUser(accessToken);

      if (user) {
        props.setUser(user);
        localStorage.setItem('accessToken', accessToken);
      } else {
        redirectToSignIn();
      }
    })();
  });

  function accessTokenFromURL() {
    const { href } = window.location;
    const params = href.substr(href.indexOf('#') + 1);

    const parts = params.split('&');
    for (const p of parts) {
      const [k, v] = p.split('=');
      if (k === 'access_token') {
        return v;
      }
    }

    return;
  }

  function redirectToSignIn() {
    window.location.href = process.env.REACT_APP_AUTH_URL;
  }

  return props.user ? props.children : (
    <h1>Authorizing...</h1>
  );
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: 'SET_USER', payload: { user } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
