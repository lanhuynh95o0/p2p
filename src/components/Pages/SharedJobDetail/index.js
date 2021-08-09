import React, { useCallback, useEffect, useState } from 'react';
import { TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModalError } from 'utilities/modal';
import Statistic from 'components/Pages/JobDetail/components/Statistic';
import Information from 'components/Pages/JobDetail/components/Information';
import Documents from 'components/Pages/JobDetail/components/Documents';
import Notes from 'components/Pages/Notes';
import { Col, Row } from 'antd';
import { getSharedJobDetail } from 'states/job/actions';
import SiteHeaderPublic from 'components/Organisms/PublicHeader';
import { PAGE_TYPE } from 'constants/common';

const SharedJobDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [job, setJob] = useState(null);

  const { id: jobId } = useParams();

  useEffect(() => {
    _loadPage();
  }, []);

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      getSharedJobDetail(id, (data) => {
        if (data) {
          setJob(data);
        } else {
          showModalError({
            title: 'Error',
            content: 'Oops! Something went wrong. Job not found!',
            okText: 'Back to Home',
            onOk: () => history.push('/'),
          });
        }
      })
    );
  }, []);

  if (job) {
    return (
      <>
        <SiteHeaderPublic />
        <div id="detail-page" className="p-16 bg-primary">
          <TimeLeft time={job.endDate} isComplete={job.isCompleted} />
          <div className="info-header">
            <h4 className="header-text">{job.name}</h4>
          </div>
          <Statistic job={job} />
          <Row className="mx-n8">
            <Col span={8} className="px-8">
              <Information
                job={job}
                projectId={job.projectId || null}
                onRefreshPage={_loadPage}
                isEditable={false}
              />
            </Col>
            <Col span={16} className="px-8">
              <Notes
                job={job}
                onRefreshPage={_loadPage}
                isEditable={false}
                pageType={PAGE_TYPE.SHARED}
              />
              <Documents
                job={job}
                onRefreshPage={_loadPage}
                isEditable={false}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
  return null;
};

export default withRouter(SharedJobDetail);
