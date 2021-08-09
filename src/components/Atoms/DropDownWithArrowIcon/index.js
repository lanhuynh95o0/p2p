import React, { memo, useCallback, useMemo, useState } from 'react';
import { Dropdown, Menu, Row } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const DropDownWithArrowIcon = ({ children, menu, onSelectItem, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const _handleChangeView = useCallback(
    (value) => () => {
      onSelectItem(value);
      setIsOpen(false);
    },
    []
  );

  const overlay = useMemo(
    () => (
      <Menu>
        {menu.map((item) => (
          <Menu.Item
            key={item.key || item.value}
            onClick={_handleChangeView(item.value)}
          >
            {item.component}
          </Menu.Item>
        ))}
      </Menu>
    ),
    []
  );

  return (
    <Dropdown overlay={overlay} onVisibleChange={setIsOpen} {...props}>
      <Row justify="center" align="middle" gutter={15}>
        {children}
        {isOpen ? (
          <CaretUpOutlined className="ml-30" />
        ) : (
          <CaretDownOutlined className="ml-30" />
        )}
      </Row>
    </Dropdown>
  );
};

DropDownWithArrowIcon.propTypes = {
  children: PropTypes.element,
  menu: PropTypes.array,
};

export default memo(DropDownWithArrowIcon);
