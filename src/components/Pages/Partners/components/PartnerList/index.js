import React from 'react';
import { Col, Popover, Rate, Row, Tag } from 'antd';
import { MyTable, MyButton, Image } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { get } from 'lodash';

const PartnerList = ({
  partnerData,
  searchPartner,
  onPagingChange,
  onVisitSite,
  onInvite,
}) => {
  return (
    <MyTable
      data={get(partnerData, 'result') || []}
      pageSize={searchPartner.take}
      currentPage={searchPartner.current}
      totalItem={get(partnerData, 'total')}
      className="mt-8 table-partner-page"
      scroll={{ x: 900 }}
      onChange={(data) => {
        onPagingChange({
          ...searchPartner,
          ...data,
        });
      }}
      columns={[
        {
          title: 'Contractor',
          key: 'name',
          render: (text, col) => (
            <Row align="middle">
              <Col>
                <Image className="avatar" src={col.logo} alt={col.name} />
              </Col>
              <Col>
                <div>{col.name}</div>
                <div>
                  {col.isRelationship && <Tag color="blue">Cooperation</Tag>}
                </div>
              </Col>
            </Row>
          ),
        },
        {
          title: 'Code',
          key: 'code',
          align: 'center',
        },
        {
          title: 'Rating',
          key: 'rating',
          render: (text) => {
            return <Rate disabled allowHalf value={text} />;
          },
          align: 'center',
        },
        {
          title: 'Skills',
          key: 'skillCount',
          align: 'center',
        },
        {
          title: 'Jobs',
          key: 'jobCount',
          align: 'center',
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, item) => (
            <>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={onInvite(item)}
                    >
                      <Icon
                        component={IconCustom.Mail}
                        className="my-icon-md"
                      />
                      Send invitation
                    </MyButton>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={onVisitSite(item)}
                    >
                      <Icon
                        component={IconCustom.Site}
                        className="my-icon-md"
                      />
                      Visit site
                    </MyButton>
                  </div>
                }
                trigger="focus"
              >
                <MyButton className="my-btn-no-style btn-icon text-dark-gray">
                  <Icon component={IconCustom.MoreHorizontal} />
                </MyButton>
              </Popover>
            </>
          ),
        },
      ]}
    />
  );
};

export default PartnerList;
