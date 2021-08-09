import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import {
  MyButton,
  MyUploadSingle,
  SuccessfulScreen,
  MyModal,
  MyInput,
} from 'components/Atoms';
import { useDispatch } from 'react-redux';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { FILE_ACCEPT } from 'constants/common';
import {
  createContract,
  getContractPath,
  createContractFromTemplate,
} from 'states/contract/actions';
import ContractTemplate from '../ContractTemplate';

const ModalCreateContract = ({ jobId, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [folder, setFolder] = useState('');
  const [form] = Form.useForm();
  const [hasEmail, setHasEmail] = useState(false);

  const [modalContract, setModalContract] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(getContractPath(jobId, setFolder));
  }, []);

  const _onRemove = useCallback(() => setFileUploaded(null), []);

  const _submit = () => {
    const { id, slug } = fileUploaded;
    dispatch(
      createContract(
        {
          jobId,
          assignedEmail: form.getFieldValue('email'),

          attachment: { id, slug },
        },
        () => {
          setIsSuccessful(true);
          onSubmit();
        }
      )
    );
  };

  const toggleContractTemplate = () => {
    setModalContract((prevState) => !prevState);
  };

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description="You have created contract for this job. Back to job"
          buttonPrimaryText="Back to job"
          onClickButtonPrimary={onClose}
        />
      </div>
    );
  }

  const onCreateContract = (values) => {
    setIsLoading(true);
    dispatch(
      createContractFromTemplate({ ...values, jobId }, () => {
        onSubmit();
        onClose();
        toggleContractTemplate();
        setIsLoading(false);
      })
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

  return (
    <>
      <div className="d-table h-100p">
        <div className="d-table-cell va-m text-center">
          <h4 className="title">How do you want to create contract</h4>
          <p className="description">
            Upload your own contract or use our contract template
          </p>

          <div>
            <MyUploadSingle
              onChange={setFileUploaded}
              onRemove={_onRemove}
              folder={folder}
              accept={`${FILE_ACCEPT.CONTRACT}`}
            />
          </div>

          <br />

          <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
            <Form.Item
              label="Email"
              name="email"
              className="form-item-custom block-document-detail"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter the correct format' },
              ]}
            >
              <MyInput placeholder="Enter email" />
            </Form.Item>
          </Form>

          <div className="line-text">
            <div className="line" />
            <span className="label">or</span>
          </div>

          <MyModal visible={modalContract} onClose={toggleContractTemplate}>
            <ContractTemplate
              loading={isLoading}
              onClose={toggleContractTemplate}
              onSubmit={onCreateContract}
            />
          </MyModal>

          <MyButton
            className="btn-secondary-custom my-btn-sm"
            onClick={toggleContractTemplate}
          >
            <Icon component={IconCustom.Plus} />
            Use contract template
          </MyButton>

          <div className="py-20">
            <MyButton
              disabled={!fileUploaded || !hasEmail}
              onClick={_submit}
              className="btn-primary-custom"
            >
              Complete
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateContract;

ModalCreateContract.propTypes = {
  onClose: PropTypes.func,
  jobId: PropTypes.number,
};
