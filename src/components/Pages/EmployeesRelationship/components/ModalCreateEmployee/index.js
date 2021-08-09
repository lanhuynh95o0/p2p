import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  Input,
  MyButton,
  MyModal,
  MySelect,
  SuccessfulScreen,
} from 'components/Atoms';
import { useDispatch, useSelector } from 'react-redux';
import { inviteEmployee } from 'states/employee/actions';
import { getRoleEmployee } from 'states/common/actions';
import { selectRoleEmployee } from 'states/common/selectors';
import { checkFormAntInvalid } from 'utilities/common';
import { selectOwnProjectData } from 'states/project/selectors';

const ModalCreateEmployee = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const listRoleEmployee = useSelector(selectRoleEmployee());
  const ownProjectData = useSelector(selectOwnProjectData());

  useEffect(() => {
    dispatch(getRoleEmployee());
  }, []);

  useEffect(() => {
    form.resetFields();
    setIsSuccess(false);
  }, [props.visible]);

  const onFinish = (values) => {
    dispatch(
      inviteEmployee(values, () => {
        setIsSuccess(true);
      })
    );
  };

  return (
    <MyModal visible={props.visible} onClose={props.onClose}>
      <div className="view-center">
        {isSuccess ? (
          <SuccessfulScreen
            description="You have invited new employee. Back to manage your employees"
            buttonPrimaryText="Back to Employees"
            onClickButtonPrimary={props.onClose}
          />
        ) : (
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="text-center">
              <h4 className="title">Invite employee</h4>
              <p className="description">
                Enter the email you want to add in system
              </p>
            </div>
            <Row>
              <Col span={12} className="px-8">
                <Form.Item
                  name="firstName"
                  label="First name"
                  className="form-item-custom"
                  rules={validateForm.firstname}
                >
                  <Input
                    className="input-custom input-text"
                    placeholder="First name"
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="px-8">
                <Form.Item
                  name="lastName"
                  label="Last name"
                  className="form-item-custom"
                  rules={validateForm.lastname}
                >
                  <Input
                    className="input-custom input-text"
                    placeholder="Last name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12} className="px-8">
                <Form.Item
                  name="email"
                  label="Email"
                  className="form-item-custom"
                  rules={validateForm.email}
                >
                  <Input
                    className="input-custom input-text"
                    placeholder="Enter email"
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="px-8">
                <Form.Item
                  name="role"
                  label="Role"
                  className="form-item-custom"
                  rules={validateForm.role}
                >
                  <MySelect
                    className="select-custom-gray"
                    placeholder="Select role"
                    labelKey="text"
                    valueKey="value"
                    options={listRoleEmployee}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24} className="px-8">
                <Form.Item
                  name="projectId"
                  label="Add to project"
                  className="form-item-custom"
                >
                  <MySelect
                    options={ownProjectData}
                    showSearch
                    allowClear
                    className="select-custom-gray"
                    placeholder="Select project"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* <div className="px-8">
              </div> */}

            <div className="text-center">
              <Form.Item noStyle shouldUpdate={true}>
                {() => (
                  <MyButton
                    disabled={checkFormAntInvalid(form, requiredFiled)}
                    type="primary"
                    htmlType="submit"
                    className="btn-primary-custom my-16"
                  >
                    Invite employee
                  </MyButton>
                )}
              </Form.Item>
            </div>
          </Form>
        )}
      </div>
    </MyModal>
  );
};

export default ModalCreateEmployee;

ModalCreateEmployee.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

const validateForm = {
  email: [
    { required: true, message: 'Please input your email!' },
    { type: 'email', message: 'Email is not valid!' },
  ],
  firstname: [{ required: true, message: 'Please input your first name!' }],
  lastname: [{ required: true, message: 'Please input your last name!' }],
  role: [{ required: true, message: 'Please select role!' }],
};

const requiredFiled = ['email', 'firstName', 'lastName', 'role'];
