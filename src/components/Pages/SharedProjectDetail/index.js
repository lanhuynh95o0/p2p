import React, { useCallback, useEffect, useState } from 'react';
import { PageNotFound, TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSharedProjectDetail } from 'states/project/actions';
import Statistic from 'components/Pages/ProjectDetail/components/Statistic';
import Information from 'components/Pages/ProjectDetail/components/Information';
import Documents from 'components/Pages/ProjectDetail/components/Documents';
import Job from 'components/Pages/Job';
import { Col, Row } from 'antd';
import SiteHeaderPublic from 'components/Organisms/PublicHeader';

const ProjectDetail = (props) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    _loadPage();
  }, []);

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      getSharedProjectDetail(id, setProject, () => {
        setIsError(true);
      })
    );
  }, []);

  if (isError) {
    return (
      <>
        <SiteHeaderPublic />
        <PageNotFound />
      </>
    );
  }

  if (project) {
    return (
      <>
        <SiteHeaderPublic />
        <div id="detail-page" className="p-16 bg-primary">
          <TimeLeft time={project.endDate} isComplete={project.process === 100} />

          <div className="info-header">
            <h4 className="header-text">{project.name}</h4>
          </div>
          <Statistic project={project} />
          <Row className="mx-n8">
            <Col xs={24} md={8} className="px-8">
              <Information
                project={project}
                onRefreshPage={_loadPage}
                isEditable={false}
              />
              <Documents
                project={project}
                onRefreshPage={_loadPage}
                isEditable={false}
              />
            </Col>
            <Col xs={24} md={16} className="px-8">
              <Job
                project={project}
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

export default withRouter(ProjectDetail);
