import React, { useCallback } from 'react';
import { Card, Col, Empty, Row } from 'antd';
import PropTypes from 'prop-types';
import { Image, MyButton } from 'components/Atoms';
import AssignedJobTimeline from '../AssignedJobTimeline';
import { INVITE_STATUS } from 'constants/common';

const AssignedJobsGrid = (props) => {
  const _renderGrid = useCallback((item, index) => {
    const info = [
      { name: 'Project', value: item.projectName || '' },
      { name: 'Owner', value: item.owner || '' },
    ];
    return (
      <Col xs={24} sm={12} md={6} className="p-8" key={item.id || index}>
        <div className="grid-item">
          <Card>
            <div className="header">
              <Image src={item.logo} className="avatar" />
              <div className="info">
                <p className="text-md m-0">{item.name}</p>
                <p className="text-extra">{item.code}</p>
              </div>
            </div>
            <div className="mb-8 mb-sm-16">
              <AssignedJobTimeline status={item.status} />
            </div>
            <p className="text-md">{item.description}</p>

            <p className="title">Overview</p>
            <div className="body">
              {info.map((item) => (
                <Row key={item.name} className={'pb-5 pb-sm-20'}>
                  <Col span={10} className="text-md text-dark-gray">
                    {item.name}
                  </Col>
                  <Col span={14} className="text-right">
                    <span className="text-md break-word">{item.value}</span>
                  </Col>
                </Row>
              ))}
            </div>
            {item.status === INVITE_STATUS.ACCEPTED ? (
              <MyButton
                className="btn-primary-custom w-100p"
                onClick={props.onViewDetail(item)}
              >
                View Detail
              </MyButton>
            ) : (
              <>
                <MyButton
                  className="btn-primary-custom w-100p"
                  onClick={props.onAccept(item)}
                >
                  Accept
                </MyButton>
                <MyButton
                  className="btn-secondary-custom w-100p"
                  onClick={props.onReject(item)}
                >
                  Reject
                </MyButton>
              </>
            )}
          </Card>
        </div>
      </Col>
    );
  }, []);

  return (
    <Row className="pt-16 m-n8">
      {props.data.map(_renderGrid) || (
        <Card>
          <Empty className="mt-20" />
        </Card>
      )}
    </Row>
  );
};

export default AssignedJobsGrid;

AssignedJobsGrid.propTypes = {
  data: PropTypes.array,
};
