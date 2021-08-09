import React, { useCallback } from 'react';
import { NoData } from 'components/Atoms';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { Col, Row } from 'antd';
import './styles.scss';

const Jobs = ({ jobs }) => {
  const _itemJob = useCallback(
    (job) => (
      <div className="block p-10 job" key={job.id}>
        <div className="job-info">
          <img className="avatar" src={job.partnerLogo} />
          <p className="job-name">{job.jobName}</p>
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
      <span className="header-job">Jobs</span>
      {(jobs?.length && jobs.map(_itemJob)) || (
        <NoData description={COMMON_NODATA_TEXT.JOB} />
      )}
    </>
  );
};

export default Jobs;
