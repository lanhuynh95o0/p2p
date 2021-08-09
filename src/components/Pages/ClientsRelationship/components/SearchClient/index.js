import React from 'react';
import { Row, Col } from 'antd';
import { SearchInput, MySelect } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { debounced } from 'utilities/common';
import { SORT_BY_TIME, VIEW_MODE } from 'constants/common';
const SearchClient = ({ view, onSwitchView, onSearchClient, searchClient }) => {
  const handleSearchText = (e) => {
    const value = e.target.value;
    debounced(() => {
      onSearchClient('terms', value);
    });
  };

  return (
    <Row gutter={[10, 10]} className="section-search-client">
      <Col xs={24} md={9} className="px-8">
        <Row>
          <Col xs={24} md={16}>
            <SearchInput
              placeholder="Search client"
              onChange={handleSearchText}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={15}>
        <Row gutter={[10, 10]}>
          <Col xs={6} sm={3} md={4}>
            <div className="d-table w-100p h-100p text-sm-right">
              <span className="text-md d-table-cell va-m">Sort by</span>
            </div>
          </Col>
          <Col xs={18} sm={10} md={8}>
            <MySelect
              value={searchClient.sortBy}
              className="select-custom-white w-100p"
              options={SORT_BY_TIME}
              onChange={(value) => onSearchClient('sortBy', value)}
              allowClear={false}
            />
          </Col>
          <Col flex="auto" className="grid-action">
            <span className="mr-10">View as:</span>
            <Icon
              className={`
              icon-grid
              ${view === VIEW_MODE.GRID ? 'icon-grid-selected' : ''}`}
              onClick={onSwitchView(VIEW_MODE.GRID)}
              component={IconCustom.ViewModule}
            />
            <Icon
              onClick={onSwitchView(VIEW_MODE.LIST)}
              className={`
              icon-grid
              ${view === VIEW_MODE.LIST ? 'icon-grid-selected' : ''}`}
              component={IconCustom.ViewList}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SearchClient;
