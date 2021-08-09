import React, { useState } from 'react';
import { MyStep, MyButton, MyModal, SuccessfulScreen } from 'components/Atoms';
import { useDispatch } from 'react-redux';
import {
  requestForgotPassword,
  requestConfirmUser,
  confirmUser,
  resetPassword,
} from 'states/auth/actions';
import {
  ForgotStep1,
  ForgotStep2,
  ForgotStep3,
  ForgotStep4,
} from '../../components';
import * as routerPath from 'routers/route-path';
import { Link, useHistory } from 'react-router-dom';
import './styles.scss';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({});
  const readOnlyStep = false;

  const updateDataSubmit = (values) => {
    setDataSubmit({ ...dataSubmit, ...values });
  };

  const onGoNextStep = (nextStep) => {
    setFinishedStep(nextStep);
    setCurrentStep(nextStep);
  };

  const onGoBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onRequestForgotPassword = (values) => {
    dispatch(
      requestForgotPassword({ email: values.email }, (phone) => {
        updateDataSubmit({ phone, email: values.email });
        onGoNextStep(2);
      })
    );
  };

  const handleVerifyEmailOrPhone = (values) => {
    updateDataSubmit(values);
    let payload = {
      email: dataSubmit.email,
      type: values.type,
    };
    requestVerifyEmailOrPhone(payload, true);
  };

  const requestVerifyEmailOrPhone = (payload, isGoStep3 = false) => {
    dispatch(
      requestConfirmUser(payload, () => {
        isGoStep3 && onGoNextStep(3);
        setDataSubmit({
          ...dataSubmit,
          type: payload.type,
          isVerified: false,
          code: '',
        });
      })
    );
  };

  const handleConfirmUser = (code) => {
    if (dataSubmit.isVerified) {
      onGoNextStep(4);
      return;
    }
    const payload = {
      email: dataSubmit.email,
      token: code,
      type: dataSubmit.type,
      isPasswordReset: true
    };
    dispatch(
      confirmUser(payload, (tokenVerification) => {
        setDataSubmit({
          ...dataSubmit, code,
          isVerified: true,
          setPasswordToken: tokenVerification ? tokenVerification.confirmToken : null
        });
        onGoNextStep(4);
      })
    );
  };

  const handleResendCode = () => {
    requestVerifyEmailOrPhone({
      email: dataSubmit.email,
      type: dataSubmit.type,
    });
  };

  return (
    <>
      <div className="header-auth">
        <span className="question mr-10">Don't have an account?</span>
        <MyButton size="large" className="btn-primary-custom">
          <Link to={routerPath.SIGNUP + window.location.search}>
            Get started
          </Link>
        </MyButton>
      </div>
      <div className="forgot-password-container">
        <div className="forgot-password-form">
          <div className="forgot-password-step">
            <MyStep currentStep={currentStep} finishedStep={finishedStep} />
          </div>

          <div className="content">
            {currentStep === 1 && (
              <ForgotStep1
                readOnlyStep={readOnlyStep}
                values={dataSubmit}
                onContinue={onRequestForgotPassword}
              />
            )}
            {currentStep === 2 && (
              <>
                <ForgotStep2
                  readOnlyStep={readOnlyStep}
                  values={dataSubmit}
                  onContinue={handleVerifyEmailOrPhone}
                  onGoBack={onGoBackStep}
                />
              </>
            )}
            {currentStep === 3 && (
              <ForgotStep3
                readOnlyStep={readOnlyStep}
                values={dataSubmit}
                onContinue={handleConfirmUser}
                onGoBack={onGoBackStep}
                onResendCode={handleResendCode}
              />
            )}
            {currentStep === 4 && (
              <>
                <ForgotStep4
                  onGoBack={onGoBackStep}
                  onContinue={(values) => {
                    const payload = {
                      email: dataSubmit.email,
                      newPassword: values.password,
                      setPasswordToken: dataSubmit.setPasswordToken
                    };
                    dispatch(
                      resetPassword(payload, () => {
                        setShowSuccessModal(true);
                      })
                    );
                  }}
                />
                <MyModal visible={showSuccessModal}>
                  <SuccessfulScreen
                    description="You have change to new password. Please log in again to continue to Link"
                    buttonPrimaryText="Log in"
                    onClickButtonPrimary={() => history.push(routerPath.LOGIN)}
                  />
                </MyModal>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
