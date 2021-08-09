import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { MyPagination } from '..';
import './styles.scss';
import { SCREEN } from 'constants/config';

const { Column } = Table;
const ITEM_PER_PAGE = 10;

const MyTable = ({
  className,
  data,
  columns,
  totalItem,
  onChange,
  pageSize,
  currentPage,
  showHeader = true,
  loading = false,
  scroll = {},
}) => {

  const [size, setSize] = useState(() => {
    let screenWidth = window.innerWidth;
    let size = "default";

    if (screenWidth <= SCREEN.MOBILE) {
      size = "middle";
    }
    
    return size;
  });

  const handleResize = () => {
    if (window.innerWidth <= SCREEN.MOBILE) {
      setSize("middle");
    } else {
      setSize("default");
    }
  }

  window.addEventListener('resize', handleResize)
  
  return (
    <div className={`my-table ${className || ''}`}>
      <Table
        dataSource={data}
        rowClassName="my-table-header"
        pagination={false}
        showHeader={showHeader}
        loading={loading}
        scroll={scroll}
        rowKey={(row) => row.id}
        size={size}
      >
        {columns.map((column) => (
          <Column
            {...column}
            className={column.className}
            title={column.title}
            key={column.key}
            dataIndex={column.key}
            render={column.render}
            align={column.align}
          />
        ))}
      </Table>
      {totalItem !== 0 && (
        <MyPagination
          currentPage={currentPage}
          totalItem={totalItem}
          pageSize={pageSize}
          onChange={(data) => {
            onChange(data);
          }}
        />
      )}
    </div>
  );
};

export default MyTable;

MyTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  className: PropTypes.string,
  totalItem: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
  showHeader: PropTypes.bool,
  loading: PropTypes.bool,
  scroll: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

MyTable.defaultProps = {
  totalItem: 0,
  currentPage: 1,
  pageSize: ITEM_PER_PAGE,
  onChange: () => (page) => console.log(page),
};
