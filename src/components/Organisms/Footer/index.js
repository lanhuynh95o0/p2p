import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getConfiguration } from 'states/common/actions';
import { selectConfiguration } from 'states/common/selectors';
import { Link, useLocation } from 'react-router-dom';
import {
  TERM_AND_CONDITION,
  POLICY,
  HOME,
  PARTNERS_SETTING,
  ABOUT_US,
} from 'routers/route-path';
import './styles.scss';

const { Footer } = Layout;
const FooterLayout = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration());
  const location = useLocation();

  useEffect(() => {
    if (configuration) {
      return;
    }
    dispatch(getConfiguration());
  }, []);

  if (location.pathname === HOME || location.pathname === PARTNERS_SETTING) {
    return null;
  }

  return (
    <Footer className="footer-page">
      <Row gutter={15}>
        <Col sm={6}>
          <h4>COMPANY ADDRESS</h4>
          <div className="line-info">{configuration?.companyAddress}</div>
        </Col>
        <Col sm={6}>
          <h4>CONTACT PHONE</h4>
          <div className="line-info">{configuration?.contactPhone}</div>
        </Col>
        <Col sm={6}>
          <h4>CONTACT EMAIL</h4>
          <div className="line-info">{configuration?.contactEmail}</div>
        </Col>
        <Col sm={6}>
          <h4>ABOUT US</h4>
          <div className="line-info policy">
            <Link to={POLICY}>Policy Privacy</Link>
          </div>
          <div className="line-info policy">
            <Link to={TERM_AND_CONDITION}>Term And Condition</Link>
          </div>
          <div className="line-info policy">
            <Link to={ABOUT_US}>About Us</Link>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};
export default FooterLayout;
