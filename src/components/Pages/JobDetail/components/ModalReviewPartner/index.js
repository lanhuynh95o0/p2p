import React, { useEffect, useState } from 'react';
import { Form, Rate, Switch } from 'antd';
import PropTypes from 'prop-types';
import { Input, MyButton, SuccessfulScreen } from 'components/Atoms';
import { useDispatch } from 'react-redux';
import { checkFormAntInvalid } from 'utilities/common';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { reviewPartner } from 'states/partner/actions';
import './styles.scss';

const ModalReviewPartner = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    form.setFieldsValue(props.review);
  }, []);

  const onFinish = (values) => {
    dispatch(
      reviewPartner(
        { ...values, jobId: props.jobId, revieweeId: props.revieweeId },
        () => {
          props.onSubmit();
          setIsSuccess(true);
        }
      )
    );
  };

  if (isSuccess) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description={props.successText}
          buttonPrimaryText={props.successButtonText}
          onClickButtonPrimary={props.onClose}
        />
      </div>
    );
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="view-content modal-review-partner"
    >
      <div className="text-center">
        <h4 className="title">{props.title}</h4>
        {!props.disable && <p className="description">{props.description}</p>}
      </div>
      <div className="px-8">
        <div className="text-center">
          <Form.Item
            name="rating"
            required={false}
            className="form-item-custom"
            rules={validateForm.rating}
          >
            <Rate
              disabled={props.disable}
              character={<Icon component={IconCustom.Star} />}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="comment"
          label="Review"
          required={false}
          className="form-item-custom"
          rules={validateForm.review}
        >
          <Input
            className="input-custom"
            type="textarea"
            disabled={props.disable}
            placeholder="What do you think about this company?"
          />
        </Form.Item>
        <Form.Item
          name="reviewAsAnonymous"
          label="Review as Anonymous"
          valuePropName="checked"
          className="form-item-custom"
        >
          <Switch disabled={props.disable} />
        </Form.Item>
      </div>
      <div className="text-center">
        <MyButton
          onClick={props.onClose}
          className="btn-secondary-custom mx-10"
        >
          {props.cancelText}
        </MyButton>
        {!props.disable && (
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
        )}
      </div>
    </Form>
  );
};

export default ModalReviewPartner;

ModalReviewPartner.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  comment: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  submitText: PropTypes.string,
  successText: PropTypes.string,
  successButton: PropTypes.string,
  revieweeId: PropTypes.number,
};

ModalReviewPartner.defaultProps = {
  title: 'Review Contractor',
  description: 'Rating contractor by filling these information',
  cancelText: 'Close',
  submitText: 'Add review',
  successText: 'You have add a review to this company successfully.',
  successButtonText: 'Close',
  onSubmit: () => {},
};

const validateForm = {
  rating: [{ min: 1, message: 'Please choose your rating!', type: 'number' }],
  review: [{ required: true, message: 'Please input the review!' }],
};
