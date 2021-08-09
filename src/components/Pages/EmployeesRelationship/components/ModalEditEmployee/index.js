import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  MyButton,
  MyModal,
  MySelect,
  SuccessfulScreen,
} from 'components/Atoms';
import { Col, Form, Row } from 'antd';
import { checkFormAntInvalid } from 'utilities/common';
import { useSelector } from 'react-redux';
import { selectRoleEmployee } from 'states/common/selectors';
import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { editEmployee } from 'states/employee/actions';
import { useState } from 'react';

const ModalEditEmployee = ({ visible, onClose, employee, fetchEmployees }) => {
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const listRoleEmployee = useSelector(selectRoleEmployee());
  const editEmployeeAction = useActions(editEmployee);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setIsSuccess(false);
    }
  }, [visible]);

  useEffect(() => {
    if (employee?.id) {
      form.setFieldsValue({ ...employee });
    }
  }, [employee]);

  const onFinish = (values) => {
    editEmployeeAction({ ...values, id: employee?.id }, () => {
      setIsSuccess(true);
      fetchEmployees();
    });
  };

  return (
    <MyModal visible={visible} onClose={onClose}>
      <div className="view-center">
        {isSuccess ? (
          <SuccessfulScreen
            description="You have updated the employee"
            buttonPrimaryText="Back to Employees"
            onClickButtonPrimary={onClose}
          />
        ) : (
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="text-center">
              <h4 className="title">Update employee</h4>
              <p className="description">{employee?.email}</p>
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
              <Col span={24} className="px-8">
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
                    Update
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

export default ModalEditEmployee;

ModalEditEmployee.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

const validateForm = {
  firstname: [{ required: true, message: 'Please input your first name!' }],
  lastname: [{ required: true, message: 'Please input your last name!' }],
  role: [{ required: true, message: 'Please select role!' }],
};

const requiredFiled = ['firstName', 'lastName', 'role'];
