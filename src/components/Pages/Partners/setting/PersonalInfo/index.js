import React from 'react';
import { Col, Form, Row } from 'antd';
import { Input } from 'components/Atoms';

const PersonalInfo = ({ validateForm }) => {
  return (
    <div className="block p-10">
      <h2 className="title">Personal Information</h2>
      <Row className="m-n8">
        <Col span={12} className="px-8">
          {/* First name */}
          <Form.Item
            name="firstName"
            label="First name"
            className="form-item-custom"
            rules={validateForm.firstname}
          >
            <Input name={'First name'} className="input-custom info-input" />
          </Form.Item>
        </Col>
        <Col span={12} className="px-8">
          {/* Last name */}
          <Form.Item
            name="lastName"
            label="Last name"
            className="form-item-custom"
            rules={validateForm.lastname}
          >
            <Input name={'Last name'} className="input-custom info-input" />
          </Form.Item>
        </Col>
      </Row>
      {/* Title */}
      <Form.Item
        name="title"
        label="Title"
        className="form-item-custom"
        rules={validateForm.title}
      >
        <Input name={'title'} className="input-custom info-input" />
      </Form.Item>
    </div>
  );
};

export default PersonalInfo;
