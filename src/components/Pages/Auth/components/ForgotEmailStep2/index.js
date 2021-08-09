import React, { useState, useEffect } from 'react';
import { debounced, getPhoneHide, startTimer } from 'utilities/common';
import { InputCode, MyButton } from 'components/Atoms';

const ForgotEmailStep2 = ({ values, onContinue, onGoBack, resendOTP }) => {
  const [code, setCode] = useState('');
  const [isResendValid, setIsResendValid] = useState(false);

  useEffect(() => {
    onCallTimer();
  }, []);

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
      resendOTP();
      setIsResendValid(false);
      onCallTimer();
    });
  };

  return (
    <div className="forgot-email-step-2">
      <div className="header-step">Get a verification code</div>
      <div className="sub-header">
        B2B Edge has sent a verification code to phone number{' '}
        {getPhoneHide(values.phoneCode + values.phone)}
      </div>

      <div className="t-center mt-20">
        <InputCode value={code} onChange={(value) => setCode(value)} />
      </div>

      <div className="t-center mt-30">
        <MyButton
          size="large"
          className="btn-outline-custom mr-10"
          onClick={onGoBack}
        >
          Back
        </MyButton>
        <MyButton
          size="large"
          className="btn-primary-custom"
          disabled={!code || code.length < 6}
          onClick={() => onContinue(code)}
        >
          Continue
        </MyButton>
      </div>

      <div className="mt-10 resend-code-section text-center">
        Did not get any code?{' '}
        <span
          onClick={handleResend}
          className={isResendValid ? 'text-resend' : 'test-resend-disabled'}
        >
          Resend code <span id="time-left" />
        </span>
      </div>
    </div>
  );
};

export default ForgotEmailStep2;
