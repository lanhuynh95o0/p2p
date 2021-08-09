import React from 'react';

import './styles.scss';
import { Col, Row } from 'antd';
import { separateCost } from 'utilities/stringHelper';

const Statistic = ({ project }) => {
  const statistic = [
    {
      name: 'Jobs',
      value: project.jobs?.length || 0,
    },
    {
      name: 'Contractors',
      value: project.participantCount || 0,
    },
    {
      name: 'Attachments',
      value: project.attachmentCount || 0,
    },
    {
      name: `Total cost (${project.currency || ''})`,
      value: separateCost(project.totalCost),
    },
  ];
  return (
    <Row gutter={[10, 10]} className="mx-n8">
      {statistic.map((item) => (
        <Col xs={24} sm={12} md={6} className="px-8" key={item.name}>
          <div className="statistic-item">
            <p className="statistic-item-name">{item.name}</p>
            <p className="statistic-item-value text-1-line">{item.value}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Statistic;
