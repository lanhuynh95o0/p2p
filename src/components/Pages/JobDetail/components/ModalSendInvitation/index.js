import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SuccessfulScreen } from 'components/Atoms';
import Step1 from 'components/Pages/Job/components/ModalCreateJob/Step5';
import { useDispatch } from 'react-redux';
import { invitePartnerForJob } from 'states/job/actions';
import { partnerValidateEmail } from 'states/partner/actions';
import {
  showModalConfirm,
  showModalNoticeInviteContractor,
} from 'utilities/modal';
import { JOB_UNKNOWN_USER_INVITE } from 'components/Pages/Job/constant';

const ModalSendInvitation = (props) => {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const _completeCreateJob = ({ participantPartner, partnerInvited }) => {
    const emailInvite = participantPartner.email || partnerInvited;

    const sendInvite = () => {
      dispatch(
        invitePartnerForJob(
          {
            email: emailInvite,
            jobIds: [props.jobId],
          },
          (data) => {
            props.onSubmit();
            setIsSuccessful(true);
            showModalNoticeInviteContractor(data);
          }
        )
      );
    };

    if (emailInvite) {
      const { TITLE, CONTENT, CANCEL_TEXT, OK_TEXT } = JOB_UNKNOWN_USER_INVITE;
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
    }
  };

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description={`You have sent the invitation to contractor successfully. Please wait for your contractor to response.`}
          buttonPrimaryText="Back"
          onClickButtonPrimary={props.onClose}
        />
      </div>
    );
  }

  return (
    <div className="view-content">
      <Step1
        visible={true}
        onBack={props.onClose}
        onNext={_completeCreateJob}
      />
    </div>
  );
};

export default ModalSendInvitation;

ModalSendInvitation.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  jobId: PropTypes.number,
};

ModalSendInvitation.defaultProps = {
  onSubmit: () => {},
};
