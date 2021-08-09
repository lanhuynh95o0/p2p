import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';

const MyRadio = (props) => {
  const handleChange = (e) => {
    const onChange = props.onChange;
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      id="radio-custom"
      onChange={handleChange}
      value={props.value}
      disabled={props.disabled}
    >
      {props.options.map((option) => (
        <div key={option.value}>
          <Radio value={option.value} disabled={option?.disabled}>
            <div className={`title ${props.radioClassName}`}>
              {option.title}
            </div>
            <div className={`sub-title ${props.radioClassName}`}>
              {option.subTitle}
            </div>
          </Radio>
        </div>
      ))}
    </Radio.Group>
  );
};

MyRadio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

MyRadio.defaultProps = {
  name: 'field-name',
  disabled: false,
  options: [
    {
      title: 'Via email',
      subTitle:
        'We will send verification code to your email address hu•••••.com',
      value: 1,
    },
    {
      title: 'Via phone',
      subTitle: 'We will send verification code to your phone number •••••7575',
      value: 2,
    },
  ],
  radioClassName: '',
};

export default MyRadio;
