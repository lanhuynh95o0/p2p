import React, { useState } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './styles.scss';

const MyMultiSelect = ({
  onChange,
  allowClear,
  disabled,
  showSearch,
  placeholder,
  value,
  labelKey,
  disabledKey,
  valueKey,
  options,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const handleChange = (currentValue) => {
    if (currentValue?.includes('all')) {
      if (currentValue.length === options.length + 1) {
        return onChange([]);
      }
      return onChange(options.map((it) => it.id));
    }
    onChange(currentValue);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onDropdownVisibleChange = (open) => {
    setIsOpenDropDown(open);
  };

  return (
    <Select
      suffixIcon={
        isOpenDropDown ? (
          <CaretUpOutlined style={{ color: '#878787', fontSize: 14 }} />
        ) : (
          <CaretDownOutlined style={{ color: '#878787', fontSize: 14 }} />
        )
      }
      onDropdownVisibleChange={onDropdownVisibleChange}
      bordered={false}
      maxTagCount="responsive"
      disabled={disabled}
      showSearch={showSearch}
      onChange={handleChange}
      size="large"
      placeholder={placeholder}
      className={'multi-select'}
      value={value}
      filterOption={filterOption}
      showAction={['focus', 'click']}
      tokenSeparators={[',']}
      mode="multiple"
      allowClear={allowClear}
      showArrow
    >
      {options.length !== 0 && (
        <Select.Option key="all" value="all">
          All
        </Select.Option>
      )}
      {options.map((option) => (
        <Select.Option
          key={option[valueKey]}
          value={option[valueKey]}
          disabled={option[disabledKey]}
        >
          {option[labelKey]}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MyMultiSelect;
