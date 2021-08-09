import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { Input, MyButton, SuccessfulScreen } from 'components/Atoms';
import { useDispatch } from 'react-redux';
import { checkFormAntInvalid } from 'utilities/common';
import { updateComment } from 'states/comment/actions';

const ModalUpdateComment = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (props.comment) {
      form.setFieldsValue(props.comment);
    }
  }, []);

  const onFinish = (values) => {
    dispatch(
      updateComment({ ...values, id: props.comment.id }, () => {
        setIsSuccess(true);
        props.onSubmit();
      })
    );
  };

  return (
    <div className="view-center">
      {isSuccess ? (
        <SuccessfulScreen
          description={props.successText}
          buttonPrimaryText={props.successButtonText}
          onClickButtonPrimary={props.onClose}
        />
      ) : (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="text-center">
            <h4 className="title">{props.title}</h4>
            <p className="description">{props.description}</p>
          </div>
          <div className="px-8">
            <Form.Item
              name="content"
              label="Comment"
              required={false}
              className="form-item-custom"
              rules={validateForm.comment}
            >
              <Input
                className="input-custom"
                type="textarea"
                placeholder="Enter your comment"
              />
            </Form.Item>
          </div>
          <div className="text-center">
            <MyButton
              onClick={props.onClose}
              className="btn-secondary-custom mx-10"
            >
              {props.cancelText}
            </MyButton>
            <Form.Item noStyle shouldUpdate={true}>
              {() => (
                <MyButton
                  disabled={
                    !(checkFormAntInvalid(form) || form.isFieldsTouched(true))
                  }
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
      )}
    </div>
  );
};

export default ModalUpdateComment;

ModalUpdateComment.propTypes = {
  onClose: PropTypes.func,
  comment: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  submitText: PropTypes.string,
  successText: PropTypes.string,
  successButton: PropTypes.string,
};

ModalUpdateComment.defaultProps = {
  title: 'Update comment',
  description: 'Enter the text to update this comment',
  cancelText: 'Cancel',
  submitText: 'Save',
  successText: 'You have updated this comment.',
  successButtonText: 'Back',
};

const validateForm = {
  comment: [{ required: true, message: 'Please input the comment!' }],
};
