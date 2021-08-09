import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button, Layout } from 'antd';
import renderRoutes from 'routers/render';
import { SideBar, Header, Footer } from 'components/Organisms';
import { getCurrentUser } from 'states/auth/actions';
import * as Sentry from '@sentry/react';
import { PageNotFound } from 'components/Atoms';
import { selectPartnerInfo } from 'states/partner/selectors';
import { selectUserInfo } from 'states/auth/selectors';

import {
  countUnreadNotifications,
  getNotificationPaging,
} from 'states/common/actions';

import { SEARCH_NOTIFY } from 'components/Organisms/Notification/constants';

import { loadjs } from 'utilities/common';
import axios from 'utilities/axios';

import { API } from 'constants/api';

import './styles.scss';

const { Content } = Layout;
const PrivateLayout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const partnerInfo = useSelector(selectPartnerInfo());
  const userInfo = useSelector(selectUserInfo());

  useEffect(() => {
    dispatch(
      getCurrentUser((data) => {
        Sentry.configureScope(function (scope) {
          scope.setUser({ email: data.email, id: data.companyName });
        });
      })
    );

    loadjs('https://cdn.onesignal.com/sdks/OneSignalSDK.js', () => {
      window.OneSignal = window.OneSignal || [];
      if (typeof window !== undefined && window.OneSignal) {
        window.OneSignal.push(() => {
          window.OneSignal.init({
            appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID,
          });
          window.OneSignal.getNotificationPermission((permission) => {
            if (permission === 'granted') {
              if (userInfo.id) {
                registerDevice();
              }
            }
          });
          window.OneSignal.on('notificationPermissionChange', function (
            permissionChange
          ) {
            var currentPermission = permissionChange.to;
            console.log('New permission state:', currentPermission);
          });
          window.OneSignal.on('notificationDisplay', function (event) {
            console.warn('OneSignal notification displayed:', event);

            dispatch(countUnreadNotifications());
            dispatch(getNotificationPaging(SEARCH_NOTIFY));
          });
          window.OneSignal.on('notificationDismiss', function (event) {
            console.warn('OneSignal notification dismissed:', event);
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    if (JSON.stringify(userInfo) && window.OneSignal) {
      window.OneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed) {
          registerDevice();
        }
      });
    }
    registerDevice();
  }, [userInfo.id]);

  const registerDevice = () => {
    if (window.OneSignal && userInfo.id) {
      window.OneSignal.getNotificationPermission((permission) => {
        if (permission === 'granted') {
          window.OneSignal.getUserId((userId) => {
            axios.post(API.REGISTER_ONESIGNAL, {
              oneSignalPlayerId: userId,
              appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID,
            });
          });
        }
      });
    }
  };

  return (
    <Layout className="site-layout">
      <SideBar />
      <Layout className="page-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content className="page-content">
          <div className="content">
            <Switch>
              {renderRoutes(true, partnerInfo)}
              <Route path="*">
                <PageNotFound
                  extra={
                    <div className="text-center">
                      <p>Whoops! Page not found.</p>
                      <Button
                        className="btn-primary-custom"
                        onClick={() => history.replace('/')}
                      >
                        Back Home
                      </Button>
                    </div>
                  }
                />
              </Route>
            </Switch>
          </div>
        </Content>

        <Footer />
      </Layout>
    </Layout>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
