import React, { useState, useEffect } from 'react';
import { InputCode, MyButton } from 'components/Atoms';
import { APP_INFO } from 'constants/common';
import { getEmailHide, startTimer, debounced } from 'utilities/common';
import Icon from 'components/Atoms/Icon';
import { MailOutlined } from '@ant-design/icons';

const SignupVerifyEmail = ({ values, onClose, onContinue, onResendCode }) => {
  const [isResendValid, setIsResendValid] = useState(false);
  const [codeEmail, setCodeEmail] = useState('');

  useEffect(() => {
    onCallTimer();
  }, []);

  const onCallTimer = async () => {
    const display = document.querySelector('#time-left');
    const isDone = await startTimer(59, display);
    isDone && setIsResendValid(true);
  };

  const handleConfirmVerifyEmail = () => {
    const payload = {
      identity: values.email,
      type: 'Email',
      confirmToken: codeEmail,
    };
    onContinue(payload);
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
    <div className="modal-verify-email">
      <div className="header">
        <div className="header-icon">
          <Icon component={MailOutlined} style={{ fontSize: '26px' }} />
        </div>
        <div>Get a verification code</div>
      </div>
      <div className="sub-header">
        {APP_INFO.NAME} has sent a verification code to{' '}
        {getEmailHide(values.email)}
      </div>
      <div className="input-code">
        <InputCode
          value={codeEmail}
          onChange={(value) => setCodeEmail(value)}
        />
      </div>

      <div className="resend-code">
        Did not get any code?{' '}
        <span
          onClick={handleResend}
          className={isResendValid ? 'text-resend' : 'test-resend-disabled'}
        >
          Resend code <span id="time-left" />
        </span>
      </div>

      <div className="t-center mt-30">
        <MyButton
          onClick={onClose}
          size="large"
          className="btn-outline-custom mr-10"
        >
          Back
        </MyButton>
        <MyButton
          onClick={handleConfirmVerifyEmail}
          disabled={!codeEmail || codeEmail.length < 6}
          size="large"
          className="btn-primary-custom"
        >
          Continue
        </MyButton>
      </div>
    </div>
  );
};

export default SignupVerifyEmail;
