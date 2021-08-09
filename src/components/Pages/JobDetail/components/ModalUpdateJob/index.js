import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from 'components/Pages/Job/components/ModalCreateJob/Step1';
import Step2 from 'components/Pages/Job/components/ModalCreateJob/Step2';
import { useDispatch } from 'react-redux';
import { updateJob } from 'states/job/actions';

const ModalUpdateJob = (props) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [job, setJob] = useState(props.job);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const _updateInfo = useCallback((data) => {
    setJob((value) => ({ ...value, ...data }));
    _onNextStep();
  }, []);

  const _updateJob = useCallback(
    (skills) => {
      dispatch(
        updateJob(
          {
            ...job,
            id: props.job.id,
            projectId: props.job.project.id,
            skills: skills.map((skill) => ({ id: skill.id })),
          },
          () => {
            setIsSuccessful(true);
            props.onSubmit();
          }
        )
      );
    },
    [props.job, job]
  );

  const _onNextStep = useCallback(() => {
    setCurrentStep((n) => {
      let nextStep = Math.min(n + 1, STEP.length);
      setFinishedStep((prevFinishedStep) =>
        Math.max(prevFinishedStep, nextStep)
      );
      return nextStep;
    });
  }, []);

  const _onBackStep = useCallback(() => {
    setCurrentStep((n) => Math.max(n - 1, 1));
  }, []);

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description="You have updated this job. Back to job"
          buttonPrimaryText="Back to job"
          onClickButtonPrimary={props.onClose}
        />
      </div>
    );
  }

  return (
    <>
      <MyStep
        headers={STEP}
        currentStep={currentStep}
        finishedStep={finishedStep}
      />
      <div className="view-content">
        <Step1
          projectId={job.project.id}
          visible={currentStep === 1}
          onNext={_updateInfo}
          job={job}
          title="Update job"
          description="Enter information to update this job"
          buttonText="Next"
          minDate={job.project.startDate}
          maxDate={job.project.endDate}
        />
        <Step2
          visible={currentStep === 2}
          onBack={_onBackStep}
          onNext={_updateJob}
          skills={job.skills}
          buttonText="Update job"
        />
      </div>
    </>
  );
};

export default ModalUpdateJob;

ModalUpdateJob.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  job: PropTypes.object,
};

const STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
];
