import { MyModal, SuccessfulScreen } from 'components/Atoms';
import { JOB_ASSIGNED, JOB_ASSIGNED_DETAIL, LOGIN } from 'routers/route-path';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { APP_INFO, SORT_BY_JOB_ASSIGN } from 'constants/common';

const ModalFinishInvitation = ({
  isAccepted,
  isRedirect,
  isRejected,
  job,
  isLogin,
}) => {
  const history = useHistory();
  const _navigatePage = useCallback((value) => () => history.push(value), []);

  const _goToJobOffer = useCallback(() => {
    history.push({
      pathname: JOB_ASSIGNED,
      search: `?assignedBy=${SORT_BY_JOB_ASSIGN[1].id}`,
    });
  }, []);

  const info = useMemo(() => {
    if (isAccepted) {
      const description = `You have accepted the job invitation from ${job?.partnerName}. You can now check more detail of this job or view other job offers.`;
      if (isRedirect)
        return {
          description,
          buttonSecondaryText: 'View job offers',
          onClickButtonSecondary: _goToJobOffer,
          buttonPrimaryText: 'Check job detail',
          onClickButtonPrimary: _navigatePage(
            JOB_ASSIGNED_DETAIL.replace(':id', job?.id)
          ),
        };
      return {
        description,
        buttonPrimaryText: 'Back to home',
        onClickButtonPrimary: _navigatePage('/'),
      };
    }
    if (isRejected) {
      if (isLogin) {
        return {
          description: `You have rejected the job invitation from ${job?.partnerName}. You can view other job offers.`,
          buttonPrimaryText: 'View job offers',
          onClickButtonPrimary: _goToJobOffer,
        };
      }
      return {
        description: `You have rejected the job invitation from ${job?.partnerName}. Click "Go to login" to start your experience with ${APP_INFO.NAME}`,
        buttonPrimaryText: 'Go to Login',
        onClickButtonPrimary: _navigatePage(LOGIN),
      };
    }
  }, [isAccepted, isRejected, job]);

  return (
    <MyModal visible={isAccepted || isRejected}>
      <div className="view-center">
        <SuccessfulScreen {...info} />
      </div>
    </MyModal>
  );
};

export default ModalFinishInvitation;
