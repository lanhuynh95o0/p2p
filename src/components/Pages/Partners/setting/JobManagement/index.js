import React, { useCallback, useState } from 'react';
import './styles.scss';
import { Image, MyButton, MyModal, NoData } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import ModalAddJob from '../../components/ModalAddJob';
import { Col, Row } from 'antd';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { showModalConfirm } from 'utilities/modal';
import { partnerRemoveJob } from 'states/partner/actions';
import { useDispatch } from 'react-redux';
import { messageAction } from 'utilities/message';

const JobManagement = (props) => {
  const dispatch = useDispatch();
  const [modalAddJobVisible, setModalAddJobVisible] = useState(false);

  const _switchModalAddJob = useCallback(
    (value) => () => setModalAddJobVisible(value),
    []
  );

  const _remove = useCallback(
    (job) => () => {
      showModalConfirm({
        title: 'Archive Job',
        content: 'Are you sure you want to archive this job?',
        cancelText: 'Cancel',
        okText: 'Archive',
        onOk: () =>
          dispatch(
            partnerRemoveJob(job.id, () => {
              props.onRefreshPage();
              messageAction.removeJobSuccess(job);
            })
          ),
      });
    },
    []
  );

  const _itemJob = useCallback(
    (job) => (
      <div className="block p-10 job" key={job.id}>
        <div className="job-info">
          <Image alt="avatar" className="avatar" src={job.partnerLogo} />
          <span className="name">{job.jobName}</span>
          <Icon
            component={IconCustom.Trash}
            className="job-delete"
            onClick={_remove(job)}
          />
        </div>
        <p className="overview">Overview</p>

        <Row>
          <Col className="info-name" span={6}>
            Project
          </Col>
          <Col className="info-value" span={18}>
            {job.projectName}
          </Col>
        </Row>
        <Row>
          <Col className="info-name" span={6}>
            Owner
          </Col>
          <Col className="info-value" span={18}>
            {job.partnerName}
          </Col>
        </Row>
      </div>
    ),
    []
  );
  return (
    <>
      {/*Statistic*/}
      <div className="block p-10">
        <Row>
          <Col span={12} className="statistic">
            <p className="title m-0">Own Projects</p>
            <p className="count-number m-0">
              {props.profile?.ownProjects || 0}
            </p>
          </Col>
          <Col span={12} className="statistic">
            <p className="title m-0">Assigned Jobs</p>
            <p className="count-number m-0">
              {props.profile?.assignedJobs || 0}
            </p>
          </Col>
        </Row>
      </div>
      {/* Jobs */}
      {/* <div className="d-table w-100p">
        <span className="header-job">Assigned Jobs</span>
        <MyButton
          className="btn-primary-custom f-right"
          onClick={_switchModalAddJob(true)}
        >
          <Icon component={IconCustom.Plus} /> Add New
        </MyButton>
      </div>
      {(props.jobs?.length && props.jobs.map(_itemJob)) || (
        <NoData description={COMMON_NODATA_TEXT.JOB} />
      )}

      <MyModal visible={modalAddJobVisible} onClose={_switchModalAddJob(false)}>
        <ModalAddJob
          onClose={_switchModalAddJob(false)}
          onSubmit={props.onRefreshPage}
        />
      </MyModal> */}
    </>
  );
};

export default JobManagement;
