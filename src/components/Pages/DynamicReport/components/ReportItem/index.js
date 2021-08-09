import React from 'react';
import { MyTable } from 'components/Atoms';
import { get } from 'lodash';

const ReportItem = ({
  reportData,
  columns,
  searchParams,
  setSearchParams
}) => {

  return (
    <MyTable
      data={get(reportData, 'result') || []}
      pageSize={searchParams.take}
      currentPage={searchParams.current}
      totalItem={get(reportData, 'total')}
      columns={columns}
      onChange={data => {
        setSearchParams({
          ...searchParams, ...data
        })
      }}
    />
  )
};

export default ReportItem;
