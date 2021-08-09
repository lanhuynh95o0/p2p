import React, { useEffect, useState } from 'react';
import { Card, Col, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { convertCentToDollar } from 'utilities/common';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { MyButton } from 'components/Atoms';
import { PACKAGES } from '../constants';
import { getTimeFormatNormal } from 'utilities/time';

import { convertFromByteToGiGaByte } from '../utils';

const breakPoint = {
  xl: 6,
  xs: 24,
  lg: 12,
};

export const PackageInfo = ({
  data,
  index,
  switchModal,
  registerPackage,
  isTrial,
}) => {
  const [dataBtn, setDataBtn] = useState({
    disable: true,
    test: 'Try it free for 30 days',
  });

  useEffect(() => {
    let disable = true,
      text = isTrial ? 'Try it free for 30 days' : 'Buy';

    if (data.isCurrentPlan && !data.isActivePlan) {
      disable = true;
      text = `End on ${getTimeFormatNormal(data.expiredDate)}`;
    } else if (data.isCurrentPlan && data.isActivePlan) {
      disable = false;
      text = 'Cancel plan';
    } else if (
      !registerPackage.isActivePlan &&
      registerPackage.name !== 'Partner Lite'
    ) {
      disable = false;
    } else {
      disable = registerPackage.name !== 'Partner Lite';
    }
    setDataBtn({ disable, text });
  }, [data, registerPackage]);

  return (
    <Col {...breakPoint} key={data.id}>
      <Card className="package-card text-center">
        {PACKAGES[index]?.recommend && (
          <div className="recommend">Recommend</div>
        )}
        <div className="header my-15 my-sm-30">
          <div className="package-title">{data.name}</div>
          <div className="package-subtitle">Monthly Package</div>
          <div className="package-price mt-10 mt-sm-20">
            {data.billingPriceInCent
              ? `$${convertCentToDollar(data.billingPriceInCent)}`
              : 'Free'}
          </div>
        </div>
        <hr />
        <div className="detail-storage">
          <div className="my-4">
            <span>Storage size: </span>
            <span>
              <strong>
                {convertFromByteToGiGaByte(data.maximumStorageSizeInByte)}GB
              </strong>
            </span>
          </div>
          {data?.docusignUnitPrice && (
            <div className="my-4">
              <span>Docusign unit price: </span>
              <span>
                <strong>${data.docusignUnitPrice}</strong>
              </span>
            </div>
          )}
          {data.freeDocusignPerInterval !== 0 && (
            <div className="my-4">
              <span>Free docusign per month: </span>
              <span>
                <strong>{data.freeDocusignPerInterval}</strong>
              </span>
            </div>
          )}
        </div>
        <hr />
        <div className="content mb-40 mb-md-80">
          {(PACKAGES[index]?.text || []).map((value, index) => (
            <div className="content-item" key={index}>
              <Icon component={IconCustom.Checked} className="icon-check" />
              <span className="name">{value}</span>
            </div>
          ))}
        </div>
        <div className="action">
          {data.name === 'Partner Lite' ? (
            <MyButton
              className={`btn-primary-custom w-100p suffix-icon ${
                !data.isCurrentPlan && 'hidden'
              }`}
              disabled={true}
            >
              Current plan
            </MyButton>
          ) : (
            <MyButton
              onClick={switchModal(data)}
              className={`btn-primary-custom w-100p suffix-icon`}
              disabled={dataBtn.disable}
            >
              {dataBtn.text}
              {data.isCurrentPlan && data.isActivePlan && (
                <Tooltip
                  placement="top"
                  title="In order to subscribe other subscription packages, please cancel the current subscription package."
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              )}
            </MyButton>
          )}
        </div>
      </Card>
    </Col>
  );
};
