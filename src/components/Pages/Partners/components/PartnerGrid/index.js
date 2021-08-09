import React, { useCallback } from 'react';
import { Row, Col, Card, Rate, Empty, Tag } from 'antd';
import { CategoryItem, Image, MyButton, MyPagination } from 'components/Atoms';
import { get } from 'lodash';
import './styles.scss'

const PartnerGrid = ({
  partnerData,
  searchPartner,
  onPagingChange,
  onVisitSite,
  onInvite,
}) => {
  const _renderEmployeeGrid = useCallback(
    (item) => (
      <Col xs={24} sm={12} lg={6} key={item.id}>
        <div className="grid-item">
          <Card>
            <div className="header">
              <Image className="avatar" src={item.logo} alt={item.name} />
              <div className="info">
                <div className="text-md">{item.name}</div>
                <div className="code">{item.code}</div>
              </div>
              {item.isRelationship && <Tag color="blue">Cooperation</Tag>}
            </div>

            <div className="body">
              <div className="mt-10 title">Review ({item.reviewCount})</div>
              <div className="mb-10">
                <Rate allowHalf value={item.rating} disabled />
              </div>

              <div className="mt-10 title">Skills ({item.skillCount})</div>
              <div className="text-extra">See more in contractor site</div>

              {(item.skills || []).slice(0, 3).map((skill) => (
                <CategoryItem
                  key={skill.id}
                  id={skill.id}
                  name={skill.name}
                  isCheck={true}
                />
              ))}

              {item.aboutUs && (
                <>
                  <div className="mt-10 title">Overview</div>
                  <div className="text-md text-4-line about-us">{item.aboutUs}</div>
                </>
              )}

              <Row className="py-10 py-sm-20">
                <Col span={10} className="text-md text-dark-gray">
                  Jobs
                </Col>
                <Col span={14} className="text-right">
                  <span className="text-md break-word">{item.jobCount}</span>
                </Col>
              </Row>
            </div>
            <div className="action">
              <MyButton
                className="btn-primary-custom w-100p mt-sm-20"
                onClick={onInvite(item)}
              >
                Send invitation
              </MyButton>

              <MyButton
                className="btn-secondary-custom w-100p mt-sm-20"
                onClick={onVisitSite(item)}
              >
                Visit site
              </MyButton>
            </div>
          </Card>
        </div>
      </Col>
    ),
    []
  );
  return (
    <>
      <Row className="mt-0 partner-grid" gutter={[16, 16]}>
        {(get(partnerData, 'result') || []).map(_renderEmployeeGrid)}
      </Row>

      {(get(partnerData, 'total') || 0) > 0 && (
        <MyPagination
          totalItem={get(partnerData, 'total')}
          currentPage={searchPartner.current}
          pageSize={searchPartner.take}
          onChange={(data) => {
            onPagingChange({
              ...searchPartner,
              ...data,
            });
          }}
        />
      )}

      {(get(partnerData, 'total') || 0) === 0 && (
        <Card>
          <Empty className="mt-20" />
        </Card>
      )}
    </>
  );
};

export default PartnerGrid;
