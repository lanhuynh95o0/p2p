import React, { useCallback, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from './Step1';
import Step2 from './Step2';
import { useDispatch } from 'react-redux';
import { partnerAddJob } from 'states/partner/actions';

const ModalAddJob = (props) => {
  const dispatch = useDispatch();
  const [projectSelected, setProjectSelected] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const _setProject = useCallback((project) => {
    setProjectSelected(project);
    setFinishedStep(2);
    setCurrentStep(2);
  }, []);

  const _refresh = useCallback(() => {
    setCurrentStep(1);
    setFinishedStep(1);
    setIsSuccessful(false);
  }, []);

  const _complete = (job) => {
    dispatch(
      partnerAddJob(job, () => {
        setIsSuccessful(true);
        props.onSubmit();
      })
    );
  };

  const _backStep = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const _closeModal = useCallback(() => {
    props.onClose(isSuccessful);
  }, [isSuccessful]);

  if (isSuccessful) {
    return (
      <SuccessfulScreen
        description="You have added job to your profile"
        buttonSecondaryText="Back"
        onClickButtonSecondary={_closeModal}
        buttonPrimaryText="Add another job"
        onClickButtonPrimary={_refresh}
      />
    );
  }

  return (
    <>
      <MyStep
        headers={ADD_JOB_STEP}
        currentStep={currentStep}
        finishedStep={finishedStep}
      />
      <div className="view-content">
        <Step1 visible={currentStep === 1} onNext={_setProject} />
        <Step2
          visible={currentStep === 2}
          onBack={_backStep}
          onNext={_complete}
          project={projectSelected}
        />
      </div>
    </>
  );
};

export default ModalAddJob;

ModalAddJob.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

ModalAddJob.defaultProps = {
  onSubmit: () => {},
};

export const ADD_JOB_STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
];
