import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MyStep, SuccessfulScreen } from 'components/Atoms';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { useDispatch } from 'react-redux';
import {
  JOB_DEFAULT,
  JOB_STEP,
  JOB_UNKNOWN_USER_INVITE,
} from 'components/Pages/Job/constant';
import { createJob, invitePartnerForJob } from 'states/job/actions';
import { partnerValidateEmail } from 'states/partner/actions';
import {
  showModalConfirm,
  showModalNoticeInviteContractor,
} from 'utilities/modal';

const ModalCreateJob = (props) => {
  const dispatch = useDispatch();
  const refreshWhenClose = useRef(false);
  const [job, setJob] = useState(Object.assign({}, JOB_DEFAULT));
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    _refresh();
  }, [props.projectId]);

  const _refresh = useCallback(() => {
    setJob(Object.assign({ projectId: props.projectId }, JOB_DEFAULT));
    setCurrentStep(1);
    setFinishedStep(1);
    setIsSuccessful(false);
  }, [props.projectId]);

  const _onNextStep = useCallback(() => {
    setCurrentStep((n) => {
      let nextStep = Math.min(n + 1, JOB_STEP.length);
      setFinishedStep((prevFinishedStep) =>
        Math.max(prevFinishedStep, nextStep)
      );
      return nextStep;
    });
  }, [job.projectDocuments]);

  const _onBackStep = useCallback(() => {
    setCurrentStep((n) => {
      let preStep = Math.max(n - 1, 1);
      if (preStep === 4 && !job.jobDocuments?.length) preStep--;
      return preStep;
    });
  }, [job.jobDocuments]);

  const _createProject = useCallback((data) => {
    setJob((value) => ({ ...value, ...data }));
    _onNextStep();
  }, []);

  const _updateSkill = useCallback((skills) => {
    setJob((value) => ({
      ...value,
      skills: skills.map((skill) => ({ id: skill.id })),
    }));
    _onNextStep();
  }, []);

  const _updateDocument = useCallback((data, assignedEmail) => {
    setJob((value) => ({ ...value, jobDocuments: data, assignedEmail }));
    _onNextStep();
    if (!data?.length) _onNextStep();
  }, []);

  const _completeCreateJob = ({ participantPartner, partnerInvited }) => {
    const emailInvite = participantPartner.email || partnerInvited;
    const payload = {
      ...job,
      participantPartnerId: participantPartner.id,
      estimateCost: +job.estimateCost,
      jobDocuments: job.jobDocuments.map((item) => ({
        id: item.id,
        slug: item.slug,
        privacy: item.privacy,
      })),
    };

    dispatch(
      createJob(payload, (jobId) => {
        const finish = (data) => {
          props.onSubmit();
          setIsSuccessful(true);
          refreshWhenClose.current = true;
          showModalNoticeInviteContractor(data);
        };
        const sendInvite = () => {
          dispatch(
            invitePartnerForJob({ email: emailInvite, jobIds: [jobId] }, finish)
          );
        };

        if (emailInvite) {
          const { TITLE, CONTENT, CANCEL_TEXT, OK_TEXT } =
            JOB_UNKNOWN_USER_INVITE;
          dispatch(
            // Check mail exist.
            partnerValidateEmail(
              emailInvite,
              () => {
                // Mail not existed.
                showModalConfirm({
                  title: TITLE,
                  content: CONTENT,
                  cancelText: CANCEL_TEXT,
                  okText: OK_TEXT,
                  onOk: sendInvite,
                });
              },
              // Mail exist.
              sendInvite
            )
          );
        } else {
          finish();
        }
      })
    );
  };

  if (isSuccessful) {
    return (
      <SuccessfulScreen
        description="You have created new job. Please wait for your contractor to response"
        buttonSecondaryText="Back to project"
        onClickButtonSecondary={props.onClose}
        buttonPrimaryText="Add another jobs"
        onClickButtonPrimary={_refresh}
      />
    );
  }

  return (
    <>
      <MyStep
        headers={JOB_STEP}
        currentStep={currentStep}
        finishedStep={finishedStep}
      />

      <div className="view-content">
        <Step1
          visible={currentStep === 1}
          onNext={_createProject}
          currency={props.currency}
          minDate={props.minDate}
          maxDate={props.maxDate}
          projectId={props.projectId}
          job={job}
        />
        <Step2
          visible={currentStep === 2}
          onBack={_onBackStep}
          onNext={_updateSkill}
        />
        <Step3
          visible={currentStep === 3}
          onBack={_onBackStep}
          onNext={_updateDocument}
        />
        <Step4
          visible={currentStep === 4}
          onBack={_onBackStep}
          onNext={_onNextStep}
          documents={job.jobDocuments}
        />
        <Step5
          visible={currentStep === 5}
          onBack={_onBackStep}
          onNext={_completeCreateJob}
          isCreate={true}
        />
      </div>
    </>
  );
};

export default ModalCreateJob;

ModalCreateJob.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  projectId: PropTypes.number,
  currency: PropTypes.string,
};

ModalCreateJob.defaultProps = {
  onSubmit: () => {},
};
