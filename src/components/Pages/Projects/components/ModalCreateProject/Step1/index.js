import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Input, MyButton, SelectCurrency } from 'components/Atoms';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ValidateRequireField } from 'utilities/common';
import { useDispatch } from 'react-redux';
import { projectValidateName } from 'states/project/actions';
import { setHoursForDate } from 'utilities/time';

const Step1 = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [startDate, setStateDate] = useState(moment());
  const [checkName, setCheckName] = useState(false);

  const validateField = useRef(new ValidateRequireField(validateForm));

  const _handleCheckName = () => {
    const name = form.getFieldValue('name');

    if (name)
      dispatch(
        projectValidateName(
          name,
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

  useEffect(() => {
    const { project } = props;
    const startDate = setHoursForDate(project.startDate);
    const endDate = setHoursForDate(project.endDate, '23:59:59');
    form.setFieldsValue({
      ...project,
      startDate,
      endDate,
    });
    setStateDate(startDate);
  }, []);

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
          <p className="description">{props.message}</p>
        </div>
        <Form.Item
          name="name"
          label="Name of project"
          className="mb-0 form-item-custom ant-form-item-required p-8"
          rules={[
            ...validateForm.name,
            {
              validator: () =>
                checkName ? Promise.reject(checkName) : Promise.resolve(),
            },
          ]}
        >
          <Input
            placeholder="Enter name of project"
            onBlur={_handleCheckName}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description (500 characters)"
          className="mb-0 form-item-custom ant-form-item-required p-8"
          rules={validateForm.description}
        >
          <Input
            type="textarea"
            placeholder="What is this project for?"
            maxLength={500}
          />
        </Form.Item>
        <Row>
          <Col span={12} className="p-8">
            <Form.Item
              name="startDate"
              label="Start date"
              className="mb-0 form-item-custom"
              rules={validateForm.startDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                onChange={_onChangeStartDate}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="p-8">
            <Form.Item
              name="endDate"
              label="End date"
              className="mb-0 form-item-custom ant-form-item-required"
              rules={validateForm.endDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                disabledDate={(date) => date.isBefore(startDate, 'date')}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="p-8">
          <Form.Item
            label="Currency"
            className="mb-0 form-item-custom"
            required={true}
          >
            <SelectCurrency name="currency" form={form} />
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
  project: PropTypes.object,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Step1.defaultProps = {
  visible: false,
  onNext: () => {},
  title: 'New project',
  message: 'Enter information to create new project',
  buttonText: 'Create project',
};

const validateForm = {
  name: [
    { required: true, message: 'Please input the project name!' },
    {
      max: 30,
      message: "Project's name is too long",
    },
  ],
  description: [
    { required: true, message: 'Please input the project description!' },
  ],
  startDate: [{ required: true, message: 'Please input start date !' }],
  endDate: [{ required: true, message: 'Please input end date!' }],
};
