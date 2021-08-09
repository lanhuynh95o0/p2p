import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import './styles.scss';
import Image from '../Image';

const MySelect = (props) => {
  const onChange = props.onChange;

  const [iconSuffix, setIconSuffix] = useState(
    <CaretDownOutlined className="icon-caret-custom" />
  );

  const selectRef = useRef(null);

  useEffect(() => {
    if (props.value && props.allowClear) {
      setIconSuffix(
        <Icon
          className="icon-clear-custom"
          component={IconCustom.Close}
          onClick={onClearValue}
        />
      );
      return;
    }
    setIconSuffix(
      <CaretDownOutlined className="icon-caret-custom" onClick={_focus} />
    );
  }, [props.value]);

  const onClearValue = () => {
    onChange('');
    props.onSelect('');
  };

  const handleChange = (value) => {
    onChange(value);
    props.onSelect(value);
  };

  const _focus = () => {
    if (selectRef.current) selectRef.current.focus();
  };

  const _blur = () => {
    if (selectRef.current) selectRef.current.blur();
  };

  const onDropdownVisibleChange = (open) => {
    if (open) {
      setIconSuffix(
        <CaretUpOutlined className="icon-caret-custom" onClick={_blur} />
      );
      return;
    }
    setIconSuffix(
      <CaretDownOutlined className="icon-caret-custom" onClick={_focus} />
    );
  };

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <div id="my-select" className={props.containerClassName}>
      <Select
        disabled={props.disabled}
        showSearch={props.showSearch}
        onChange={handleChange}
        ref={selectRef}
        id="select-focus"
        // onInput
        size="large"
        placeholder={props.placeholder}
        className={props.className || 'select-custom'}
        value={props.value || undefined}
        suffixIcon={props.disabled ? null : iconSuffix}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownMatchSelectWidth={false}
        allowClear={false}
        filterOption={filterOption}
        showAction={['focus', 'click']}
        dropdownRender={props.dropdownRender}
      >
        {props.options.map((option) => (
          <Select.Option
            key={option[props.valueKey]}
            value={option[props.valueKey]}
            label={option[props.labelKey]}
            className="my-select-option my-select-custom-item"
            disabled={option[props.disabledKey]}
          >
            {props.renderItem ? (
              <div className="my-select-custom-item">
                {props.renderItem(option)}
              </div>
            ) : (
              <>
                {option.icon && (
                  <Image src={option.icon} className="my-select-option-icon" />
                )}
                <span className="my-select-text">{option[props.labelKey]}</span>
              </>
            )}
            <Icon
              component={IconCustom.Checked}
              className="my-select-selected-icon"
            />
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

MySelect.propTypes = {
  size: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  disabledKey: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  showSearch: PropTypes.bool,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  suffixIcon: PropTypes.any,
  allowClear: PropTypes.bool,
  className: PropTypes.string,
  renderItem: PropTypes.func,
};

MySelect.defaultProps = {
  placeholder: 'Please select',
  labelKey: 'name',
  valueKey: 'id',
  disabledKey: 'disabled',
  size: 'large',
  options: [
    { name: 'Option 1', id: 1 },
    { name: 'Option 2', id: 2 },
    { name: 'Option 3', id: 3 },
  ],
  name: 'fieldName',
  showSearch: false,
  onSelect: () => null,
  disabled: false,
  allowClear: false,
};

export default MySelect;
