import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from './Step1';
import Step2 from './Step2';
import { useDispatch } from 'react-redux';
import { invitePartnerForJob } from 'states/job/actions';
import { PROJECTS } from 'routers/route-path';
import { showModalNoticeInviteContractor } from 'utilities/modal';

const ModalSendInvitation = (props) => {
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);

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
    setCurrentStep((n) => {
      return Math.max(n - 1, 1);
    });
  }, []);

  const _chooseProject = useCallback((value) => {
    setSelectedProject(value);
    _onNextStep();
  }, []);

  const _senInvitation = (jobIds) => {
    dispatch(
      invitePartnerForJob(
        {
          email: props.email,
          jobIds,
        },
        (data) => {
          setIsSuccessful(true);
          showModalNoticeInviteContractor(data);
        }
      )
    );
  };

  if (isSuccessful) {
    const backToProjects = () => {
      const { protocol } = window.location;
      const host = process.env.REACT_APP_HOST_NAME;
      const subDomain = process.env.REACT_APP_HOST;
      window.location.href = `${protocol}//${subDomain}.${host}${PROJECTS}`;
    };

    return (
      <div className="view-center">
        <SuccessfulScreen
          description={`You have sent the invitation to contractor ${props.partnerName}. Please wait for your contractor to response.`}
          buttonPrimaryText="Go to projects"
          onClickButtonPrimary={backToProjects}
          buttonSecondaryText="Back"
          onClickButtonSecondary={props.onClose}
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
          buttonText="Continue"
          visible={currentStep === 1}
          onNext={_chooseProject}
        />

        <Step2
          visible={currentStep === 2}
          onBack={_onBackStep}
          onNext={_senInvitation}
          selectedProject={selectedProject}
          projectId={selectedProject?.id}
          buttonText="Complete"
        />
      </div>
    </>
  );
};

export default ModalSendInvitation;

ModalSendInvitation.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  partnerName: PropTypes.string,
  email: PropTypes.string,
};

ModalSendInvitation.defaultProps = {
  onSubmit: () => { },
};

export const STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
];
