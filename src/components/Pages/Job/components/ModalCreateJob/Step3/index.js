import React, { useCallback, useState } from 'react';
import { InputMultipleEmails, MyButton, MyUploadSingle } from 'components/Atoms';
import PropTypes from 'prop-types';
import { DOCUMENT_PRIVACY } from 'constants/common';
import { Form } from 'antd';

const Step3 = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [emails, setEmails] = useState([]);
  const [form] = Form.useForm();

  const _changeUploadStatus = useCallback(
    (status) => () => {
      setIsUploading(status);
    },
    []
  );

  const _onUpload = useCallback((data) => {
    setFileUploaded((value) => {
      data.privacy = DOCUMENT_PRIVACY.EXCEPT_ALL.value;
      value.push(data);
      return value;
    });
  }, []);

  const _onRemove = useCallback((data) => {
    setFileUploaded((value) => {
      const index = value.findIndex((_) => _.id === data.id);
      if (index >= 0) {
        value.splice(index, 1);
      }
      return value;
    });
  }, []);

  const _onEmailsChanged = (emails) => {
    setEmails(emails);
  };

  const _onContinue = () => {
    const email = emails.join(';');
    form.setFieldsValue({ email });
    props.onNext(fileUploaded, email);
  };

  return (
    <div style={{ display: !props.visible && 'none' }}>
      <div className="text-center">
        <h4 className="title">Upload attachments</h4>
        <p className="description">
          Upload attachments of this job or you can skip for later
        </p>
        <div>
          <MyUploadSingle
            onChange={_onUpload}
            onRemove={_onRemove}
            multiple={true}
            onUploading={_changeUploadStatus(true)}
            onUploadDone={_changeUploadStatus(false)}
          />
        </div>
        <br />

        <Form className="form-attachment-job-email" layout="vertical" form={form}>
          <InputMultipleEmails form={form} onEmailsChange={_onEmailsChanged} emails={emails} />
          <Form.Item
            label="Email"
            className="form-item-custom"
            name="email"
            hidden={true}
          />
        </Form>
      </div>
      <div className="text-center pt-20">
        <MyButton
          disabled={isUploading}
          onClick={props.onBack}
          className="btn-secondary-custom mx-10"
        >
          Back
        </MyButton>
        <MyButton
          disabled={isUploading}
          onClick={_onContinue}
          className="btn-primary-custom mx-10"
        >
          Continue
        </MyButton>
      </div>
    </div>
  );
};

export default Step3;

Step3.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  project: PropTypes.object,
};

Step3.defaultProps = {
  visible: false,
  onNext: () => { },
  onBack: () => { },
};
