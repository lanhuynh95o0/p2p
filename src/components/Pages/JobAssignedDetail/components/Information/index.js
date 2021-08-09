import React from 'react';
import { Col, Row } from 'antd';
import { CategoryItem } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import { separateCost } from 'utilities/stringHelper';

const Information = ({ job }) => {
  const info = [
    {
      name: 'Created by',
      value: job.createdBy || '',
    },
    {
      name: 'Start date',
      value: getTimeFormatNormal(job.startDate),
    },
    {
      name: 'End date',
      value: getTimeFormatNormal(job.endDate),
    },
    {
      name: 'Cost',
      value: `${separateCost(job.estimateCost) || ''} ${job.currency || ''}`,
    },
  ];

  if (job)
    return (
      <>
        <div className="info-header">
          <h4 className="title">General Information</h4>
        </div>
        <div className="info-body">
          <p className="info-content mb-16">{job.description}</p>
          {info.map((item) => (
            <Row className="py-16" key={item.name}>
              <Col span={12} className="info-name">
                {item.name}
              </Col>
              <Col span={12} className="info-content text-right">
                {item.value}
              </Col>
            </Row>
          ))}
          <p className="info-title">Skill requirements</p>
          {(job?.skills || []).map((skill) => (
            <CategoryItem
              key={skill.name}
              id={skill.name}
              name={skill.name}
              category={skill.categoryName}
              isCheck={true}
            />
          ))}
        </div>
      </>
    );
  return null;
};

export default Information;
