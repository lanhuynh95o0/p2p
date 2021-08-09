import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import moment from 'moment';
import { getCurrentUser } from 'states/auth/actions';

import {
  getSubscription,
  getStripeKey,
  cancelSubscription,
  checkCoupon,
} from 'states/billing/actions';
import {
  selectStripeKey,
  selectSubscriptionData,
} from 'states/billing/selectors';

import { Breadcrumb, MyModal, SuccessfulScreen } from 'components/Atoms';
import { PackageInfo } from './components/PackageInfo';
import SubscriptionPackageModal from './components/SubscriptionPackageModal';

import './styles.scss';
import { showModalConfirm } from 'utilities/modal';

import { ELEMENTS_OPTIONS } from 'constants/stripe';

const Subscriptions = ({ subscriptionData, stripeKey }) => {
  const dispatch = useDispatch();

  const [modalSubscriptionPackage, setModalSubscriptionPackage] = useState({
    visible: false,
    data: { name: '', billingPriceInCent: 0, expiredDate: '' },
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [registerPackage, setRegisterpackage] = useState({});
  const [isTrial, setIsTrial] = useState(true);
  const onCheckCoupon = useCallback(
    async (coupon) => {
      if (!stripeKey) return;
      return new Promise((resolve, reject) =>
        dispatch(checkCoupon({ id: coupon, resolve, reject, stripeKey }))
      );
    },
    [stripeKey]
  );

  useEffect(() => {
    dispatch(getSubscription());

    if (!stripeKey) {
      dispatch(getStripeKey());
    }
  }, []);

  useEffect(() => {
    handleLoadStripe(stripeKey);
  }, [stripeKey]);

  useEffect(() => {
    const registerPackage =
      subscriptionData.find((item) => item.isCurrentPlan) || {};
    const expiredPackage = subscriptionData.find((item) => item.expiredDate);
    setIsTrial(!expiredPackage);
    setRegisterpackage(registerPackage);
  }, [subscriptionData]);

  const handleLoadStripe = (key) => {
    if (!key) return;

    const stripePromise = loadStripe(key);
    setStripePromise(stripePromise);
  };

  const _switchModalSubscriptionPackage = useCallback(
    (value, item = null) =>
      () => {
        setModalSubscriptionPackage({ visible: value, data: item });
      },
    []
  );

  const onCloseModal = () => {
    setModalSubscriptionPackage({ visible: false });
    setIsSuccess(false);
    dispatch(getCurrentUser());
  };

  const successText = () => {
    return `You have activated the member package "${modalSubscriptionPackage.data?.name}". The next monthly payments will be automatically processed until you cancel your package`;
  };

  const openModal = useCallback(
    (item = null) =>
      () => {
        const expired = moment(item.expiredDate);
        const now = moment();
        const expirationDate = expired.diff(now, 'days') || 0;
        if (item.isCurrentPlan) {
          showModalConfirm({
            title: 'Cancel plan',
            content: `Are you sure to cancel the current plan? You still have ${expirationDate} days 
          to use package “${item.name}”. After ${expirationDate} days, you will be back to “Partner 
          Lite” until upgrading to other package.  `,
            cancelText: 'Cancel',
            okText: 'OK',
            onOk: () => {
              dispatch(
                cancelSubscription(() => {
                  dispatch(getSubscription());
                })
              );
            },
          });
        } else {
          _switchModalSubscriptionPackage(true, item)();
        }
      },
    []
  );

  const openSuccessModalAfterChechout = useCallback(() => {
    dispatch(getSubscription());
    setIsSuccess(true);
  }, []);

  const _renderListPackages = (item, index) => {
    return (
      <PackageInfo
        key={index}
        index={index}
        data={item}
        switchModal={openModal}
        registerPackage={registerPackage}
        isTrial={isTrial}
      />
    );
  };

  return (
    <div className="member-subscriptions-page">
      <div className="px-8 pb-16 d-table w-100p">
        <Breadcrumb
          className="d-table-cell va-m"
          path={[{ name: 'Subscriptions' }]}
        />
      </div>
      <Row className="mt-8" gutter={[16, 16]}>
        {(subscriptionData || []).map(_renderListPackages)}
      </Row>
      <MyModal
        width="80vw"
        visible={modalSubscriptionPackage.visible}
        footer={null}
        destroyOnClose
        onClose={onCloseModal}
      >
        {stripePromise && (
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            {isSuccess ? (
              <SuccessfulScreen
                title="Successful!"
                description={successText()}
                buttonPrimaryText="Close"
                onClickButtonPrimary={onCloseModal}
              />
            ) : (
              <SubscriptionPackageModal
                openSubscriptionModal={_switchModalSubscriptionPackage}
                openSuccessModal={openSuccessModalAfterChechout}
                selectedPackage={modalSubscriptionPackage.data || {}}
                onCheckCoupon={onCheckCoupon}
              />
            )}
          </Elements>
        )}
      </MyModal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  subscriptionData: selectSubscriptionData(),
  stripeKey: selectStripeKey(),
});

export default connect(mapStateToProps)(Subscriptions);
