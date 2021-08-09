import React from 'react';
import { Form, Row, Col } from 'antd';
import { MyPhoneInput, MyButton } from 'components/Atoms';
import { checkFormAntInvalid } from 'utilities/common';
import { isValidPhoneNumber } from 'react-phone-number-input';

const ForgotEmailStep1 = ({ onContinue }) => {
  const [form] = Form.useForm();
  const onChangePhoneNumber = async ({ phone = '', phoneCode = '' }) => {
    form.setFieldsValue({
      phone,
      phoneCode,
    });
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
  return (
    <div className="forgot-email-step-1">
      <div className="header-step">Phone number</div>
      <div className="sub-header">Enter your phone number to get the email</div>

      <Row className="flex-center">
        <Col xs={24} sm={12}>
          <Form
            className="form mt-20"
            layout="vertical"
            form={form}
            onFinish={onContinue}
          >
            <Form.Item
              label="Phone number"
              className="form-item-custom"
              name="phone"
              rules={[{ validator: checkPhoneNumberValid }]}
            >
              <MyPhoneInput onChangePhoneNumber={onChangePhoneNumber} />
            </Form.Item>
            <Form.Item name="phoneCode" hidden={true} />
            <Form.Item className="t-center mt-10" shouldUpdate={true}>
              {() => (
                <MyButton
                  size="large"
                  className="btn-primary-custom"
                  htmlType="submit"
                  disabled={checkFormAntInvalid(form)}
                >
                  Continue
                </MyButton>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotEmailStep1;
