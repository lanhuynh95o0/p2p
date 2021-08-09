import React from 'react';
import { Tooltip } from 'antd';

const CustomTooltip = ({
  maxLength = 30,
  title = '',
  placement = 'bottom',
}) => {
  if (!title?.length) return null;
  if (title?.length < maxLength) return <span>{title}</span>;
  return (
    <>
      <span style={{ cursor: 'pointer' }}>
        <Tooltip placement={placement} title={title}>
          <span>{title.substring(0, maxLength)}...</span>
        </Tooltip>
      </span>
    </>
  );
};

export default CustomTooltip;
