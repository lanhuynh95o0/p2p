import React, { useState } from 'react';
import { Checkbox, Dropdown, Menu } from 'antd';
import { MyButton } from 'components/Atoms';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import './styles.scss';
import Icon, { IconCustom } from 'components/Atoms/Icon';

const MyFilterColumn = ({ options, onChange }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleChange = (option) => {
    const data = cloneDeep(options);
    if (option.selected && data.filter((item) => item.selected).length === 1) {
      return;
    }
    data.forEach((item) => {
      if (item.key === option.key) {
        item.selected = !option.selected;
      }
    });
    onChange(data);
  };

  const onToggleCheckMenu = (option) => {
    handleChange(option);
  };

  const onToggleCheck = (e, option) => {
    e.stopPropagation();
    handleChange(option);
  };

  const menu = (
    <Menu className="menu-filter-column-custom">
      <Menu.Item className="option-selected">
        {options.filter((option) => option.selected).length} selected of{' '}
        {options.length}
      </Menu.Item>
      {options.map((option) => (
        <Menu.Item
          key={option.key}
          onClick={() => onToggleCheckMenu(option)}
          className="menu-item"
        >
          <Checkbox
            onClick={(e) => onToggleCheck(e, option)}
            checked={option.selected}
            className="mr-10 check-box-custom"
          />
          <span>{option.title}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      className="filter-column-custom"
      visible={visible}
      overlay={menu}
      placement="bottomRight"
    >
      <MyButton
        className="my-btn-no-style button-filter-custom"
        onClick={toggleDropdown}
      >
        <Icon
          component={visible ? IconCustom.Close : IconCustom.Filter}
          className="close-icon"
        />
        <span className="label">Filter</span>
      </MyButton>
    </Dropdown>
  );
};

MyFilterColumn.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
};

MyFilterColumn.defaultProps = {
  options: [
    { title: 'Partner', key: 'name', selected: true },
    { title: 'Code', key: 'code', selected: true },
    { title: 'Email', key: 'email', selected: true },
    { title: 'Phone', key: 'Phone', selected: true },
    { title: 'Jobs', key: 'Address', selected: true },
  ],
  onChange: () => null,
};

export default MyFilterColumn;
