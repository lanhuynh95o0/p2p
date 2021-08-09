import React from 'react';
import { Button } from 'antd';
import LoginPage from './pages/Login';
import { Link } from 'react-router-dom';
import * as routerPath from 'routers/route-path';
import './styles.scss';

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="header-auth">
        <span className="question mr-10">Don't have an account?</span>
        <Button size="large" className="btn-primary-custom">
          <Link to={routerPath.SIGNUP + window.location.search}>
            Get started
          </Link>
        </Button>
      </div>

      <div className="content">
        <LoginPage />
      </div>
    </div>
  );
};

export default AuthPage;
