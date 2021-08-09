import React, { useState, useEffect } from 'react';
import { InputCode, MyButton } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { debounced, getEmailHide, startTimer } from 'utilities/common';
import { APP_INFO } from 'constants/common';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Icon from 'components/Atoms/Icon';

const ForgotStep3 = ({
  onGoBack,
  onContinue,
  values,
  readOnlyStep,
  onResendCode,
}) => {
  const [subTitle, setSubTitle] = useState('');
  const [code, setCode] = useState('');
  const [isResendValid, setIsResendValid] = useState(false);

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }
    setSubTitle(
      `${APP_INFO.NAME} has sent a verification code to ${
        values.type === 'Email'
          ? getEmailHide(values.email)
          : `•••••${values.phone}`
      }`
    );
  }, []);

  useEffect(() => {
    onCallTimer();
  }, []);

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }
    setCode(values.code);
  }, [values]);

  const onCallTimer = async () => {
    const display = document.querySelector('#time-left');
    const isDone = await startTimer(59, display);
    isDone && setIsResendValid(true);
  };

  const handleResend = () => {
    if (!isResendValid) {
      return;
    }
    debounced(() => {
      onResendCode();
      setIsResendValid(false);
      onCallTimer();
    });
  };

  return (
    <>
      <div className="header-step">
        <div className="header-icon">
          <Icon
            component={values.type === 'Email' ? MailOutlined : PhoneOutlined}
            style={{ fontSize: '26px' }}
          />
        </div>
        Get a verification code
      </div>
      <div className="sub-header">{subTitle}</div>

      <div className="t-center mt-20">
        <InputCode
          readOnlyStep={readOnlyStep}
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="t-center mt-30">
        <MyButton
          size="large"
          className="btn-outline-custom mr-10"
          onClick={onGoBack}
        >
          Back
        </MyButton>
        {!readOnlyStep && (
          <MyButton
            size="large"
            className="btn-primary-custom"
            disabled={!code || code.length < 6}
            onClick={() => onContinue(code)}
          >
            Continue
          </MyButton>
        )}
      </div>

      <div className="mt-10 resend-code-section">
        Did not get any code?
        <span
          onClick={handleResend}
          className={isResendValid ? 'text-resend' : 'test-resend-disabled'}
        >
          Resend code <span id="time-left" />
        </span>
      </div>
    </>
  );
};

export default ForgotStep3;
