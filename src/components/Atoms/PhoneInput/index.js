import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import PropTypes from 'prop-types';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import './styles.scss';

const MyPhoneInput = ({
  onChangePhoneNumber,
  defaultValue = '',
  disabled = false,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!defaultValue) return;
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    let phoneCode = '';
    let phone = '';
    const parseData = parsePhoneNumber(value || '');
    phoneCode = parseData?.countryCallingCode || '';
    phone = parseData?.nationalNumber || '';

    onChangePhoneNumber({
      phoneCode,
      phone,
    });
  }, [value]);

  const onChangeValue = (value = '') => {
    setValue(value.slice(0, 15));
  };

  return (
    <Input.Group compact>
      <div className="phone-input-custom">
        <PhoneInput
          disabled={disabled}
          defaultCountry="AU"
          withCountryCallingCode
          international
          placeholder="Enter phone number"
          value={value}
          onChange={onChangeValue}
        />
      </div>
    </Input.Group>
  );
};

MyPhoneInput.propTypes = {
  disabled: PropTypes.bool,
};

MyPhoneInput.defaultProps = {
  disabled: false,
};

export default MyPhoneInput;
