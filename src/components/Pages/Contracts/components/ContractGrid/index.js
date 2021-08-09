import React, { useCallback } from 'react';
import { Card, Col, Empty, Row, Tag } from 'antd';
import PropTypes from 'prop-types';
import { Image, MyButton } from 'components/Atoms';
import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import { getTimeFormatNormal } from 'utilities/time';

const ContractGrid = (props) => {
  const _renderGrid = useCallback((item, index) => {
    const info = [
      { name: 'Date', value: getTimeFormatNormal(item.createdAt) },
      { name: 'Project', value: item.projectName },
      { name: 'Job', value: item.jobName },
    ];
    return (
      <Col xs={24} md={12} lg={6} className="p-8" key={item.id || index}>
        <div className="grid-item">
          <Card>
            {/* name */}
            <p className="text-md m-0">{item.name}</p>
            <p className="text-extra mb-25">{item.code}</p>

            <p className="title">Partner</p>
            <div className="header">
              <Image src={item.logo} className="avatar-circle" />
              <div className="info">
                <p className="text-md m-0">
                  <Tag className="tag-partner-type" color={'processing'}>{item.isOwner ? 'Vendor' : 'Customer'}</Tag>
                  {item.partnerName}
                </p>
                <p className={`text-extra ${CONTRACT_STATUS_CLASS[item.status].class}`}>
                  {item.status}
                </p>
              </div>
            </div>

            <p className="title">Information</p>
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
            <MyButton
              className="btn-primary-custom w-100p"
              onClick={props.onViewDetail(item)}
            >
              View Detail
            </MyButton>
          </Card>
        </div>
      </Col>
    );
  }, []);

  return (
    <Row className="m-n8 pt-16">
      {props.data.map(_renderGrid) || (
        <Card>
          <Empty className="mt-20" />
        </Card>
      )}
    </Row>
  );
};

export default ContractGrid;

ContractGrid.propTypes = {
  data: PropTypes.array,
};
