import React from 'react';

import Auth from '../containers/Auth/Auth';

function withAuth(Component) {
  return function(props) {
    return (
      <Auth>
        <Component {...props} />
      </Auth>
    );
  };
}

export default withAuth;
