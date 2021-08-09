import React, { useState, useEffect } from 'react';
import { APP_INFO } from 'constants/common';
import { getPhoneHide, startTimer, debounced } from 'utilities/common';
import { InputCode } from 'components/Atoms';
import { Button } from 'antd';
import Icon from 'components/Atoms/Icon';
import { PhoneOutlined } from '@ant-design/icons';

const SignupVerifyPhone = ({
  dataSubmit,
  codePhone,
  setCodePhone,
  onCloseModalVerifyPhone,
  onConfirmVerifyPhone,
  onResendCode,
}) => {
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
      onResendCode();
      setIsResendValid(false);
      onCallTimer();
    });
  };

  return (
    <div className="modal-verify-email">
      <div className="header">
        <div className="header-icon">
          <Icon component={PhoneOutlined} style={{ fontSize: '26px' }} />
        </div>
        <div>Get a verification code</div>
      </div>
      <div className="sub-header">
        {APP_INFO.NAME} has sent a verification code to phone number{' '}
        {getPhoneHide(dataSubmit.phoneCode + dataSubmit.phone)}{' '}
      </div>

      <div className="input-code">
        <InputCode
          value={codePhone}
          onChange={(value) => setCodePhone(value)}
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
        <Button
          onClick={onCloseModalVerifyPhone}
          size="large"
          className="btn-outline-custom mr-10"
        >
          Cancel
        </Button>
        <Button
          disabled={!codePhone || codePhone.length < 6}
          className="btn-primary-custom"
          onClick={onConfirmVerifyPhone}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SignupVerifyPhone;
