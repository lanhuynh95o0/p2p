import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as routeName from 'routers/route-name';

const PrivateRoute = ({ children, token, userRoles, name, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return children;
      }}
    />
  );
};

PrivateRoute.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(PrivateRoute);
