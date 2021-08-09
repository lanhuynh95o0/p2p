import React from 'react';
import { Avatar, Col, Row } from 'antd';
import ImageTop from 'assets/images/dashboard/Bottom.png';
import ImageLeft from 'assets/images/dashboard/Left.png';
import ImageRight from 'assets/images/dashboard/Right.png';
import * as routePath from 'routers/route-path';

const NormalAccount = ({ children }) => {
  return (
    <section className="premium-account">
      <Row className="mb-20">
        <Col xs={24} className="text-center">
          <a href="https://edgerov.com.au/" target="_blank" title="Drones that make life easier">
            <img src={ImageTop} alt="" />
          </a>
        </Col>
      </Row>

      <Row justify="space-between" gutter={[16, 16]}>
        <Col xl={4} lg={6}>
          <a href={routePath.SUBSCRIPTIONS} target="_blank" title="Upgrade your plan NOW! Autmatically convert your profile in your own mini website!">
            <img src={ImageLeft} alt="" />
          </a>
        </Col>
        <Col xl={16}>{children}</Col>
        <Col xl={4} lg={6}>
          <a href="https://mediahq.com.au/" target="_blank" title="A SPACE TO CREATE">
            <img src={ImageRight} alt="" />
          </a>
        </Col>
      </Row>

      <Row className="mt-20">
        <Col xs={24} className="text-center">
          <a href="https://edgerov.com.au/" target="_blank" title="Drones that make life easier">
            <img src={ImageTop} alt="" />
          </a>
        </Col>
      </Row>
    </section>
  );
};

export default React.memo(NormalAccount);
