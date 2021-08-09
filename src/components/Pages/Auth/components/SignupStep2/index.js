import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { MyInput, MyPhoneInput, MyButton } from 'components/Atoms';
import { checkFormAntInvalid, getPhoneNumber } from 'utilities/common';
import { isEmpty } from 'lodash';
// import { partnerValidatePhone } from 'states/partner/actions';
// import { useDispatch } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';

const SignupStep3 = ({ onContinue, onGoBack, readOnlyStep, values }) => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const [checkPhone, setCheckPhone] = useState(false);

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue({
        phoneData: {
          code: '+61',
          number: '',
        },
      });
      return;
    }
    form.setFieldsValue({
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      phone: values.phone,
      phoneCode: values.phoneCode,
    });
  }, [values]);

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

  const onFinish = (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      phoneCode: values.phoneCode,
      phone: values.phone,
    };
    onContinue(payload);
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
                disabled={readOnlyStep}
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
                disabled={readOnlyStep}
                name="lastName"
                placeholder="Last name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Title"
          name="title"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <MyInput disabled={readOnlyStep} name="title" placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          className="form-item-custom phone-validate"
          name="phone"
          rules={[{ validator: checkPhoneNumberValid }]}
        >
          <MyPhoneInput
            defaultValue={`${values?.phoneCode ? '+' + values?.phoneCode : ''}${
              values?.phone || ''
            }`}
            onChangePhoneNumber={onChangePhoneNumber}
            disabled={readOnlyStep}
          />
        </Form.Item>
        <Form.Item
          label="Phone code"
          className="form-item-custom phone-validate"
          name="phoneCode"
          hidden={true}
        />
        <Form.Item className="t-center mt-20" shouldUpdate={true}>
          {() => (
            <>
              <MyButton
                onClick={onGoBack}
                size="large"
                className="btn-outline-custom mr-10"
              >
                Back
              </MyButton>
              {!readOnlyStep && (
                <MyButton
                  htmlType="submit"
                  size="large"
                  className="btn-primary-custom"
                  disabled={checkFormAntInvalid(form)}
                >
                  Continue
                </MyButton>
              )}
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupStep3;
