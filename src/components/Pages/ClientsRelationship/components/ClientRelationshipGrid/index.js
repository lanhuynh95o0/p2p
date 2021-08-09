import React, { useCallback } from 'react';
import { Row, Col, Card, Empty, Popover } from 'antd';
import { Image, MyButton, MyPagination } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { get } from 'lodash';

const CONTACT_STEP = 3;

const ClientRelationshipGrid = ({
  addClientToProject,
  clientData,
  searchClient,
  onPagingChange,
  onDeleteClient,
  onEdit,
}) => {
  const _renderEmployeeGrid = useCallback((item) => {
    const info = [
      { text: 'Legal Name', value: item.legalCompanyName, className: 'text-link' },
      { text: 'ABN', value: item.abn, className: 'text-link' },
      { text: 'Email', value: item.email, className: 'text-link' },
      { text: 'Phone', value: item.phoneNumber, className: 'text-link' },
      { text: 'Address', value: item.address },
    ];

    return (
      <Col xs={24} md={12} lg={6} key={item.id}>
        <div className="grid-item">
          <Card>
            <div className="header" style={{ cursor: 'pointer' }}>
              <Image
                onClick={onEdit(item, { visible: true })}
                className="avatar"
                src={item.logoUrl}
                alt={item.name}
              />
              <div className="info">
                <div
                  style={{ color: '#1890ff' }}
                  className="text-md"
                  onClick={onEdit(item, { visible: true })}
                >
                  {item.name}
                </div>
              </div>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={onEdit(item, { visible: true })}
                    >
                      <Icon
                        component={IconCustom.Edit}
                        className="my-icon-md"
                      />
                      Edit
                    </MyButton>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={onEdit(item, { visible: true, step: CONTACT_STEP })}
                    >
                      <Icon
                        component={IconCustom.ViewList}
                        className="my-icon-md"
                      />
                      View contacts
                    </MyButton>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={() => onDeleteClient(item.id)}
                    >
                      <Icon
                        component={IconCustom.Trash}
                        className="my-icon-md"
                      />
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
            <p className="my-8 title">Overview</p>
            <div className="body">
              {info.map((item) => (
                <Row key={item.value} className={'py-8'}>
                  <Col span={10} className="text-md text-dark-gray">
                    {item.text}
                  </Col>
                  <Col span={14} className="text-right">
                    <span className={`text-md break-word ${item.className}`}>
                      {item.value}
                    </span>
                  </Col>
                </Row>
              ))}
            </div>
            <MyButton
              onClick={addClientToProject(true, item)}
              className="btn-primary-custom w-100p mt-20"
            >
              Add to project
            </MyButton>
          </Card>
        </div>
      </Col>
    );
  }, []);
  return (
    <>
      <Row className="mt-8" gutter={[16, 16]}>
        {(get(clientData, 'result') || []).map(_renderEmployeeGrid)}
      </Row>
      {(get(clientData, 'total') || 0) > 0 && (
        <MyPagination
          totalItem={get(clientData, 'total')}
          currentPage={searchClient.current}
          pageSize={searchClient.take}
          onChange={(data) => {
            onPagingChange({
              ...searchClient,
              ...data,
            });
          }}
        />
      )}
      {(get(clientData, 'total') || 0) === 0 && (
        <Card>
          <Empty className="mt-20" />
        </Card>
      )}
    </>
  );
};

export default ClientRelationshipGrid;
