import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Alert } from 'antd';
import { MyButton, MyRadio } from 'components/Atoms';
import { CONTRACT_SIGN_METHOD } from 'constants/common';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { paymentDocusign, getDetailSubscription } from 'states/billing/actions';

import { selectUserInfo } from 'states/auth/selectors';
import { selectSubscriptionDetail } from 'states/billing/selectors';

import { useSelector, useDispatch } from 'react-redux';
import { selectPartnerInfo } from 'states/partner/selectors';

import { CARD_OPTIONS } from 'constants/stripe';

const Step1 = ({ signMethod, setSignMethod, onSubmit }) => {
  const dispatch = useDispatch();

  const info = useSelector(selectPartnerInfo());

  const subscriptionDetail = useSelector(selectSubscriptionDetail());

  const fetchDataSubscription = (currentSubscriptionId) => {
    return new Promise((resolve, reject) => {
      return dispatch(
        getDetailSubscription({ id: currentSubscriptionId, resolve, reject })
      );
    });
  };

  useEffect(() => {
    if (info?.subscriptionId) {
      fetchDataSubscription(info?.subscriptionId);
    }
  }, [info]);

  const showCard = useMemo(() => {
    return signMethod === 2 && info.docuSignCount <= 0;
  }, [signMethod, info.docuSignCount]);

  const options = useMemo(() => {
    const { docuSignCount } = info;
    if (!subscriptionDetail) return;
    const { docusignUnitPrice } = subscriptionDetail;
    let arr = Array.from(CONTRACT_SIGN_METHOD);

    let title = `By Docusign (${
      docuSignCount > 0
        ? `${docuSignCount} signed time${docuSignCount > 1 ? 's' : ''} left`
        : `$${docusignUnitPrice || 0} per used`
    })`;

    if (docusignUnitPrice == null) {
      arr[1].title = 'By Docusign';
      arr[1].subTitle = 'Not available for your subscription package';
      arr[1].disabled = true;
    } else {
      arr[1].title = title;
    }

    return arr;
  }, [info, subscriptionDetail]);

  const handleSelectMethod = () => {
    if (showCard) {
      onFinish();
    } else {
      onSubmit();
    }
  };

  // stripe

  const userInfo = useSelector(selectUserInfo());

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeStripeCard = (e) => {
    setError(e.error);
    setCardComplete(e.complete);
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      dispatch(
        paymentDocusign(async (isSuccess, clientSecret) => {
          if (!isSuccess) {
            setLoading(false);
            return;
          }

          const pay = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: userInfo.firstName + ' ' + userInfo.lastName,
                email: userInfo.email,
              },
            },
          });

          setLoading(false);

          if (pay.error) {
            setError(pay.error);
          } else {
            // The payment has been processed!
            if (pay.paymentIntent.status === 'succeeded') {
              onSubmit();
            }
          }
        })
      );
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h4 className="title">How do you want to sign contract</h4>
      <p className="description">Select one of signing method below</p>

      <div className="mx-n25">
        <MyRadio
          value={signMethod}
          options={options}
          onChange={setSignMethod}
        />
        {showCard && (
          <CardForm
            onChangeStripeCard={onChangeStripeCard}
            error={error}
            loading={loading}
          />
        )}
      </div>

      <div className="py-20">
        <MyButton
          onClick={handleSelectMethod}
          className="btn-primary-custom"
          disabled={showCard && (!stripe || !cardComplete || loading)}
        >
          Select method
        </MyButton>
      </div>
    </>
  );
};

export default Step1;

const CardForm = ({ onChangeStripeCard, error, loading }) => {
  return (
    <Col>
      <Row>
        <Col>
          <h3>Please input your card number for payment of Docusign</h3>
        </Col>
      </Row>
      <Row xs={24}>
        <Col xs={24}>
          <CardElement
            onChange={onChangeStripeCard}
            options={{ ...CARD_OPTIONS, disabled: loading }}
          />
        </Col>
      </Row>
      <Row>{error && <Alert message={error.message || ''} type="error" />}</Row>
    </Col>
  );
};
