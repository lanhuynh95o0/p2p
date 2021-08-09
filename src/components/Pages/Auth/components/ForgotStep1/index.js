import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import { MyInput, MyButton, MyModal, MyStep } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { getPhoneNumber, ValidateRequireField } from 'utilities/common';
import { ForgotEmailStep1, ForgotEmailStep2, ForgotEmailStep3 } from '..';
import { requestGetEmailByPhone, getEmailByPhone } from 'states/auth/actions';
import { useDispatch } from 'react-redux';
import { STEP_FORGOT_EMAIL } from '../../constants';
import './styles.scss';

const validateForm = {
  email: [
    { required: true, message: 'Please enter email' },
    { type: 'email', message: 'Please enter the correct format' },
  ],
};

const ForgotStep1 = ({ onContinue, values, readOnlyStep }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const validateField = useRef(new ValidateRequireField(validateForm));
  const [showModalForgot, setShowModalForgot] = useState(false);

  const [dataSubmit, setDataSubmit] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);

  const onFinish = (values) => {
    onContinue(values);
  };

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }
    form.setFieldsValue({
      email: values.email,
    });
  }, [values]);

  const toggleForgotEmail = () => {
    setShowModalForgot(!showModalForgot);

    if (showModalForgot) {
      onResetStep();
    }
  };

  const handleContinueStep1 = (values) => {
    const phone = getPhoneNumber(values.phone);
    dispatch(
      requestGetEmailByPhone({ ...values, phone }, () => {
        updateDataSubmit({ ...values, phone });
        onGoNextStep(2);
      })
    );
  };

  const resendOTP = () => {
    dispatch(requestGetEmailByPhone(dataSubmit, () => {}));
  };

  const handleContinueStep2 = (code) => {
    dispatch(
      getEmailByPhone(
        {
          phoneCode: dataSubmit.phoneCode,
          phone: dataSubmit.phone,
          token: code,
        },
        (data) => {
          onGoNextStep(3);
          updateDataSubmit({ email: data });
        }
      )
    );
  };

  const handleContinueStep3 = () => {
    form.setFieldsValue({
      email: dataSubmit.email,
    });
    toggleForgotEmail();
  };

  const onGoNextStep = (nextStep) => {
    setFinishedStep(nextStep);
    setCurrentStep(nextStep);
  };

  const onGoBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateDataSubmit = (values) => {
    setDataSubmit({ ...dataSubmit, ...values });
  };

  const onResetStep = () => {
    setDataSubmit({});
    setCurrentStep(1);
    setFinishedStep(1);
  };

  return (
    <>
      <MyModal visible={showModalForgot} onCancel={toggleForgotEmail}>
        <div className="forgot-email-step">
          <MyStep
            headers={STEP_FORGOT_EMAIL}
            currentStep={currentStep}
            finishedStep={finishedStep}
          />
          <div className="content">
            {currentStep === 1 && (
              <ForgotEmailStep1 onContinue={handleContinueStep1} />
            )}
            {currentStep === 2 && (
              <ForgotEmailStep2
                values={dataSubmit}
                onContinue={handleContinueStep2}
                onGoBack={onGoBackStep}
                resendOTP={resendOTP}
              />
            )}
            {currentStep === 3 && (
              <ForgotEmailStep3
                values={dataSubmit}
                onContinue={handleContinueStep3}
                onGoBack={onResetStep}
              />
            )}
          </div>
        </div>
      </MyModal>

      <div className="header-step">Having trouble signing in?</div>
      <div className="sub-header">Enter your email to get started</div>
      <Form className="mt-20" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Email" name="email" rules={validateForm.email}>
          <MyInput
            disabled={readOnlyStep}
            placeholder="Enter your email address"
          />
        </Form.Item>

        <div className="t-right text-forgot-email">
          <span onClick={toggleForgotEmail}>Forgot email?</span>
        </div>

        {!readOnlyStep && (
          <Form.Item className="t-center mt-10" shouldUpdate={true}>
            {() => (
              <MyButton
                disabled={validateField.current.check(form)}
                size="large"
                className="btn-primary-custom"
                htmlType="submit"
              >
                Continue
              </MyButton>
            )}
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default ForgotStep1;
