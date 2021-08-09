import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { MyInput, MyPhoneInput } from 'components/Atoms';
import { checkFormAntInvalid } from 'utilities/common';
import { isEmpty } from 'lodash';
import { PASSWORD_PATTERN } from 'constants/common';
import { isValidPhoneNumber } from 'react-phone-number-input';

const InviteEmployeeForm = ({ onContinue, values }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue({
        phoneCode: '61',
        phone: '',
      });
      return;
    }
    form.setFieldsValue({
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      phoneCode: values.phoneCode,
      phone: values.phone,
    });
  }, [values]);

  const onFinish = (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      phoneCode: values.phoneCode,
      phone: values.phone,
      password: values.password,
    };
    onContinue(payload);
  };

  const checkPhoneNumberValid = () => {
    const phone = form.getFieldValue('phone');
    const phoneCode = form.getFieldValue('phoneCode');
    const fullPhoneNumber = `+${phoneCode}${phone}`;
    const isValid = isValidPhoneNumber(fullPhoneNumber);
    if (isValid) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("It's must be Mobile phone to receive verification code")
    );
  };

  const onChangePhoneNumber = async ({ phone = '', phoneCode = '' }) => {
    form.setFieldsValue({
      phone,
      phoneCode,
    });
  };

  return (
    <div className="wrapper-step-2">
      <div className="header-step">Personal information</div>
      <div className="sub-header">
        Enter your personal information to let us and partners know who you are
      </div>

      <Form
        className="form mt-20"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="First name"
              name="firstName"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <MyInput
                disabled={true}
                name="firstName"
                placeholder="First name"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last name"
              name="lastName"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <MyInput
                disabled={true}
                name="lastName"
                placeholder="Last name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Phone number"
          className="form-item-custom phone-validate"
          rules={[{ validator: checkPhoneNumberValid }]}
        >
          <MyPhoneInput
            defaultValue={`${values?.phoneCode ? '+' + values?.phoneCode : ''}${values?.phone || ''
              }`}
            onChangePhoneNumber={onChangePhoneNumber}
          />
        </Form.Item>
        <Form.Item
          required={false}
          className="form-item-custom phone-validate ant-form-item-required"
          name="phone"
          hidden={true}
        />
        <Form.Item
          required={false}
          className="form-item-custom phone-validate ant-form-item-required"
          name="phoneCode"
          hidden={true}
        />

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
            name="password"
            type="password"
            placeholder="Enter the password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm new password"
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
            name="newPassword"
            type="password"
            placeholder="Confirm new password"
          />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <MyInput name="title" placeholder="Title" />
        </Form.Item>

        <Form.Item className="t-center mt-20" shouldUpdate={true}>
          {() => (
            <>
              <Button
                htmlType="submit"
                size="large"
                className="btn-primary-custom"
                disabled={checkFormAntInvalid(form)}
              >
                Continue
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default InviteEmployeeForm;
