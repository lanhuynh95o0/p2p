import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import {
  CheckShare,
  Input,
  InputMultipleEmails,
  MyButton,
  SuccessfulScreen,
} from 'components/Atoms';
import { useDispatch } from 'react-redux';
import { createNote, updateNote } from 'states/note/actions';
import { DOCUMENT_PRIVACY } from 'constants/common';

const ModalUpsertNote = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [emails, setEmails] = useState([]);
  const note = props.note;

  useEffect(() => {
    if (note) {
      form.setFieldsValue(note);
      setEmails(note.assignedEmails);
    } else {
      form.setFieldsValue({ privacy: DOCUMENT_PRIVACY.EXCEPT_ALL.value });
    }
  }, [note]);

  const onFinish = (values) => {
    const onSuccess = () => {
      setIsSuccess(true);
      props.onSubmit();
    };
    const email = emails.join(';');
    form.setFieldsValue({ email });
    values.assignedEmail = email;
    if (props.note) {
      return dispatch(updateNote({ ...values, id: props.note.id }, onSuccess));
    }
    dispatch(createNote({ ...values, jobId: props.jobId }, onSuccess));
  };

  const _onEmailsChanged = (emails) => {
    setEmails(emails);
  };

  const _renderBody = () => {
    if (isSuccess)
      return (
        <SuccessfulScreen
          description={props.successText}
          buttonPrimaryText={props.successButtonText}
          onClickButtonPrimary={props.onClose}
        />
      );
    return (
      <Form className="form-upsert-note" form={form} onFinish={onFinish} layout="vertical">
        <div className="text-center">
          <h4 className="title">{props.title}</h4>
          <p className="description">{props.description}</p>
        </div>
        <div className="px-8">
          <Form.Item
            name="title"
            label="Title"
            required={false}
            className="form-item-custom ant-form-item-required"
            rules={validateForm.name}
          >
            <Input
              className="input-custom"
              type="text"
              placeholder="Enter title"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Note"
            required={false}
            className="form-item-custom ant-form-item-required"
            rules={validateForm.note}
          >
            <Input
              className="input-custom"
              type="textarea"
              placeholder="Enter note"
            />
          </Form.Item>

          <InputMultipleEmails form={form} onEmailsChange={_onEmailsChanged} emails={emails} />
          <Form.Item
            label="Email"
            className="form-item-custom"
            name="assignedEmail"
            hidden={true}
          />
          <hr className="my-20" />
          <Form.Item name="privacy">
            <CheckShare title="Who can see this note:" />
          </Form.Item>
        </div>
        <div className="text-center">
          <Form.Item noStyle shouldUpdate={true}>
            {() => (
              <MyButton
                // disabled={
                //   !(checkFormAntInvalid(form) || form.isFieldsTouched(true))
                // }
                type="primary"
                htmlType="submit"
                className="btn-primary-custom my-16"
              >
                {props.submitText}
              </MyButton>
            )}
          </Form.Item>
        </div>
      </Form>
    );
  };

  return <div className="view-content">{_renderBody()}</div>;
};

export default ModalUpsertNote;

ModalUpsertNote.propTypes = {
  onClose: PropTypes.func,
  jobId: PropTypes.number,
  note: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  submitText: PropTypes.string,
  successText: PropTypes.string,
  successButton: PropTypes.string,
};

ModalUpsertNote.defaultProps = {
  title: 'New note',
  description: 'Enter the information to create new note',
  submitText: 'Create note',
  successText: 'You have created new note. Back to your job',
  successButtonText: 'Back to job',
};

const validateForm = {
  name: [{ required: true, message: 'Please input the title of note!' }],
  note: [{ required: true, message: 'Please input the note!' }],
};
