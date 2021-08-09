import React from 'react';
import { Col, Row, Input } from 'antd';
import { MyButton } from 'components/Atoms';

export const ConfirmPackage = ({
  visible = false,
  onContinue,
  onBack,
  totalPrice,
  selectedPackage,
  coupon,
  setCoupon,
}) => {
  const info = [
    {
      name: selectedPackage.name,
      value: `$${totalPrice || 0}/month`,
      showHr: true,
    },
    {
      name: 'Total',
      value: `$${totalPrice || 0}/month`,
    },
  ];

  if (!visible) {
    return null;
  }

  return (
    <div className="confirm-package">
      <h4 className="title">Confirm package</h4>
      <p className="description"></p>
      {info.map((item) => (
        <div key={item.name} className="info-row">
          <div className={`info-price mx-50`}>
            <Row className="py-16" key={item.name}>
              <Col span={12} className="info-name text-left">
                {item.name}
              </Col>
              <Col
                span={12}
                className={`info-${
                  item.name === 'Total' ? 'total' : 'content'
                } text-right`}
              >
                {item.value}
              </Col>
            </Row>
            <hr />
          </div>
        </div>
      ))}
      <div className="info-row">
        <div className={`info-price mx-50`}>
          <Row className="py-16">
            <Col span={12} className="info-name text-left">
              Coupon
            </Col>
            <Col span={12} className={`info-total text-right`}>
              <Input
                placeholder="Enter Coupon"
                onChange={(e) => setCoupon(e.target.value?.trim())}
                value={coupon}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="t-center mt-30">
        <MyButton
          onClick={onBack(false)}
          className="btn-secondary-custom mx-10"
        >
          Back
        </MyButton>
        <MyButton onClick={onContinue} className="btn-primary-custom mx-10">
          Continue
        </MyButton>
      </div>
    </div>
  );
};
