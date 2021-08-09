import React, { useCallback } from 'react';
import './styles.scss';
import { Card, Col, Empty, Popover, Row } from 'antd';
import PropTypes from 'prop-types';
import { MyButton } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';

const PartnerEmployeeGrid = (props) => {
  const _delete = useCallback(
    (employee) => () => {
      props.onDelete(employee);
    },
    []
  );

  const _renderEmployeeGrid = useCallback(
    (item, index) => (
      <Col xs={24} sm={12} lg={6} className="p-8 employee-item" key={item.id || index}>
        <div className="employee-card">
          {/* name */}
          <div className="header">
            <p
              className="name"
              style={{ cursor: 'pointer', color: '#0070c9' }}
              onClick={() => props.onEdit(item)}
            >
              {item.fullName}
            </p>
            <Popover
              placement="topRight"
              content={
                <div className="my-popover-container">
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={() => props.onEdit(item)}
                  >
                    <Icon component={IconCustom.Edit} className="my-icon-md" />
                    Edit
                  </MyButton>
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={_delete(item)}
                  >
                    <Icon component={IconCustom.Trash} className="my-icon-md" />
                    Archive
                  </MyButton>
                </div>
              }
              trigger="focus"
            >
              <MyButton className="my-btn-no-style btn-icon text-dark-gray">
                <Icon component={IconCustom.MoreHorizontal} />
              </MyButton>
            </Popover>
          </div>
          <p className="text-sm bold my-10 my-sm-20">Overview</p>
          <div className="body">
            <Row className="pb-10 pb-sm-20">
              <Col xs={24} sm={10} className="text-lg text-dark-gray">
                Role
              </Col>
              <Col xs={24} sm={14} className="text-sm-right">
                <span className="text-lg break-word">{item.role}</span>
              </Col>
            </Row>
            <Row className="pb-10 pb-sm-20">
              <Col xs={24} sm={10} className="text-lg text-dark-gray">
                Email
              </Col>
              <Col xs={24} sm={14} className="text-sm-right">
                <a className="text-lg break-word text-link">{item.email}</a>
              </Col>
            </Row>
            <Row className="pb-10 pb-sm-20">
              <Col xs={24} sm={10} className="text-lg text-dark-gray">
                Phone
              </Col>
              <Col xs={24} sm={14} className="text-sm-right">
                <a className="text-lg break-word text-link">
                  {item.phoneNumber}
                </a>
              </Col>
            </Row>
          </div>
          <MyButton
            onClick={() => props.onAddToProject(item)}
            className="btn-primary-custom w-100p mt-sm-20"
          >
            Add to project
          </MyButton>
        </div>
      </Col>
    ),
    []
  );

  return (
    <Row className="partner-employee-grid pt-sm-16">
      {props.data.map(_renderEmployeeGrid) || (
        <Card>
          <Empty className="mt-20" />
        </Card>
      )}
    </Row>
  );
};

export default PartnerEmployeeGrid;

PartnerEmployeeGrid.propTypes = {
  data: PropTypes.array,
};
