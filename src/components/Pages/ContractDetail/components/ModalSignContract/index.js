import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SuccessfulScreen } from 'components/Atoms';
import { CONTRACT_SIGN_METHOD } from 'constants/common';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useDispatch, useSelector } from 'react-redux';
import { signContract, signContractDocusign } from 'states/contract/actions';
import { CONTRACT_SIGN_TYPE } from 'constants/contract';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getStripeKey } from 'states/billing/actions';
import { selectStripeKey } from 'states/billing/selectors';
import { ELEMENTS_OPTIONS } from 'constants/stripe';

const ModalSignContract = ({
  jobId,
  onClose,
  contractId,
  contractSlug,
  participantName,
  signType,
  status,
  partnerText,
  onSubmit,
}) => {
  const dispatch = useDispatch();

  const [fileUploaded, setFileUploaded] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [signMethod, setSignMethod] = useState(CONTRACT_SIGN_METHOD[0].value);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [stripePromise, setStripePromise] = useState(null);

  const stripeKey = useSelector(selectStripeKey());

  const handleLoadStripe = (key) => {
    if (!key) return;

    const stripePromise = loadStripe(key);
    setStripePromise(stripePromise);
  };

  useEffect(() => {
    handleLoadStripe(stripeKey);
  }, [stripeKey]);

  useEffect(() => {
    if (!stripeKey) {
      dispatch(getStripeKey());
    }
  }, []);

  useEffect(() => {
    if (signType === CONTRACT_SIGN_TYPE.MANUALLY.NAME) {
      setCurrentStep(2);
    }
  }, [signType]);

  const _nextStep = () => {
    if (signMethod === CONTRACT_SIGN_METHOD[1].value) {
      return setCurrentStep(3);
    }
    setCurrentStep((value) => Math.min(value + 1), 3);
  };

  const _prevStep = () => {
    if (signMethod === CONTRACT_SIGN_METHOD[1].value) {
      return setCurrentStep(1);
    }
    setCurrentStep((value) => Math.max(value - 1, 1));
  };

  const _submit = () => {
    const onSuccess = (id) => {
      setIsSuccessful(true);
      onSubmit(id);
    };

    if (signMethod === CONTRACT_SIGN_METHOD[0].value) {
      const { id, slug } = fileUploaded;
      dispatch(
        signContract(
          { status, contractId, attachment: { id, slug }, jobId },
          onSuccess
        )
      );
    }
    if (signMethod === CONTRACT_SIGN_METHOD[1].value)
      dispatch(signContractDocusign({ slug: contractSlug, jobId }, onSuccess));
  };

  const _renderBody = useMemo(() => {
    if (currentStep === 1) {
      if (!stripePromise) return null;

      return (
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <Step1
            signMethod={signMethod}
            setSignMethod={setSignMethod}
            onSubmit={_nextStep}
          />
        </Elements>
      );
    }

    if (currentStep === 2)
      return (
        <Step2
          onSubmit={_nextStep}
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          jobId={jobId}
          onBack={_prevStep}
        />
      );
    return (
      <Step3
        onBack={_prevStep}
        onSubmit={_submit}
        partnerText={partnerText}
        partnerName={participantName}
      />
    );
  }, [currentStep, fileUploaded, signMethod, participantName, stripePromise]);

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description={`You have sent invitation to ${partnerText} ${participantName}. Please wait for your ${partnerText} to response`}
          buttonPrimaryText="Back to contract"
          onClickButtonPrimary={onClose}
        />
      </div>
    );
  }
  return <div className="text-center view-content">{_renderBody}</div>;
};

export default ModalSignContract;

ModalSignContract.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  jobId: PropTypes.number,
  contractId: PropTypes.string,
  contractSlug: PropTypes.string,
  participantName: PropTypes.string,
  signType: PropTypes.string,
};

ModalSignContract.defaultProps = {};
