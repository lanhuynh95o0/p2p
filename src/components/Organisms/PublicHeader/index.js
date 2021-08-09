import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import 'components/Organisms/Header/styles.scss';
import ImageLogoFull from 'assets/images/logo/logo-full.png';
import MyButton from 'components/Atoms/Button';
import { LOGIN, SIGNUP } from 'routers/route-path';

const { Header } = Layout;

const SiteHeaderPublic = () => {
  return (
    <Header id="site-header">
      <Row className="h-100p">
        <Col flex="auto" className="h-100p">
          <Link to="/">
            <div className="logo-wrapper">
              <img width="100" src={ImageLogoFull} className="logo" />
            </div>
          </Link>
        </Col>
        <Row className="m-0 header-right">
          <a href={LOGIN}>
            <MyButton className="btn-secondary-custom mr-16">Login</MyButton>
          </a>

          <a href={SIGNUP}>
            <MyButton className="btn-primary-custom">Sign up</MyButton>
          </a>
        </Row>
      </Row>
    </Header>
  );
};

export default SiteHeaderPublic;
