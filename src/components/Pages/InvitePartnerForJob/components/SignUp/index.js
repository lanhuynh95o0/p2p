import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { InputCode, MyButton, MyStep } from 'components/Atoms';
import { STEP_SIGN_UP } from 'components/Pages/Auth/constants';
import SignupStep1 from './Step1';
import {
  SignupStep2,
  SignupStep3,
  SignupStep4,
  SignupStep5,
  SignupStep6,
} from 'components/Pages/Auth/components';
import { useDispatch } from 'react-redux';
import {
  confirmVerifyEmailOrPhone,
  login,
  registerUser,
  verifyEmailOrPhone,
} from 'states/auth/actions';
import { getEmailHide, getPhoneHide, getPhoneNumber } from 'utilities/common';
import 'components/Pages/Auth/pages/SignUp/styles.scss';
import { APP_INFO } from 'constants/common';

const SignUpPage = ({ email, onSubmit }) => {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [dataSubmit, setDataSubmit] = useState({ email });

  const [codeEmail, setCodeEmail] = useState('');
  const [showModalVerifyEmail, setShowModalVerifyEmail] = useState(false);

  const [codePhone, setCodePhone] = useState('');
  const [showModalVerifyPhone, setShowModalVerifyPhone] = useState(false);

  const readOnlyStep = false;
  const updateDataSubmit = (values) => {
    setDataSubmit({ ...dataSubmit, ...values });
  };

  const handleVerifyEmail = (values) => {
    updateDataSubmit(values);
    dispatch(
      verifyEmailOrPhone(
        {
          identity: values.email,
          type: 'Email',
        },
        () => {
          setShowModalVerifyEmail(true);
        }
      )
    );
  };

  const handleConfirmVerifyEmail = () => {
    const payload = {
      identity: dataSubmit.email,
      type: 'Email',
      confirmToken: codeEmail,
    };
    dispatch(
      confirmVerifyEmailOrPhone(payload, () => {
        onGoNextStep(2);
        onCloseModalVerifyEmail();
      })
    );
  };

  const onCloseModalVerifyEmail = () => {
    setShowModalVerifyEmail(false);
    setCodeEmail('');
  };

  const onCloseModalVerifyPhone = () => {
    setShowModalVerifyPhone(false);
    setCodePhone('');
  };

  const handleConfirmVerifyPhone = (values) => {
    updateDataSubmit(values);
    dispatch(
      verifyEmailOrPhone(
        {
          identity: values.phoneCode + getPhoneNumber(values.phone),
          phoneCode: values.phoneCode,
          type: 'Phone',
        },
        () => {
          setShowModalVerifyPhone(true);
        }
      )
    );
  };

  const onConfirmVerifyPhone = () => {
    const payload = {
      identity: dataSubmit.phoneCode + getPhoneNumber(dataSubmit.phone),
      phoneCode: dataSubmit.phoneCode,
      type: 'Phone',
      confirmToken: codePhone,
    };
    dispatch(
      confirmVerifyEmailOrPhone(payload, () => {
        onCloseModalVerifyPhone();
        onGoNextStep(3);
      })
    );
  };

  const onGoNextStep = (nextStep) => {
    setFinishedStep(nextStep);
    setCurrentStep(nextStep);
  };

  const onGoBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const _submit = (values) => {
    const body = { ...dataSubmit, ...values };
    body.phone = getPhoneNumber(body.phone);
    delete body.newPassword;
    delete body.organizationLogoUrl;
    dispatch(
      registerUser(body, () => {
        const { email, password } = body;
        dispatch(login({ email, password }, onSubmit));
      })
    );
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-content mt-100">
        <div className="sign-up-step">
          <MyStep
            currentStep={currentStep}
            finishedStep={finishedStep}
            headers={STEP_SIGN_UP}
          />

          <div className="content">
            {currentStep === 1 && (
              <>
                <SignupStep1
                  values={dataSubmit}
                  onVerifyEmail={handleVerifyEmail}
                  finishedStep={finishedStep}
                  currentStep={currentStep}
                  readOnlyStep={readOnlyStep}
                />

                <Modal
                  visible={showModalVerifyEmail}
                  footer={null}
                  onCancel={onCloseModalVerifyEmail}
                  destroyOnClose
                >
                  <div className="modal-verify-email">
                    <div className="header">Get a verification code</div>
                    <div className="sub-header">
                      {APP_INFO.NAME} has sent a verification code to{' '}
                      {getEmailHide(dataSubmit.email)}
                    </div>
                    <div className="input-code">
                      <InputCode
                        value={codeEmail}
                        onChange={(value) => setCodeEmail(value)}
                      />
                    </div>
                    <div className="t-center mt-30">
                      <MyButton
                        onClick={onCloseModalVerifyEmail}
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
                </Modal>
              </>
            )}
            {currentStep === 2 && (
              <>
                <SignupStep2
                  values={dataSubmit}
                  readOnlyStep={readOnlyStep}
                  onGoBack={onGoBackStep}
                  onContinue={(values) => {
                    handleConfirmVerifyPhone(values);
                  }}
                />
                <Modal
                  visible={showModalVerifyPhone}
                  footer={null}
                  onCancel={onCloseModalVerifyPhone}
                  destroyOnClose
                >
                  <div className="modal-verify-email">
                    <div className="header">Get a verification code</div>
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

                    <div className="t-center">
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
                </Modal>
              </>
            )}

            {currentStep === 3 && (
              <SignupStep3
                readOnlyStep={readOnlyStep}
                onGoBack={onGoBackStep}
                values={dataSubmit}
                onContinue={(values) => {
                  updateDataSubmit(values);
                  onGoNextStep(4);
                }}
              />
            )}

            {currentStep === 4 && (
              <SignupStep4
                values={dataSubmit}
                readOnlyStep={readOnlyStep}
                onGoBack={onGoBackStep}
                onContinue={(values) => {
                  updateDataSubmit(values);
                  onGoNextStep(5);
                }}
              />
            )}

            {currentStep === 5 && (
              <SignupStep5
                values={dataSubmit}
                readOnlyStep={readOnlyStep}
                onGoBack={onGoBackStep}
                onContinue={(values) => {
                  updateDataSubmit(values);
                  onGoNextStep(6);
                }}
              />
            )}

            {currentStep === 6 && (
              <SignupStep6 onGoBack={onGoBackStep} onContinue={_submit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
