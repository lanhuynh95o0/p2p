import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { InputCode, MyStep, SuccessfulScreen } from 'components/Atoms';
import { STEP_SIGN_UP } from '../../constants';
import {
  SignupStep1,
  SignupStep2,
  SignupStep3,
  SignupStep4,
  SignupStep5,
  SignupStep6,
  SignupVerifyEmail,
  SignupVerifyPhone,
} from 'components/Pages/Auth/components';
import { useDispatch } from 'react-redux';
import {
  confirmVerifyEmailOrPhone,
  registerUser,
  verifyEmailOrPhone,
} from 'states/auth/actions';
import * as routeName from 'routers/route-name';
import { HOME, LOGIN, SUBSCRIPTIONS } from 'routers/route-path';
import { getPhoneHide, getPhoneNumber } from 'utilities/common';

import { login } from 'states/auth/actions';
import { get } from 'lodash';
import './styles.scss';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [dataSubmit, setDataSubmit] = useState({});

  const [showModalVerifyEmail, setShowModalVerifyEmail] = useState(false);

  const [codePhone, setCodePhone] = useState('');
  const [showModalVerifyPhone, setShowModalVerifyPhone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleConfirmEmail = (payload) => {
    dispatch(
      confirmVerifyEmailOrPhone(payload, () => {
        onGoNextStep(2);
        onCloseModalVerifyEmail();
      })
    );
  };

  const handleResendCode = () => {
    dispatch(
      verifyEmailOrPhone(
        { identity: dataSubmit.email, type: 'Email' },
        () => null
      )
    );
  };

  const handleResendPhoneCode = () => {
    dispatch(
      verifyEmailOrPhone(
        {
          identity: dataSubmit.phoneCode + getPhoneNumber(dataSubmit.phone),
          phoneCode: dataSubmit.phoneCode,
          type: 'Phone',
        },
        () => null
      )
    );
  };

  const onCloseModalVerifyEmail = () => {
    setShowModalVerifyEmail(false);
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

  const _finishSignup = (values) => {
    const body = {
      ...dataSubmit,
      ...values,
      longitude: dataSubmit.lng,
      latitude: dataSubmit.lat,
    };
    body.phone = getPhoneNumber(body.phone);
    delete body.newPassword;
    delete body.organizationLogoUrl;
    dispatch(
      registerUser(body, () => {
        // setIsSuccess(true);

        dispatch(
          login(
            {
              email: dataSubmit.email,
              password: dataSubmit.password,
            },
            () => {
              history.push(SUBSCRIPTIONS);
            },
            (error) => {
              history.push(LOGIN);
            }
          )
        );
      })
    );
  };

  if (isSuccess) {
    return (
      <div className="sign-up-page">
        <div className="sign-up-header">
          <span className="question mr-10">Already have an account ?</span>
          <Button size="large" className="btn-primary-custom">
            <Link to={routeName.LOGIN + window.location.search}>Log in</Link>
          </Button>
        </div>

        <div className="success-page">
          <SuccessfulScreen
            description="You have been a member of B2B Edge. Tap “Go to Dashboard” to start your experience with B2B Edge"
            buttonPrimaryText="Go to dashboard"
            onClickButtonPrimary={() => {
              const payload = {
                email: dataSubmit.email,
                password: dataSubmit.password,
              };
              dispatch(
                login(
                  payload,
                  () => {
                    if (get(location, 'location.state.from')) {
                      history.push(location.state.from.pathname);
                      return;
                    }
                    history.push(HOME);
                  },
                  (error) => {
                    history.push(LOGIN);
                  }
                )
              );
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="sign-up-page">
      <div className="sign-up-header">
        <span className="question mr-10">Already have an account ?</span>
        <Button size="large" className="btn-primary-custom">
          <Link to={routeName.LOGIN}>Log in</Link>
        </Button>
      </div>

      <div className="sign-up-content">
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
                  maskClosable={false}
                  onCancel={onCloseModalVerifyEmail}
                  destroyOnClose
                >
                  <SignupVerifyEmail
                    onClose={onCloseModalVerifyEmail}
                    values={dataSubmit}
                    onContinue={handleConfirmEmail}
                    onResendCode={handleResendCode}
                  />
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
                  maskClosable={false}
                >
                  <SignupVerifyPhone
                    dataSubmit={dataSubmit}
                    codePhone={codePhone}
                    setCodePhone={setCodePhone}
                    onCloseModalVerifyPhone={onCloseModalVerifyPhone}
                    onConfirmVerifyPhone={onConfirmVerifyPhone}
                    onResendCode={handleResendPhoneCode}
                  />
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

            {/* {currentStep === 5 && (
              <SignupStep5
                values={dataSubmit}
                readOnlyStep={readOnlyStep}
                onGoBack={onGoBackStep}
                onContinue={(values) => {
                  updateDataSubmit(values);
                  onGoNextStep(6);
                }}
              />
            )} */}

            {currentStep === 5 && (
              <SignupStep6
                onGoBack={onGoBackStep}
                onContinue={_finishSignup}
                isAccept={dataSubmit.isAccept}
                setAccept={(v) => {
                  updateDataSubmit(v);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
