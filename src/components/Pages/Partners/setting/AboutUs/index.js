import React from 'react';
import { Form, Tooltip } from 'antd';
import { Input } from 'components/Atoms';

const AboutUs = ({ form }) => {
  return (
    <div className="block p-10">
      <h2 className="title">
        <Tooltip title="Use this space to tell the world about how great your business is">
          <span>About us</span>
        </Tooltip>
      </h2>

      <Form.Item name="aboutUs">
        <Input
          type="textarea"
          name={'aboutUs'}
          className="input-custom info-input"
          placeholder="Use this space to tell the world about how great your business is"
        />
      </Form.Item>
    </div>
  );
};

export default AboutUs;
