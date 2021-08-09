import React from 'react';
import { Card, Col, Row } from 'antd';
import { Skeleton } from 'antd';

const ProjectSkeleton = ({ ...breakpoint }) => {
  return (
    <Col {...breakpoint}>
      <Card>
        <Row gutter={10} className="mb-16">
          <Col flex="80px">
            <Skeleton.Avatar active size={56} shape="square" />
          </Col>
          <Col flex="auto">
            <Skeleton active paragraph={{ rows: 2 }} />
          </Col>
        </Row>

        <Row>
          <Col lg={24}>
            <Skeleton.Button active />
          </Col>
        </Row>

        <Row>
          <Col lg={24}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default React.memo(ProjectSkeleton);
