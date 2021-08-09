import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModalError } from 'utilities/modal';
import * as routePath from 'routers/route-path';
import * as routeName from 'routers/route-name';
import Statistic from 'components/Pages/JobDetail/components/Statistic';
import Information from './components/Information';
import Documents from 'components/Pages/JobDetail/components/Documents';
import Notes from 'components/Pages/Notes';
import { Col, Row } from 'antd';
import { getAssignedJobDetail } from 'states/job/actions';
import Contract from 'components/Pages/JobDetail/components/Contract';
import { PAGE_TYPE } from 'constants/common';

const JobAssignedDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [job, setJob] = useState(null);

  useEffect(() => {
    _loadPage();
  }, []);

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      getAssignedJobDetail(id, (data) => {
        if (data) {
          setJob(data);
        } else {
          showModalError({
            title: 'Error',
            content: 'Oops! Something went wrong. Job not found!',
            okText: 'Back to Job assigned',
            onOk: () => history.push(routePath.JOB_ASSIGNED),
          });
        }
      })
    );
  }, []);

  if (job) {
    return (
      <div id="detail-page">
        <div className="breadcrumb">
          <Breadcrumb
            path={[
              { name: routeName.JOB_ASSIGNED, link: routePath.JOB_ASSIGNED },
              job?.code && { name: `Job: ${job.code}` },
            ]}
          />
        </div>
        <TimeLeft time={job.endDate} isComplete={job.isCompleted} />
        <div className="info-header">
          <h4 className="header-text">{job.name}</h4>
        </div>
        <Statistic job={job} />
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8} className="px-8">
            <Information job={job} />
            <Contract
              job={job}
              contract={job?.contractFiles}
              onRefreshPage={_loadPage}
              textNoContract="No contract has been uploaded yet"
              canCreateContract={false}
            />
          </Col>
          <Col xs={24} md={16} className="px-8">
            <Notes
              job={job}
              onRefreshPage={_loadPage}
              pageType={PAGE_TYPE.ASSIGNED}
            />
            <Documents job={job} onRefreshPage={_loadPage} type="assign" />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};

export default withRouter(JobAssignedDetail);
