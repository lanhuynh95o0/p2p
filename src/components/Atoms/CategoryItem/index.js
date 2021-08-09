import React from 'react';
import MyButton from '../Button';
import Icon, { IconCustom } from '../Icon';
import { Popover } from 'antd';
import IconStatusSkill from '../IconStatusSkill';
import './styles.scss';

const CategoryItem = ({
  id,
  name,
  category,
  onRemove,
  isCheck,
  className,
  status,
  onEdit
}) => {
  return (
    <div
      className={`my-item-skill ${className}`}
      key={id}
    >
      {isCheck &&
        (<Icon component={IconCustom.Checked} className="icon-checked" /> ||
          null)}

      <IconStatusSkill status={status} />
      <div className="skill-content">
        <p className="skill-title">{name}</p>
        <p className="sub-skill-title">{category}</p>
      </div>

      {(onEdit || onRemove) && (
        <Popover
          placement="topRight"
          content={
            <div className="my-popover-container">
              {onEdit && (
                <MyButton
                  className="my-btn-no-style my-popover-item"
                  onClick={onEdit}
                >
                  <Icon component={IconCustom.Edit} className="my-icon-md" />
                Edit
                </MyButton>
              )}
              {onRemove && (
                <MyButton
                  className="my-btn-no-style my-popover-item"
                  onClick={onRemove}
                >
                  <Icon component={IconCustom.Trash} className="my-icon-md" />
                  Remove
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
  )
};

export default CategoryItem;
