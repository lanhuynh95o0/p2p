import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import './styles.scss';

const MyProgress = ({
  percent,
  progress,
  showText,
  className,
  type,
  option,
  isProgressUpload = false
}) => {
  const _renderContent = () => {
    if (type === 'text') {
      return (option || PROGRESS_STATUS)[progress]?.view || null;
    }
    return (
      <>
        {showText && <span className="text-percent">{percent}%</span>}
        {!isProgressUpload && <Progress className='progress-upload-normal' percent={percent || 0} showInfo={false} />}
        {isProgressUpload && <Progress className={`progress-upload-${percent === 100 ? 'completed' : 'pending'}`} percent={percent || 0} showInfo={false} />}
      </>
    );
  };
  return (
    <div id="my-progress" className={className}>
      {_renderContent()}
    </div>
  );
};

export default MyProgress;

MyProgress.propTypes = {
  percent: PropTypes.number,
  className: PropTypes.string,
  showText: PropTypes.bool,
  type: PropTypes.oneOf(['percent', 'text']),
};

MyProgress.defaultProps = {
  showText: true,
  type: 'percent',
};

const PROGRESS_STATUS = {
  NA: { value: 1, view: <span className="not-available">N/A</span> },
  InProgress: {
    value: 2,
    view: <span className="in-progress">In progress</span>,
  },
  Completed: { value: 3, view: <span className="completed">Completed</span> },
};
