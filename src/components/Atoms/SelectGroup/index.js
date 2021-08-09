import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './styles.scss';

const { Option, OptGroup } = Select;
const MySelectGroup = (props) => {
  const {
    groupLabelField,
    options,
    valueKey,
    labelKey,
    groupKey,
    value,
    onChange,
    onSelect,
    listItemDisable,
    disabled,
    placeholder,
    showSearch,
    className,
    allowClear,
    dropdownClassName,
  } = props;

  const [filterOption, setFilterOption] = useState(options);
  const [iconSuffix, setIconSuffix] = useState(<CaretDownOutlined />);

  const handleChange = (data) => {
    if (listItemDisable.find((key) => key == data)) {
      return;
    }
    onChange(data);
    onSelect(data);
  };

  useEffect(() => {
    setFilterOption(options);
  }, [options]);

  const _onSearch = (val) => {
    const text = val.toLowerCase();
    const listOption = JSON.parse(JSON.stringify(options));
    if (!text) return setFilterOption(listOption);
    setFilterOption(
      listOption
        .map((option) => {
          option[groupKey] = option[groupKey].filter((item) => {
            return (
              item[labelKey].toLowerCase().includes(text) ||
              option[groupLabelField].toLowerCase().includes(text)
            );
          });
          return option;
        })
        .filter((option) => option[groupKey].length)
    );
  };

  const onDropdownVisibleChange = (open) => {
    if (open) {
      setIconSuffix(<CaretUpOutlined />);
      return;
    }
    setIconSuffix(<CaretDownOutlined />);
  };

  return (
    <div id="my-select-group">
      <Select
        allowClear={allowClear}
        showSearch={showSearch}
        size="large"
        onChange={handleChange}
        className={className || 'select-group-custom'}
        value={value}
        disabled={disabled}
        onDropdownVisibleChange={onDropdownVisibleChange}
        onSearch={_onSearch}
        filterOption={() => true}
        placeholder={placeholder}
        suffixIcon={props.disabled ? null : iconSuffix}
        dropdownClassName={dropdownClassName}
      >
        {filterOption.map((option) => (
          <OptGroup key={option.id} label={option[groupLabelField]}>
            {option[groupKey].map((item) => (
              <Option
                key={item[valueKey]}
                value={item[valueKey]}
                className={`${
                  listItemDisable.find(
                    (itemDisable) => itemDisable == item[valueKey]
                  )
                    ? 'item-disabled'
                    : ''
                }`}
              >
                {item[labelKey]}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    </div>
  );
};

MySelectGroup.propTypes = {
  size: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  groupLabelField: PropTypes.string,
  groupValueField: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  groupKey: PropTypes.string,
  onSelect: PropTypes.func,
  listItemDisable: PropTypes.array,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool,
  className: PropTypes.string,
  allowClear: PropTypes.bool,
  dropdownClassName: PropTypes.string,
};

MySelectGroup.defaultProps = {
  allowClear: false,
  className: 'select-group-custom',
  placeholder: 'Please select',
  size: 'large',
  groupLabelField: 'categoryName',
  groupValueField: 'id',
  groupKey: 'skills',
  labelKey: 'name',
  valueKey: 'id',
  options: [
    {
      categoryName: 'CallIN',
      id: 2,
      skills: [
        { id: 7, name: 'Mitel Cloud' },
        { id: 10, name: 'Mitel Cloud 10' },
      ],
    },
  ],
  onSelect: () => null,
  onChange: () => null,
  listItemDisable: [],
  disabled: false,
  showSearch: false,
  dropdownClassName: '',
};

export default MySelectGroup;
