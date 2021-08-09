import React, { useCallback } from 'react';
import { MySelect, SearchInput } from 'components/Atoms';
import { Col, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { SORT_BY_TIME, VIEW_MODE } from 'constants/common';
import { debounced } from 'utilities/common';
import { PROJECT_SORT_BY } from '../../constant';
import './styles.scss';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const ProjectHeader = (props) => {
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
    <Row gutter={[10, 10]} className="project-header">
      <Col xs={24} md={8}>
        <Row>
          <Col span={24}>
            <SearchInput
              placeholder="Search projects"
              onChange={_changeSearchText}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={16} className="px-8">
        <Row gutter={[10, 10]}>
          <Col flex="auto">
            <div className="d-table w-100p h-100p pr-15 text-md-right">
              <span className="text-md d-table-cell va-m">Sort by</span>
            </div>
          </Col>
          {/* Filter by time */}
          <Col xs={24} md={8} lg={7} xl={5}>
            <MySelect
              containerClassName="select-sort-by"
              className="select-custom-white w-100p"
              options={Object.entries(PROJECT_SORT_BY).map(entry => entry[1])}
              value={props.query.sortBy}
              onChange={_updateQuery('sortBy')}
              allowClear={false}
            />
          </Col>
          <Col xs={24} md={9} lg={7} xl={5}>
            <div className="text-link sort-type-container mt-10" onClick={() => _updateQuery('isDesc')(!props.query.isDesc)}>
              <span className="sort-type ml-10">
                {props.query.isDesc ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              </span>
              <span className="sort-desc ml-10">
                {PROJECT_SORT_BY[props.query.sortBy].getDescription(props.query.isDesc)}
              </span>
            </div>
          </Col>
          <Col xs={24} xl={5} className="grid-action mt-10 mt-sm-0">
            <span className="mr-10">View as:</span>
            <Icon
              className={`
              icon-grid
              ${props.view === VIEW_MODE.GRID ? 'icon-grid-selected' : ''}`}
              onClick={props.onChangeView(VIEW_MODE.GRID)}
              component={IconCustom.ViewModule}
            />
            <Icon
              onClick={props.onChangeView(VIEW_MODE.LIST)}
              className={`
              icon-grid
              ${props.view === VIEW_MODE.LIST ? 'icon-grid-selected' : ''}`}
              component={IconCustom.ViewList}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProjectHeader;
