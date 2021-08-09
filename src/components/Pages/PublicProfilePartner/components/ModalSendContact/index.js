import React, { useState, useEffect } from 'react';
import { Form, Row, message } from 'antd';
import { MyInput, MyButton, MyPhoneInput } from 'components/Atoms';
import { checkFormAntInvalid } from 'utilities/common';
import ReCAPTCHA from 'react-google-recaptcha';
import { isValidPhoneNumber } from 'react-phone-number-input';

import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

const ModalSendContact = ({ partnerId, onClose }) => {
  const [form] = Form.useForm();
  const [checkCaptcha, setCaptcha] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      phoneCode: '61',
      phone: '',
    });
  }, []);

  const onChangeCaptcha = (v) => setCaptcha(v);

  const onFinish = async (values) => {
    try {
      await axios.post(API.SEND_CONTACT, {
        partnerId,
        name: values.name,
        phone: values.phone,
        phoneCode: values.phoneCode,
        email: values.email,
        inquiry: values.inquiry,
      });

      onClose();

      message.success({
        content: 'Send success',
      });
    } catch (err) {
      const errData = ErrorHandler.getErrorData(err);
      showModalError({ content: errData.message });
    }
  };

  const onChangePhoneNumber = ({ phone, phoneCode }) => {
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
    <div>
      <Row justify="center">
        <h1>Contact Us</h1>
      </Row>

      <Form
        form={form}
        className="form mt-20"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          className="form-item-custom"
          rules={[...validateForm.name]}
        >
          <MyInput placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          className="form-item-custom"
          rules={[...validateForm.email]}
        >
          <MyInput placeholder="Enter the email" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          className="form-item-custom phone-validate"
          rules={[{ validator: checkPhoneNumberValid }]}
          name="phone"
        >
          <MyPhoneInput onChangePhoneNumber={onChangePhoneNumber} />
        </Form.Item>
        <Form.Item name="phoneCode" hidden={true} />
        <Form.Item label="Inquiry" name="inquiry" className="form-item-custom">
          <MyInput type="textarea" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              validator: () =>
                checkCaptcha ? Promise.reject(checkCaptcha) : Promise.resolve(),
            },
          ]}
        >
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GG_CAPTCHA}
            onChange={onChangeCaptcha}
          />
        </Form.Item>

        <Form.Item className="t-center mt-20">
          <MyButton
            htmlType="submit"
            size="large"
            className="btn-primary-custom"
            disabled={checkFormAntInvalid(form) || !checkCaptcha}
          >
            Submit
          </MyButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalSendContact;

const validateForm = {
  name: [{ required: true, message: 'Please enter name' }],
  email: [
    { required: true, message: 'Please enter email' },
    { type: 'email', message: 'Please enter the correct format' },
  ],
};
