import React from 'react';
import moment from 'moment';

const WeekRow = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <div key={index} className="item-week">
          W{item.week()}
        </div>
      ))}
    </>
  );
};

const MonthRow = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <div className="item-week text-bold" key={item || index}>
          {getWeekIndex(moment(item)) === 2 ? item.format('MMMM') : ''}
        </div>
      ))}
    </>
  );
};

const getWeekIndex = (date) =>
  date.weeks() - date.add(0, 'month').startOf('month').weeks() + 1;

export default { MonthRow, WeekRow };
