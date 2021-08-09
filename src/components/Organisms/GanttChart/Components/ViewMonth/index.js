import React from 'react';

const MonthRow = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <div
          className="item-month"
          key={index}
          style={{ width: item.width, minWidth: item.width }}
        >
          {item.date.format('MMM')}
        </div>
      ))}
    </>
  );
};

const YearRow = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <div
          className="item-month text-bold"
          key={index}
          style={{ width: item.width, minWidth: item.width }}
        >
          {item.year}
        </div>
      ))}
    </>
  );
};

export default {
  MonthRow,
  YearRow,
};
