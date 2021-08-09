import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, MyButton, MyModal, TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showModalConfirm, showModalError } from 'utilities/modal';
import { PROJECT_DETAIL, PROJECTS } from 'routers/route-path';
import Statistic from './components/Statistic';
import Information from './components/Information';
import Documents from './components/Documents';
import Notes from '../Notes';
import { Col, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { completeJob, getJob, removeJob } from 'states/job/actions';
import { JOB_CONFIRM_REMOVE } from '../Job/constant';
import Contract from './components/Contract';
import ModalReviewPartner from './components/ModalReviewPartner';
import { INVITE_STATUS } from 'constants/common';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';
import './styles.scss';

const JobDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalReview, setModalReview] = useState(false);
  const [job, setJob] = useState(null);

  const partnerInfo = useSelector(selectPartnerInfo());

  useEffect(() => {
    _loadPage();
  }, []);

  const _switchModalReview = useCallback(
    (value) => () => setModalReview(value),
    []
  );

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      getJob(id, (data) => {
        if (data) {
          setJob(data);

          if (data.isCompleted) {
            const { hash } = window.location;

            if (hash === '#review') {
              setModalReview(true);
            }
          }
        } else {
          showModalError({
            title: 'Error',
            content: 'Oops! Something went wrong. Job not found!',
            okText: 'Back to project list',
            onOk: () => history.push(PROJECTS),
          });
        }
      })
    );
  }, []);

  const _removeJob = useCallback(() => {
    const { MESSAGE, TITLE } = JOB_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          removeJob(job.id, () => {
            history.push(PROJECT_DETAIL.replace(':id', job.project?.id));
          })
        );
      },
    });
  }, [job]);

  const _completeJob = () => {
    showModalConfirm({
      title: 'Complete job',
      content: 'Are you sure you want to complete this job?',
      cancelText: 'Cancel',
      okText: 'Complete',
      onOk: () =>
        dispatch(
          completeJob(job.id, () => {
            _loadPage();
            setModalReview(true);
          })
        ),
    });
  };

  const _renderConfirmButton = useMemo(() => {
    if (
      job?.process === 100 &&
      job?.participantPartner?.status === INVITE_STATUS.ACCEPTED &&
      !job?.isCompleted
    ) {
      return (
        <MyButton className="btn-primary-custom mr-10" onClick={_completeJob}>
          Complete
        </MyButton>
      );
    }
    if (job?.isCompleted) {
      return (
        <MyButton
          className="btn-primary-custom mr-10"
          onClick={_switchModalReview(true)}
        >
          {!job?.review?.id || job.review?.status === 'Rejected'
            ? 'Review'
            : 'View Review'}
        </MyButton>
      );
    }
    return null;
  }, [job]);

  if (job) {
    return (
      <div id="detail-page" className="job-detail-page">
        <div className="breadcrumb">
          <Breadcrumb
            path={[
              { name: 'Projects', link: PROJECTS },
              job?.project && {
                name: `Project: ${job.project.code}`,
                link: PROJECT_DETAIL.replace(':id', job.project.id),
              },
              job?.code && { name: `Job: ${job.code}` },
            ]}
          />
        </div>
        <TimeLeft time={job.endDate} isComplete={job.isCompleted} />
        <div className="info-header">
          <h4 className="header-text">{job.name}</h4>
          {_renderConfirmButton}
          {job.contractFiles?.length === 0 && isNotEmployee(partnerInfo) && (
            <div className="text-right">
              <MyButton className="my-btn-no-style btn-edit" onClick={_removeJob}>
                <Icon component={IconCustom.Trash} />
                Archive job
              </MyButton>
            </div>
          )}
        </div>
        <Statistic job={job} />
        <Row className="mx-n8">
          <Col xs={24} md={8} className="px-8">
            <Information
              job={job}
              projectId={job.projectId || null}
              onRefreshPage={_loadPage}
            />

            <Contract
              job={job}
              contract={job?.contractFiles}
              onRefreshPage={_loadPage}
            />
          </Col>
          <Col xs={24} md={16} className="px-8">
            <Notes job={job} onRefreshPage={_loadPage} />
            <Documents job={job} onRefreshPage={_loadPage} />
          </Col>
        </Row>
        <MyModal visible={modalReview} onClose={_switchModalReview(false)}>
          <ModalReviewPartner
            onClose={_switchModalReview(false)}
            revieweeId={job.participantPartner?.id}
            jobId={job?.id}
            review={job.review}
            disable={!!job.review?.id && job.review?.status !== 'Rejected'}
            onSubmit={_loadPage}
          />
        </MyModal>
      </div>
    );
  }
  return null;
};

export default withRouter(JobDetail);
