import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { MyModal, MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, getProjects } from 'states/project/actions';
import {
  PROJECT_DEFAULT,
  PROJECT_STEP,
} from 'components/Pages/Projects/constant';
import ModalCreateJob from 'components/Pages/Job/components/ModalCreateJob';
import { selectProjects } from 'states/project/selectors';

const ModalCreateProject = (props) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState(Object.assign({}, PROJECT_DEFAULT));
  const projectQuery = useSelector(selectProjects());
  const [modalAddJob, setModalAddJob] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  const _switchModalAddJob = useCallback(
    (visible) => () => {
      setModalAddJob(visible);
    },
    []
  );

  const _onNextStep = useCallback(() => {
    setCurrentStep((n) => {
      let nextStep = Math.min(n + 1, PROJECT_STEP.length);
      setFinishedStep((prevFinishedStep) =>
        Math.max(prevFinishedStep, nextStep)
      );
      return nextStep;
    });
  }, [project.projectDocuments]);

  const _onBackStep = useCallback(() => {
    setCurrentStep((n) => {
      let preStep = Math.max(n - 1, 1);
      if (preStep === 3 && !project.projectDocuments?.length) preStep--;
      return preStep;
    });
  }, [project.projectDocuments]);

  const _createProject = useCallback((data) => {
    setProject((value) => ({ ...value, ...data }));
    _onNextStep();
  }, []);

  const _updateDocument = useCallback(
    (data, email) => {
      setEmail(email);
      setProject((value) => ({ ...value, projectDocuments: data }));
      _onNextStep();
      if (!data?.length) _onNextStep();
    },
    [project.projectDocuments]
  );

  const _closeModal = useCallback(() => {
    props.onClose(isSuccessful);
  }, [isSuccessful]);

  const _completeCreateProject = (clientId) => {
    const payload = {
      ...project,
      assignedEmail: email,
      clientId,
      projectDocuments: project.projectDocuments.map((item) => ({
        id: item.id,
        slug: item.slug,
        privacy: item.privacy,
      })),
    };
    dispatch(
      createProject(payload, (id) => {
        setProject((value) => ({ ...value, id }));
        setIsSuccessful(true);
        if (projectQuery) {
          const { term, skip, take, sortBy } = projectQuery;
          dispatch(getProjects({ term, skip, take, sortBy }));
        }
      })
    );
  };

  const _renderStepBody = useMemo(() => {
    return (
      <>
        <div className={`${isSuccessful && 'd-none'}`}>
          <MyStep
            headers={PROJECT_STEP}
            currentStep={currentStep}
            finishedStep={finishedStep}
          />

          <div className="view-content">
            <Step1
              visible={currentStep === 1}
              onNext={_createProject}
              project={project}
            />
            <Step2
              visible={currentStep === 2}
              onBack={_onBackStep}
              willDeleteWhenUnmount={!isSuccessful}
              onNext={_updateDocument}
            />
            <Step3
              visible={currentStep === 3}
              onBack={_onBackStep}
              onNext={_onNextStep}
              documents={project.projectDocuments}
            />
            <Step4
              visible={currentStep === 4}
              onBack={_onBackStep}
              onNext={_completeCreateProject}
            />
          </div>
        </div>
        <div className={`${!isSuccessful ? 'd-none' : 'view-center'}`}>
          <SuccessfulScreen
            description="You have created new project. Start to add new jobs or back to dashboard"
            buttonSecondaryText="Back to dashboard"
            onClickButtonSecondary={_closeModal}
            buttonPrimaryText="Add new jobs"
            onClickButtonPrimary={_switchModalAddJob(true)}
          />
        </div>
      </>
    );
  }, [currentStep, isSuccessful, projectQuery]);

  return (
    <>
      {_renderStepBody}
      <MyModal visible={modalAddJob} onClose={_switchModalAddJob(false)}>
        <ModalCreateJob
          onClose={_switchModalAddJob(false)}
          projectId={project.id}
          currency={project.currency}
          minDate={project?.startDate}
          maxDate={project?.endDate}
        />
      </MyModal>
    </>
  );
};

export default ModalCreateProject;

ModalCreateProject.propTypes = {
  onClose: PropTypes.func,
};
