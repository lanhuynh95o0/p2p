import React, { useCallback } from 'react';
import { SearchInput } from 'components/Atoms';
import { Col, Row } from 'antd';
import { debounced } from 'utilities/common';

const JobHeader = (props) => {
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
    <Row>
      <Col xs={18} sm={12} className="mt-10 mt-sm-0">
        <SearchInput placeholder="Search jobs" onChange={_changeSearchText} />
      </Col>
    </Row>
  );
};

export default JobHeader;
