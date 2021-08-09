import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { InputCode, SuccessfulScreen } from 'components/Atoms';
import InviteEmployeeForm from 'components/Pages/VerifyEmployee/components/InviteEmployeeForm';
import { useDispatch } from 'react-redux';
import {
  confirmVerifyEmailOrPhone,
  verifyEmailOrPhone,
} from 'states/auth/actions';
import './styles.scss';
import {
  getInviteEmployeeInfo,
  registerInviteEmployee,
} from 'states/employee/actions';
import * as routePath from 'routers/route-path';
import { withRouter, useHistory } from 'react-router-dom';
import { APP_INFO } from 'constants/common';
import Icon from 'components/Atoms/Icon';
import { PhoneOutlined } from '@ant-design/icons';
import { getPhoneNumber } from 'utilities/common';

const SignUpPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dataSubmit, setDataSubmit] = useState({});
  const [codePhone, setCodePhone] = useState('');
  const [showModalVerifyPhone, setShowModalVerifyPhone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getInviteEmployeeInfo(id, setDataSubmit));
  }, []);

  const updateDataSubmit = (values) => {
    setDataSubmit({ ...dataSubmit, ...values });
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
          identity: values.phoneCode + values.phone,
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
      identity: dataSubmit.phoneCode + dataSubmit.phone,
      phoneCode: dataSubmit.phoneCode,
      type: 'Phone',
      confirmToken: codePhone,
    };
    dispatch(
      confirmVerifyEmailOrPhone(payload, () => {
        onCloseModalVerifyPhone();
        registerEmployee();
      })
    );
  };

  const registerEmployee = () => {
    dispatch(
      registerInviteEmployee(
        {
          firstName: dataSubmit.firstName,
          lastName: dataSubmit.lastName,
          phoneCode: dataSubmit.phoneCode,
          phone: dataSubmit.phone,
          email: dataSubmit.email,
          partnerId: dataSubmit.partnerId,
          password: dataSubmit.password,
          role: dataSubmit.role,
          title: dataSubmit.title,
          projectId: dataSubmit.projectId,
        },
        () => {
          setIsSuccess(true);
        }
      )
    );
  };

  const _goToLogin = () => {
    history.push(routePath.LOGIN);
  };

  return (
    <div className="verify-employee-page">
      <div className="sign-up-content">
        <div className="sign-up-step">
          <div className="content">
            {isSuccess ? (
              <SuccessfulScreen
                description={`You have been a member of ${APP_INFO.NAME}. Click "Go to login" to start your experience with ${APP_INFO.NAME}`}
                buttonPrimaryText="Go to login"
                onClickButtonPrimary={_goToLogin}
              />
            ) : (
              <>
                <InviteEmployeeForm
                  values={dataSubmit}
                  onContinue={(values) => {
                    handleConfirmVerifyPhone(values);
                  }}
                />
                <Modal
                  visible={showModalVerifyPhone}
                  footer={null}
                  onCancel={onCloseModalVerifyPhone}
                >
                  <div className="modal-verify-email">
                    <div className="header">
                      <div className="header-icon">
                        <Icon
                          component={PhoneOutlined}
                          style={{ fontSize: '26px' }}
                        />
                      </div>
                      Get a verification code
                    </div>
                    <div className="sub-header">
                      {APP_INFO.NAME} has sent a verification code to phone
                      number {dataSubmit.phoneCode}
                      {getPhoneNumber(dataSubmit.phone)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUpPage);
