import React, { useEffect, useState } from 'react';
import { MyStep } from 'components/Atoms';
import { SUBSCRIPTION_PACKAGE_STEP } from '../constants';
import { ConfirmPackage as Step1 } from './ConfirmPackage';
import Step2 from './CheckoutPackage';
import { convertCentToDollar } from 'utilities/common';
import { notification } from 'antd';

const SubscriptionPackageModal = ({
  openSubscriptionModal,
  openSuccessModal,
  selectedPackage,
  onCheckCoupon,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [currentCoupon, setCurrentCoupon] = useState(null);

  useEffect(() => {
    const packagePrice = convertCentToDollar(
      selectedPackage?.billingPriceInCent
    );
    setTotalPrice(packagePrice);
  }, [selectedPackage]);

  const onContinueStep = async () => {
    try {
      if (coupon) {
        const couponValidation = await onCheckCoupon(coupon);
        if (!couponValidation?.id) {
          notification.error({ message: 'Can not find promotion code' });
          setCurrentCoupon(null);
          return;
        } else {
          notification.success({
            message: 'Apply promotion code successfully',
          });
          setCurrentCoupon(couponValidation);
        }
      }
      setCurrentStep((n) => {
        let nextStep = Math.min(n + 1, SUBSCRIPTION_PACKAGE_STEP.length);
        setFinishedStep((prevFinishedStep) =>
          Math.max(prevFinishedStep, nextStep)
        );
        return nextStep;
      });
    } catch (error) {}
  };

  const onBackStep = () => {
    setCurrentStep((n) => {
      return Math.max(n - 1, 1);
    });
  };

  return (
    <div className="subscription-package-modal text-center h-100p">
      <MyStep
        headers={SUBSCRIPTION_PACKAGE_STEP}
        currentStep={currentStep}
        finishedStep={finishedStep}
      />
      <Step1
        visible={currentStep === 1}
        onContinue={onContinueStep}
        onBack={openSubscriptionModal}
        totalPrice={totalPrice}
        selectedPackage={selectedPackage}
        coupon={coupon}
        setCoupon={setCoupon}
      />
      <Step2
        coupon={currentCoupon}
        visible={currentStep === 2}
        onContinue={onContinueStep}
        onBack={onBackStep}
        totalPrice={totalPrice}
        openSuccessModal={openSuccessModal}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default SubscriptionPackageModal;
