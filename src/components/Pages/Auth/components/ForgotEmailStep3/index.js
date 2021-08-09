import React from 'react';
import { MyButton, MyInput } from 'components/Atoms';
import { get } from 'lodash';

const ForgotEmailStep3 = ({ onContinue, onGoBack, values }) => {
  return (
    <div className="forgot-email-step-3">
      <div className="header-step">Check email</div>
      <div className="sub-header">
        Please use this email to reset your password
      </div>

      <div className="mt-10">
        <MyInput disabled type="text" value={get(values, 'email')} />
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
          onClick={onContinue}
        >
          Reset Password
        </MyButton>
      </div>
    </div>
  );
};

export default ForgotEmailStep3;
