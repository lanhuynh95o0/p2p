import React from 'react';
import { Form, Row, Col } from 'antd';
import { MyInput, MyButton } from 'components/Atoms';
import { checkFormAntInvalid } from 'utilities/common';
import { PASSWORD_PATTERN } from 'constants/common';

const validateForm = {
  password: [
    { required: true, message: 'Please enter password' },
    {
      pattern: PASSWORD_PATTERN,
      message:
        'The password must contain at least 8 characters with a mix of letters, numbers & symbols',
    },
  ],
  confirmPassword: [
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

const ForgotStep4 = ({ onGoBack, onContinue }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onContinue(values);
  };
  return (
    <>
      <div className="header-step">Create new password</div>
      <div className="sub-header">
        Password must contain at least 8 characters with a mix of letters,
        numbers & symbols
      </div>

      <Row className="flex-center">
        <Col xs={24} sm={12}>
          <Form
            className="mt-20"
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Password"
              name="password"
              className="form-item-custom"
              rules={validateForm.password}
            >
              <MyInput
                name="password"
                type="password"
                placeholder="Enter the password"
              />
            </Form.Item>

            <Form.Item
              label=""
              name="newPassword"
              className="form-item-custom"
              rules={validateForm.confirmPassword}
            >
              <MyInput
                name="newPassword"
                type="password"
                placeholder="Confirm new password"
              />
            </Form.Item>

            <Form.Item className="t-center mt-10" shouldUpdate>
              {() => (
                <>
                  <MyButton
                    size="large"
                    className="btn-outline-custom mr-10"
                    onClick={onGoBack}
                  >
                    Back
                  </MyButton>
                  <MyButton
                    htmlType="submit"
                    size="large"
                    className="btn-primary-custom"
                    disabled={checkFormAntInvalid(form, [
                      'password',
                      'newPassword',
                    ])}
                  >
                    Complete
                  </MyButton>
                </>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ForgotStep4;
