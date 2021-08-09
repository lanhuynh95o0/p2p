import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MyButton,
  MyUploadSingle,
  SuccessfulScreen,
  MyInput,
  MyModal,
} from 'components/Atoms';
import { APP_INFO, FILE_ACCEPT } from 'constants/common';
import { useDispatch } from 'react-redux';
import {
  getContractPath,
  updateContract,
  updateContractFromTemplate,
} from 'states/contract/actions';
import { Form } from 'antd';
import ContractTemplate from 'components/Pages/JobDetail/components/Contract/components/ContractTemplate';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { messageSuccess } from 'utilities/message';

const ModalUpdateContract = ({
  jobId,
  onClose,
  contractId,
  onSubmit,
  email,
  contract,
}) => {
  const dispatch = useDispatch();

  const [fileUploaded, setFileUploaded] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const _onRemove = useCallback(() => setFileUploaded(null), []);
  const [folder, setFolder] = useState('');

  const [form] = Form.useForm();
  const [hasEmail, setHasEmail] = useState(true);
  const [modalContract, setModalContract] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getContractPath(jobId, setFolder));
  }, []);

  const toggleContractTemplate = () => {
    setModalContract((prevState) => !prevState);
  };

  const onUpdateContract = (values) => {
    setIsLoading(true);
    dispatch(
      updateContractFromTemplate({ ...values, jobId, contractId }, () => {
        onSubmit();
        setIsSuccessful(true);
        toggleContractTemplate();
        setIsLoading(false);
      })
    );
  };

  const _submit = () => {
    const { slug } = fileUploaded;
    dispatch(
      updateContract(
        {
          body: { slug, assignedEmail: form.getFieldValue('email') },
          id: contractId,
        },
        () => {
          setIsSuccessful(true);
          onSubmit();
        }
      )
    );
  };

  const onValuesChange = (v) => {
    setTimeout(() => {
      const validate = form.getFieldError('email');

      if (validate[0]) {
        setHasEmail(false);
      } else {
        setHasEmail(true);
      }
    }, 500);
  };

  const _renderBody = useMemo(() => {
    return (
      <>
        <h4 className="title">Update sign contract</h4>
        <p className="description">
          Upload your own contract to {APP_INFO.NAME}
        </p>

        <div className="mx-n25">
          <MyUploadSingle
            onChange={setFileUploaded}
            onRemove={_onRemove}
            folder={folder}
            accept={`${FILE_ACCEPT.CONTRACT}`}
          />
        </div>

        <br />

        <Form
          layout="vertical"
          form={form}
          onValuesChange={onValuesChange}
          initialValues={{
            email,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            className="form-item-custom"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter the correct format' },
            ]}
          >
            <MyInput placeholder="Enter email" disabled />
          </Form.Item>
        </Form>
      </>
    );
  }, [fileUploaded]);

  const _renderContractTemplate = useMemo(() => {
    return (
      <>
        <div className="line-text">
          <div className="line" />
          <span className="label">or</span>
        </div>

        <MyModal visible={modalContract} onClose={toggleContractTemplate}>
          <ContractTemplate
            loading={isLoading}
            onClose={toggleContractTemplate}
            onSubmit={onUpdateContract}
            dataInit={contract}
          />
        </MyModal>

        <MyButton
          className="btn-secondary-custom my-btn-sm"
          onClick={toggleContractTemplate}
        >
          <Icon component={IconCustom.Plus} />
          Use contract template
        </MyButton>
      </>
    );
  }, [modalContract, isLoading, contract]);

  const _renderBtn = useMemo(() => {
    return (
      <div className="py-20">
        <MyButton
          disabled={!fileUploaded || !hasEmail}
          onClick={_submit}
          className="btn-primary-custom"
        >
          Continue
        </MyButton>
      </div>
    );
  }, [fileUploaded]);

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description={'You have updated this contract successfully.'}
          buttonPrimaryText="Back to contract"
          onClickButtonPrimary={onClose}
        />
      </div>
    );
  }
  return (
    <div className="text-center view-content">
      {_renderBody}
      {_renderContractTemplate}
      {_renderBtn}
    </div>
  );
};

export default ModalUpdateContract;

ModalUpdateContract.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  contractId: PropTypes.string,
};
