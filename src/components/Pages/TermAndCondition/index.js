import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfiguration } from 'states/common/selectors';
import { HOME } from 'routers/route-path';
import { Breadcrumb } from 'components/Atoms';
import { createMarkup } from 'utilities/common';
import { getConfiguration } from 'states/common/actions';
import { Header, SiteHeaderPublic, Footer } from 'components/Organisms';
import { TOKEN } from 'constants/cookies';
import { Row, Col } from 'antd';
import Cookies from 'js-cookie';
import './styles.scss';

const TermAndCondition = () => {
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
    <>
      {userToken ?
        <Header
          showLogo={true}
          className="site-layout-background"
          style={{ padding: 0 }}
        /> : <SiteHeaderPublic />}
      <div className='term-condition-content'>


        <Row justify='center'>
          <Col xs={24} sm={14}>
            <Breadcrumb
              path={userToken ?
                [
                  { name: 'Home', link: HOME },
                  { name: 'Term And Condition' },
                ] :
                [
                  { name: 'Term And Condition' },
                ]
              }
            />
          </Col>
          <Col xs={24} sm={14}>
            <div dangerouslySetInnerHTML={createMarkup(configuration?.termAndCondition)} />
          </Col>
        </Row>
      </div>
      <div className='term-condition-footer'>
        <Footer />
      </div>
    </>
  )
};

export default TermAndCondition;