import React from 'react';

import { Col, Row } from 'antd';
import { separateCost } from 'utilities/stringHelper';

const Statistic = ({ job }) => {
  const statistic = [
    {
      name: 'Notes',
      value: job.notes?.length || 0,
    },
    {
      name: 'Attachments',
      value: job.attachmentCount || 0,
    },
    {
      name: 'Process',
      value: `${job.process || 0}%`,
    },
    {
      name: `Cost (${job.currency || ''})`,
      value: separateCost(job.estimateCost),
    },
  ];
  return (
    <Row gutter={[10, 10]}>
      {statistic.map((item) => (
        <Col xs={24} sm={12} md={6} className="px-8" key={item.name}>
          <div className="statistic-item">
            <p className="statistic-item-name">{item.name}</p>
            <p className="statistic-item-value">{item.value}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Statistic;
