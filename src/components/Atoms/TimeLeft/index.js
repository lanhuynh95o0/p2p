import React, { useMemo } from 'react';

import './styles.scss';
import PropTypes from 'prop-types';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import moment from 'moment';
import { setHoursForDate } from 'utilities/time'

const TimeLeft = ({ time, isComplete }) => {
  const duration = useMemo(() => moment.duration(setHoursForDate(time, '23:59:59').diff(moment())), [time]);
  const dayLeft = Math.floor(duration.asDays());

  const _getText = useMemo(
    () => {
      if (isComplete) return 'Complete';
      return dayLeft >= 0
        ? `${dayLeft || 1} ${dayLeft > 1 ? 'days' : 'day'} left`
        : 'Expired';
    },
    [dayLeft]
  );

  const _getStatus = useMemo(() => {
    if (isComplete) return 'my-time-status-good';
    if (dayLeft < 5) return 'my-time-status-danger';
    if (dayLeft <= 10) return 'my-time-status-warning';
    return 'my-time-status-good';
  }, [dayLeft]);
  return (
    <div className="d-inline-block">
      <div id="my-time-left" className={_getStatus}>
        {
          isComplete ?
            <Icon component={IconCustom.Checked} className="my-time-icon" /> :
            <Icon component={IconCustom.Clock} className="my-time-icon" />
        }
        <span className="my-time-text">{_getText}</span>
      </div>
    </div>
  );
};

export default TimeLeft;

TimeLeft.propTypes = {
  time: PropTypes.string,
};
