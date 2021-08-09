import { Image, MyButton } from 'components/Atoms/index';
import { Popover } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import React from 'react';
import './styles.scss';
import { getTimeFromNow } from 'utilities/time';
import PropTypes from 'prop-types';

const CardItem = ({
  id,
  logo,
  name,
  time,
  title,
  content,
  isEdit,
  onEdit,
  onRemove,
  footer,
  more,
  isVisibleEditBtn = true,
  isVisibleRemoveBtn = true,
  isVisibleAddBtn = true,
  className,
  onAddNew = () => null,
  onClick,
}) => {
  return (
    <div id="card-item" className={className} key={id}>
      <div className="card-header">
        <Image src={logo} />
        <div className="card-info">
          <span>{name}</span>
          <span>
            {(time && getTimeFromNow(time)) || null}
            {isEdit ? ' (edited)' : ''}
          </span>
        </div>
        {more || (
          <Popover
            placement="topRight"
            content={
              <div className="my-popover-container">
                {isVisibleEditBtn && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={onEdit}
                  >
                    <Icon component={IconCustom.Lock} className="my-icon-md" />
                    Edit
                  </MyButton>
                )}
                {isVisibleRemoveBtn && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={onRemove}
                  >
                    <Icon component={IconCustom.Trash} className="my-icon-md" />
                    Archive
                  </MyButton>
                )}
                {isVisibleAddBtn && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={onAddNew}
                  >
                    <Icon
                      component={IconCustom.Clipboard}
                      className="my-icon-md"
                    />
                    Add new task
                  </MyButton>
                )}
              </div>
            }
            trigger="focus"
          >
            <MyButton className="my-btn-no-style">
              <Icon
                component={IconCustom.MoreHorizontal}
                className="my-icon-md-dark-gray"
              />
            </MyButton>
          </Popover>
        )}
      </div>
      <p
        className="card-title"
        style={{
          cursor: onClick ? 'pointer' : 'unset',
          color: onClick ? '#1890ff' : 'inherit',
        }}
        onClick={onClick}
      >
        {title}
      </p>
      <p className="card-description">{content}</p>
      {footer}
    </div>
  );
};

CardItem.propTypes = {
  isVisibleEditBtn: PropTypes.bool,
  isVisibleRemoveBtn: PropTypes.bool,
  isVisibleAddBtn: PropTypes.bool,
};

export default CardItem;
