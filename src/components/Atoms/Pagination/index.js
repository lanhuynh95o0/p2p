import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import { MySelect } from '..';
import './styles.scss';

const ITEM_PER_PAGE = 10;
const OPTION_ITEM_PER_PAGE = [
  { name: '5', id: 5 },
  { name: '9', id: 9 },
  { name: '12', id: 12 },
];
const MyPagination = ({ size, totalItem, pageSize, onChange, currentPage }) => {
  return (
    <div className="wrapper-paginate d-table w-100p">
      <div className="d-table-cell va-m">
        <span className="display-text">Displayed</span>
        <div className="d-inline-block">
          <MySelect
            className="select-display"
            value={pageSize}
            options={OPTION_ITEM_PER_PAGE}
            placeholder=""
            onChange={(pageSize) => {
              const payload = {
                skip: 0,
                current: 1,
                take: pageSize,
              };
              onChange(payload);
            }}
            allowClear={false}
          />
        </div>

        <span className="display-text">of {totalItem} records</span>
      </div>

      <Pagination
        current={currentPage}
        size={size}
        total={totalItem}
        pageSize={pageSize}
        className="my-table-pagination py-sm-16"
        showSizeChanger={false}
        onChange={(page) => {
          const payload = {
            skip: (page - 1) * pageSize,
            current: page,
            take: pageSize,
          };
          onChange(payload);
        }}
      />
    </div>
  );
};

MyPagination.propTypes = {
  size: PropTypes.string,
  totalItem: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  currentPage: PropTypes.number,
};

MyPagination.defaultProps = {
  size: 'small',
  totalItem: 0,
  currentPage: 1,
  pageSize: ITEM_PER_PAGE,
  onChange: () => null,
};

export default MyPagination;
