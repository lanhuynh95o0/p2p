import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfiguration } from 'states/common/selectors';
import { HOME } from 'routers/route-path';
import { Breadcrumb } from 'components/Atoms';
import { createMarkup } from 'utilities/common';
import { Header, SiteHeaderPublic, Footer } from 'components/Organisms';
import { getConfiguration } from 'states/common/actions';
import { TOKEN } from 'constants/cookies';
import Cookies from 'js-cookie';
import { Row, Col } from 'antd';
import './styles.scss';

const PolicyPrivacy = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration());
  const userToken = Cookies.get(TOKEN);

  useEffect(() => {
    if (configuration) {
      return;
    }
    dispatch(getConfiguration());
  }, []);

  return (
    <div className="policy-privacy-page">
      {userToken ? (
        <Header
          showLogo={true}
          className="site-layout-background"
          style={{ padding: 0 }}
        />
      ) : (
        <SiteHeaderPublic />
      )}
      <div className="policy-privacy-content">
        <Row justify="center">
          <Col xs={24} sm={14}>
            <Breadcrumb
              path={
                userToken
                  ? [{ name: 'Home', link: HOME }, { name: 'Policy Privacy' }]
                  : [{ name: 'Policy Privacy' }]
              }
            />
          </Col>
          <Col xs={24} sm={14}>
            <div
              dangerouslySetInnerHTML={createMarkup(configuration?.policy)}
            />
          </Col>
        </Row>
      </div>
      <div className="policy-privacy-footer">
        <Footer />
      </div>
    </div>
  );
};

export default PolicyPrivacy;
