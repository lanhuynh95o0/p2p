import React, { useState } from 'react';
import { Col, Row, Form, Alert } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MyButton } from 'components/Atoms';
import { selectUserInfo } from 'states/auth/selectors';
import { paymentSubscription } from 'states/billing/actions';

import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import { CARD_OPTIONS, STRIPE_STATUS } from 'constants/stripe';

const CheckoutPackage = ({
  visible = false,
  onBack,
  totalPrice,
  userInfo,
  selectedPackage,
  openSuccessModal,
  coupon,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeStripeCard = (e) => {
    setError(e.error);
    setCardComplete(e.complete);
  };

  const onFinalPayment = async (isSuccess, data) => {
    try {
      if (!isSuccess) {
        return;
      }
      if (data.invoicePaymentStatus === STRIPE_STATUS.REQUIRES_ACTION) {
        await stripe.confirmCardPayment(data.clientSecret);
      }

      if (data.setupIntentStatus === STRIPE_STATUS.REQUIRES_ACTION) {
        await stripe.confirmCardSetup(data.clientSecret);
      }

      openSuccessModal();
    } catch (error) {
      const errData = ErrorHandler.getErrorData(error);
      showModalError({ content: errData.message });
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo.firstName + ' ' + userInfo.lastName,
          email: userInfo.email,
        },
      });

      if (!payload?.paymentMethod || !payload?.paymentMethod?.id) {
        setError(payload.error);
        setLoading(false);
        return;
      }

      const paymentData = {
        paymentMethodId: payload.paymentMethod.id,
        subscriptionPlanId: selectedPackage.id,
        isDefaultPaymentMethod: false,
        coupon: coupon?.id,
      };

      dispatch(paymentSubscription(paymentData, onFinalPayment));
    } catch (err) {
      setError(err);
    }
  };

  const calculateTotalValue = (total = 0) => {
    if (!coupon) return total;

    switch (coupon?.type) {
      case 'AmountOff':
        return total - coupon.amountOff;
      case 'PercentOff':
        return (total * (100 - coupon.percentOff)) / 100;
      default:
        return total;
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className={`checkout-package ${!visible && 'd-none'}`}
    >
      <div className="text-center">
        <h4 className="title">Checkout</h4>
        <p className="description">
          {/* All of your account information will be kept in private */}
        </p>
      </div>
      <div className="info">
        <div className="info-price p-8">
          <Row className="py-16">
            <Col span={8} className="info-name text-left">
              Total
            </Col>
            <Col span={16} className="info-total text-right">
              {coupon ? (
                <>
                  <span>${calculateTotalValue(totalPrice)}</span>{' '}
                  <span
                    style={{ textDecoration: 'line-through', color: '#73726c' }}
                  >
                    (${totalPrice})
                  </span>{' '}
                  <span>/month</span>
                </>
              ) : (
                <span>{`${totalPrice}/month`}</span>
              )}
            </Col>
          </Row>
          <hr />
        </div>
        {coupon && (
          <div className="info-price p-8">
            <Row className="py-16">
              <Col span={8} className="info-name text-left">
                Coupon
              </Col>
              <Col span={16} className="info-total text-right">
                {coupon?.id}
              </Col>
            </Row>
            <hr />
          </div>
        )}
      </div>

      <div className="stripe-card-wrapper p-8">
        <CardElement
          onChange={onChangeStripeCard}
          options={{ ...CARD_OPTIONS, disabled: loading }}
        />
      </div>

      {error && (
        <div className="error-message-wrapper p-8">
          <Alert message={error.message || ''} type="error" />
        </div>
      )}

      <div className="t-center mt-30 mb-70">
        <Form.Item shouldUpdate={true}>
          {() => (
            <>
              <MyButton onClick={onBack} className="btn-secondary-custom mx-10">
                Back
              </MyButton>
              <MyButton
                htmlType="submit"
                className="btn-primary-custom mx-10"
                disabled={!stripe || !cardComplete || loading}
                loading={loading}
              >
                {`Check out ($${calculateTotalValue(totalPrice)})`}
              </MyButton>
            </>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
});

export default connect(mapStateToProps)(CheckoutPackage);
