import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import { ValidateRequireField } from 'utilities/common';
import { MyInput, MyButton } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { partnerValidateEmail } from 'states/partner/actions';
import { useDispatch } from 'react-redux';
import { APP_INFO, PASSWORD_PATTERN } from 'constants/common';
import './styles.scss';

import axios from 'utilities/axios';
import { API } from 'constants/api';

import * as routePath from 'routers/route-path';

const SignupStep1 = ({ onVerifyEmail, readOnlyStep, values }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const validateField = useRef(new ValidateRequireField(validateForm));
  const [checkEmail, setCheckEmail] = useState(false);

  const onFinishStep = (values) => {
    onVerifyEmail(values);
  };

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }
    form.setFieldsValue({
      email: values.email,
      password: values.password,
      newPassword: values.newPassword,
    });
  }, [values]);

  const onBlurEmail = () => {
    const email = form.getFieldValue('email');
    dispatch(
      partnerValidateEmail(
        email,
        () => {
          setCheckEmail(false);
          form.validateFields(['email']);
        },
        (error) => {
          setCheckEmail(error);
          form.validateFields(['email']);
        }
      )
    );
  };

  const onValuesChange = (vObj) => {
    let label = Object.keys(vObj)[0];

    form.setFields([
      {
        name: label,
        errors: '',
      },
    ]);
  };

  return (
    <>
      <div className="wrapper-step-1">
        <div className="t-center">
          <img src={require('assets/images/logo/logo.png')} alt="logo" />
        </div>
        <div className="header-step">Welcome to {APP_INFO.NAME}!</div>
        <div className="sub-header">
          Create the account with the password contains at least 8 characters
          with a mix of letters, numbers & symbols
        </div>

        <Form
          form={form}
          className="form mt-20"
          layout="vertical"
          onFinish={onFinishStep}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label="Email"
            name="email"
            className="form-item-custom"
            validateTrigger="onSubmit"
            rules={[
              ...validateForm.email,
              {
                validator: async () => {
                  const email = form.getFieldValue('email');

                  const res = await axios.get(
                    `${API.PARTNER_PROFILE}/validate/email?email=${email}`
                  );
                },
              },
            ]}
          >
            <MyInput
              disabled={readOnlyStep}
              placeholder="Enter the email"
              // onBlur={onBlurEmail}
            />
          </Form.Item>

          <Form.Item
            validateTrigger="onSubmit"
            label="Password"
            name="password"
            className="form-item-custom"
            rules={validateForm.password}
          >
            <MyInput
              disabled={readOnlyStep}
              name="password"
              type="password"
              placeholder="Enter the password"
            />
          </Form.Item>

          <Form.Item
            validateTrigger="onSubmit"
            label=""
            name="newPassword"
            className="form-item-custom"
            rules={validateForm.newPassword}
          >
            <MyInput
              disabled={readOnlyStep}
              name="newPassword"
              type="password"
              placeholder="Confirm new password"
            />
          </Form.Item>

          <Form.Item className="t-center mt-10" shouldUpdate={true}>
            {() => (
              <MyButton
                htmlType="submit"
                size="large"
                className="btn-primary-custom"
                // disabled={validateField.current.check(form)}
              >
                Create account
              </MyButton>
            )}
          </Form.Item>
        </Form>
      </div>
      <div className="help-text">
        By clicking “Create account” above, you acknowledge that you have read
        and understood, and agree to {APP_INFO.NAME}’s{' '}
        <a className="link" href={routePath.TERM_AND_CONDITION} target="_blank">
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a className="link" href={routePath.POLICY} target="_blank">
          Privacy Policy
        </a>
      </div>
    </>
  );
};

export default SignupStep1;

const validateForm = {
  email: [
    { required: true, message: 'Please enter email' },
    { type: 'email', message: 'Please enter the correct format' },
  ],
  password: [
    { required: true, message: 'Please enter password' },
    {
      pattern: PASSWORD_PATTERN,
      message:
        'The password must contain at least 8 characters with a mix of letters, numbers & symbols',
    },
  ],
  newPassword: [
    { required: true, message: 'Please enter confirm password' },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          'The two passwords that you entered do not match!'
        );
      },
    }),
  ],
};
