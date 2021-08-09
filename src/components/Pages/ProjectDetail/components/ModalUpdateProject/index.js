import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from 'components/Pages/Projects/components/ModalCreateProject/Step1';
import Step2 from 'components/Pages/Projects/components/ModalCreateProject/Step4';
import { useDispatch } from 'react-redux';
import { updateProject } from 'states/project/actions';

const ModalUpdateProject = (props) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState(props.project);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const _updateInfo = useCallback((data) => {
    setProject((value) => ({ ...value, ...data }));
    _onNextStep();
  }, []);

  const _updateProject = useCallback(
    (clientId) => {
      dispatch(
        updateProject({ ...project, id: props.project.id, clientId }, () => {
          props.onSubmit();
          setIsSuccessful(true);
        })
      );
    },
    [props.project, project]
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

  return useMemo(() => {
    if (isSuccessful) {
      return (
        <div className="view-center">
          <SuccessfulScreen
            description="You have updated this project. Back to project"
            buttonPrimaryText="Back to project"
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
            visible={currentStep === 1}
            onNext={_updateInfo}
            project={project}
            title="Update project"
            message="Enter information to update this project"
            buttonText="Next"
          />
          <Step2
            visible={currentStep === 2}
            onBack={_onBackStep}
            onNext={_updateProject}
            clientId={props.project?.client?.id}
          />
        </div>
      </>
    );
  }, [isSuccessful, currentStep]);
};

export default ModalUpdateProject;

ModalUpdateProject.propTypes = {
  onClose: PropTypes.func,
  project: PropTypes.object,
};

const STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
];
