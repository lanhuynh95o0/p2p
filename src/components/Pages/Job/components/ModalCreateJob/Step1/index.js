import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Input, MyButton, MyInputCost } from 'components/Atoms';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ValidateRequireField } from 'utilities/common';
import { useDispatch } from 'react-redux';
import { jobValidateName } from 'states/job/actions';
import { getTimeLocal, setHoursForDate } from 'utilities/time';

const Step1 = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [startDate, setStateDate] = useState(moment());
  const [checkName, setCheckName] = useState(false);
  const validateField = useRef(new ValidateRequireField(validateForm));
  const minDate = getTimeLocal(props.minDate);
  const maxDate = getTimeLocal(props.maxDate);

  useEffect(() => {
    const { job } = props;

    const startDate = setHoursForDate(job.startDate);
    const endDate = setHoursForDate(job.endDate, '23:59:59');

    let newStartDate = startDate;
    let newEndDate = endDate;

    if (typeof job.startDate !== 'string') {
      // let today = new moment();
      // const isExpired = today.isAfter(maxDate);

      // newStartDate = isExpired ? minDate : startDate;
      // newEndDate = isExpired ? maxDate : endDate;

      newStartDate = minDate;
      newEndDate = maxDate;
    }

    form.setFieldsValue({
      ...job,
      startDate: newStartDate,
      endDate: newEndDate,
    });
    setStateDate(newStartDate);
  }, []);

  const _handleCheckName = () => {
    const name = form.getFieldValue('name');
    if (name !== props.job?.name && name)
      dispatch(
        jobValidateName(
          {
            name: name,
            projectId: props.projectId,
          },
          () => {
            setCheckName(false);
            form.validateFields(['name']);
          },
          (message) => {
            setCheckName(message);
            form.validateFields(['name']);
          }
        )
      );
  };

  const _handleDisableStartTime = (date) =>
    date.isBefore(minDate, 'date') || date.isAfter(maxDate, 'date');

  const _handleDisableEndTime = (date) =>
    date.isBefore(startDate, 'date') || date.isAfter(maxDate, 'date');

  const _onChangeStartDate = useCallback((value) => {
    const endDate = form.getFieldValue('endDate');
    if (value > endDate) {
      form.setFieldsValue({
        endDate: value,
      });
    }
    setStateDate(value);
  }, []);

  if (props.visible)
    return (
      <Form form={form} onFinish={props.onNext} layout="vertical">
        <div className="text-center">
          <h4 className="title">{props.title}</h4>
          <p className="description">{props.description}</p>
        </div>
        <Form.Item
          name="name"
          label="Name of job"
          className="mb-0 form-item-custom p-8 ant-form-item-required"
          required={false}
          rules={[
            ...validateForm.name,
            {
              validator: () =>
                checkName ? Promise.reject(checkName) : Promise.resolve(),
            },
          ]}
        >
          <Input placeholder="Enter name of job" onBlur={_handleCheckName} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description (500 characters)"
          className="mb-0 form-item-custom p-8 ant-form-item-required"
          required={false}
          rules={validateForm.description}
        >
          <Input
            type="textarea"
            placeholder="Explain this job"
            maxLength={500}
          />
        </Form.Item>
        <Row>
          <Col span={12} className="p-8">
            <Form.Item
              name="startDate"
              label="Start date"
              className="mb-0 form-item-custom ant-form-item-required"
              required={false}
              rules={validateForm.startDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                onChange={_onChangeStartDate}
                disabledDate={_handleDisableStartTime}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="p-8">
            <Form.Item
              name="endDate"
              label="End date"
              className="mb-0 form-item-custom ant-form-item-required"
              required={false}
              rules={validateForm.endDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                disabledDate={_handleDisableEndTime}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="p-8">
          <Form.Item
            label="Estimate cost"
            className="mb-0 form-item-custom"
            required={false}
          >
            <MyInputCost
              className="input-custom input-text"
              costName="estimateCost"
              currencyName="currency"
              disableCurrency
              currencyValue={props.currency}
              form={form}
            />
          </Form.Item>
        </div>
        <div className="text-center">
          <Form.Item noStyle shouldUpdate>
            {() => (
              <MyButton
                disabled={validateField.current.check(form)}
                type="primary"
                htmlType="submit"
                className="btn-primary-custom my-16"
              >
                {props.buttonText}
              </MyButton>
            )}
          </Form.Item>
        </div>
      </Form>
    );
  return null;
};

export default Step1;

Step1.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  job: PropTypes.object,
  projectId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  currency: PropTypes.string,
};

Step1.defaultProps = {
  visible: false,
  onNext: () => {},
  title: 'New job',
  description: 'Enter information to create new job',
  buttonText: 'Create job',
};

const validateForm = {
  name: [{ required: true, message: 'Please input the job name!' }],
  description: [
    { required: true, message: 'Please input the job description!' },
  ],
  startDate: [{ required: true, message: 'Please input start date !' }],
  endDate: [{ required: true, message: 'Please input end date!' }],
  // estimateCost: [{ required: true, message: 'Please input estimate cost!' }],
};
