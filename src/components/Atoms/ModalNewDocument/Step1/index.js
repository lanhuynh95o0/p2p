import React, { useCallback, useState } from 'react';
import { MyButton, MyUploadSingle } from 'components/Atoms/index';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { InputMultipleEmails } from 'components/Atoms';

const Step1 = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [emails, setEmails] = useState([]);
  const [form] = Form.useForm();

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const _changeUploadStatus = useCallback(
    (status) => () => {
      setIsUploading(status);
    },
    []
  );

  const _onUpload = useCallback((data) => {
    setFileUploaded((value) => {
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
    forceUpdate();
  }, []);

  const _onContinue = () => {
    const email = emails.join(';');
    form.setFieldsValue({ email });
    props.onNext(fileUploaded, email);
  };

  const _onEmailsChanged = (emails) => {
    setEmails(emails);
  };

  return (
    <div className={`${!props.visible && 'd-none'}`}>
      <div className="text-center">
        <h4 className="title">Upload attachments</h4>
        <p className="description">{props.description}</p>
        <div className="pb-20 ">
          <MyUploadSingle
            onChange={_onUpload}
            onRemove={_onRemove}
            multiple={true}
            onUploading={_changeUploadStatus(true)}
            onUploadDone={_changeUploadStatus(false)}
            willDeleteWhenUnmount={props.willDeleteWhenUnmount}
          />
        </div>
      </div>

      <br />

      {!props.hideAssigneeField && (
        <Form className="form-attachment-job-email" layout="vertical" form={form}>
          <InputMultipleEmails form={form} onEmailsChange={_onEmailsChanged} emails={emails} />
          <Form.Item
            label="Email"
            className="form-item-custom"
            name="email"
            hidden={true}
          />
        </Form>
      )}

      <div className="text-center">
        <MyButton
          disabled={
            isUploading ||
            !fileUploaded.length
          }
          onClick={_onContinue}
          className="btn-primary-custom mx-10"
        >
          Continue
        </MyButton>
      </div>
    </div>
  );
};

export default Step1;

Step1.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  project: PropTypes.object,
  handleBulkDelete: PropTypes.func,
  description: PropTypes.string,
  willDeleteWhenUnmount: PropTypes.bool,
  hideAssigneeField: PropTypes.bool,
};

Step1.defaultProps = {
  visible: false,
  onBack: () => { },
  hideAssigneeField: false,
};
