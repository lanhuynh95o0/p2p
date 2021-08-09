import React, { useCallback } from 'react';
import { MySelect, SearchInput } from 'components/Atoms';
import { Col, Row } from 'antd';

import { FILLTER_BY_STATUS, SORT_BY_TIME } from 'constants/common';
import { debounced } from 'utilities/common';

const EmployeeHeader = (props) => {
  const _updateQuery = useCallback(
    (key) => (value) => {
      props.setQuery((oldQuery) => ({ ...oldQuery, [key]: value }));
    },
    []
  );

  const _changeSearchText = useCallback((e) => {
    const { value } = e.target;
    debounced(() => _updateQuery('terms')(value));
  }, []);

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} md={9} className="px-8">
        <Row>
          <Col xs={24} md={16}>
            <SearchInput
              placeholder="Search inquiry"
              onChange={_changeSearchText}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={15} className="px-8">
        <Row gutter={[10, 10]}>
          <Col xs={8} sm={4} md={3}>
            <div className="d-table w-100p h-100p text-sm-right pr-16">
              <span className="text-md d-table-cell va-m">Sort by</span>
            </div>
          </Col>
          {/* Filter by role */}
          <Col xs={16} sm={9} md={8} className="pr-16">
            <MySelect
              className="select-custom-white w-100p"
              options={SORT_BY_TIME}
              value={props.query.sortBy}
              onChange={_updateQuery('sortBy')}
              allowClear={false}
            />
          </Col>
          {/* Filter by time */}
          <Col xs={8} sm={4} md={3}>
            <div className="d-table w-100p h-100p text-sm-right pr-16">
              <span className="text-md d-table-cell va-m">Filter by</span>
            </div>
          </Col>
          <Col xs={16} sm={7} md={8} className="pr-16">
            <MySelect
              className="select-custom-white w-100p"
              options={FILLTER_BY_STATUS}
              value={props.query.filterBy}
              onChange={_updateQuery('filterBy')}
              allowClear={false}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EmployeeHeader;
