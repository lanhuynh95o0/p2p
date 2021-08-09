import React, { useMemo, useCallback } from 'react';
import { MySelect, SearchInput } from 'components/Atoms';
import { Col, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import {
  SORT_BY_ROLE,
  SORT_BY_ROLE_ADMIN,
  SORT_BY_TIME,
  USER_ROLE,
  VIEW_MODE,
  SORT_BY_ROLE_ADMIN_L1,
  SORT_BY_ROLE_ADMIN_L2,
} from 'constants/common';
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

  const ROLE_OPTIONS = useMemo(() => {
    if (props?.info?.role) {
      switch (props.info.role) {
        case USER_ROLE.ADMIN:
          return SORT_BY_ROLE_ADMIN;
        case USER_ROLE.ADMINL1:
          return SORT_BY_ROLE_ADMIN_L1;
        case USER_ROLE.ADMINL2:
          return SORT_BY_ROLE_ADMIN_L2;
        default:
          return SORT_BY_ROLE;
      }
    }
    return SORT_BY_ROLE;
  }, [props.info]);

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} md={9} className="px-8">
        <Row>
          <Col xs={24} md={16}>
            <SearchInput
              placeholder="Search employees"
              onChange={_changeSearchText}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={15} className="px-8">
        <Row gutter={[10, 10]}>
          <Col xs={6} sm={3} md={2}>
            <div className="d-table w-100p h-100p">
              <span className="text-md d-table-cell va-m">Filter by</span>
            </div>
          </Col>
          {/* Filter by role */}
          <Col xs={18} sm={10} md={8} className="pr-16">
            <MySelect
              className="select-custom-white w-100p"
              options={ROLE_OPTIONS}
              value={props.query.role}
              onChange={_updateQuery('role')}
              allowClear={false}
            />
          </Col>
          {/* Filter by time */}
          <Col xs={6} sm={3} md={2}>
            <div className="d-table w-100p h-100p">
              <span className="text-md d-table-cell va-m">Sort by</span>
            </div>
          </Col>
          <Col xs={18} sm={8} md={6} className="pr-16">
            <MySelect
              className="select-custom-white w-100p"
              options={SORT_BY_TIME}
              value={props.query.sortBy}
              onChange={_updateQuery('sortBy')}
              allowClear={false}
            />
          </Col>
          <Col xs={24} md={6} className="grid-action">
            <span className="mr-10">View as:</span>
            <Icon
              className={`${
                props.view === VIEW_MODE.GRID
                  ? 'icon-grid-selected'
                  : 'icon-grid'
              }`}
              onClick={props.onChangeView(VIEW_MODE.GRID)}
              component={IconCustom.ViewModule}
            />
            <Icon
              onClick={props.onChangeView(VIEW_MODE.LIST)}
              className={`${
                props.view === VIEW_MODE.LIST
                  ? 'icon-grid-selected'
                  : 'icon-grid'
              }`}
              component={IconCustom.ViewList}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EmployeeHeader;
