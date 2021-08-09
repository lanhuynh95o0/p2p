import React from 'react';
import { Checkbox } from 'antd';
import './styles.scss';

const CheckboxGroup = Checkbox.Group;

const MyCheckbox = ({ options, value, onChange, className }) => {
  return (
    <div id="my-checkbox" className={className}>
      <CheckboxGroup options={options} value={value} onChange={onChange} />
    </div>
  );
};

export default MyCheckbox;
