import React, { useEffect } from 'react';
import { Form } from 'antd';
import { checkFormAntInvalid } from 'utilities/common';
import { MyInput, MyButton } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { APP_INFO, PASSWORD_PATTERN } from 'constants/common';
import 'components/Pages/Auth/components/SignupStep1/styles.scss';
const SignupStep1 = ({ onVerifyEmail, readOnlyStep, values }) => {
  const [form] = Form.useForm();

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
        >
          <Form.Item label="Email" name="email" className="form-item-custom">
            <MyInput
              disabled={true}
              value={values.email || ''}
              placeholder="Enter the email"
            />
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
            <MyInput
              disabled={readOnlyStep}
              name="password"
              type="password"
              placeholder="Enter the password"
            />
          </Form.Item>

          <Form.Item
            label=""
            name="newPassword"
            className="form-item-custom"
            rules={[
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
            ]}
          >
            <MyInput
              disabled={readOnlyStep}
              name="newPassword"
              type="password"
              placeholder="Confirm new password"
            />
          </Form.Item>

          {!readOnlyStep && (
            <Form.Item className="t-center mt-10" shouldUpdate={true}>
              {() => (
                <MyButton
                  htmlType="submit"
                  size="large"
                  className="btn-primary-custom"
                  disabled={checkFormAntInvalid(form)}
                >
                  Create account
                </MyButton>
              )}
            </Form.Item>
          )}
        </Form>
      </div>
      <div className="help-text">
        By clicking “Create account” above, you acknowledge that you have read
        and understood, and agree to {APP_INFO.NAME}’s{' '}
        <a className="link">Terms & Conditions</a> and{' '}
        <a className="link">Privacy Policy</a>
      </div>
    </>
  );
};

export default SignupStep1;
