import React, { useState } from 'react';
import { Form } from 'antd';
import { login } from 'states/auth/actions';
import MyInput from 'components/Atoms/Input';
import { checkFormAntInvalid } from 'utilities/common';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { HOME } from 'routers/route-path';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { APP_INFO, PASSWORD_PATTERN } from 'constants/common';
import * as routerPath from 'routers/route-path';
import { MyButton } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';

import * as qs from 'querystring';

import './styles.scss';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();

  const [errorMsg, setErrorMsg] = useState('');
  const onFinish = (values) => {
    dispatch(
      login(
        values,
        () => {
          const query = qs.parse(window.location.search);

          if (query['?redirect']) {
            window.location.replace(query['?redirect']);
            return;
          }

          if (get(location, 'location.state.from')) {
            history.push(location.state.from.pathname);
            return;
          }
          history.push(HOME);
        },
        (error) => {
          setErrorMsg(error);
        }
      )
    );
  };

  return (
    <div className="login-container">
      <div id="time"></div>
      <div className="login-form">
        <div className="t-center">
          <img src={require('assets/images/logo/logo.png')} alt="logo" />
        </div>
        <div className="title t-center">Welcome back!</div>

        {errorMsg && (
          <div className="alert-error mt-10">
            <Icon
              component={IconCustom.Error}
              className="icon-close"
              onClick={() => setErrorMsg('')}
            />
            {errorMsg}. Need an account?{' '}
            <span
              onClick={() => history.push(routerPath.SIGNUP)}
              className="text-link"
            >
              Sign up
            </span>
          </div>
        )}

        <Form
          form={form}
          className="form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            className="form-item-custom"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter the correct format' },
            ]}
          >
            <MyInput placeholder="Enter the email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="form-item-custom"
            rules={[
              { required: true, message: 'Please enter password' },
              {
                pattern: PASSWORD_PATTERN,
                message: 'Password is invalid',
              },
            ]}
          >
            <MyInput placeholder="Enter the password" type="password" />
          </Form.Item>

          <div className="t-right">
            <Link to={routerPath.FORGOT_PASSWORD}>
              <span className="link-forgot-password"> Forgot password?</span>
            </Link>
          </div>

          <Form.Item shouldUpdate={true} className="t-center mt-10">
            {() => (
              <MyButton
                htmlType="submit"
                size="large"
                className="btn-primary-custom"
                disabled={checkFormAntInvalid(form)}
              >
                Log in
              </MyButton>
            )}
          </Form.Item>
        </Form>
      </div>

      <div className="help-text">
        By clicking “Log in” above, you acknowledge that you have read and
        understood, and agree to {APP_INFO.NAME}’s{' '}
        <a
          onClick={() => history.push(routerPath.TERM_AND_CONDITION)}
          className="link"
        >
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a className="link" onClick={() => history.push(routerPath.POLICY)}>
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
