import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, MyButton, TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProject,
  getProjectDetail,
  toggleFinanceReportModal,
} from 'states/project/actions';
import { showModalConfirm, showModalError } from 'utilities/modal';
import { PROJECTS } from 'routers/route-path';
import Statistic from './components/Statistic';
import Information from './components/Information';
import Documents from './components/Documents';
import Job from 'components/Pages/Job';
import { Col, Popover, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { PROJECT_CONFIRM_REMOVE } from 'components/Pages/Projects/constant';
import ModalFinanceReport from 'components/Pages/ProjectDetail/components/ModalFinanceReport';
import useActions from 'hooks/useActions';
import Chart from './components/Chart';
import { setHoursForDate } from 'utilities/time';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';
import './styles.scss';

const ProjectDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [project, setProject] = useState(null);

  const partnerInfo = useSelector(selectPartnerInfo());

  const [toggleFinanceReportModalAction] = useActions([
    toggleFinanceReportModal,
  ]);

  useEffect(() => {
    _loadPage();
  }, []);

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      getProjectDetail(id, (data) => {
        if (data) {
          setProject(data);
        } else {
          showModalError({
            title: 'Error',
            content: 'Oops! Something went wrong. Project not found!',
            okText: 'Back to project list',
            onOk: () => history.push(PROJECTS),
          });
        }
      })
    );
  }, []);

  const _removeProject = useCallback(() => {
    const { TITLE, MESSAGE } = PROJECT_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          deleteProject(project.id, () => {
            history.push(PROJECTS);
          })
        );
      },
    });
  }, [project]);

  if (project) {
    return (
      <div id="detail-page" className="project-detail">
        <ModalFinanceReport />
        <div className="breadcrumb">
          <Breadcrumb
            path={[
              { name: 'Projects', link: PROJECTS },
              project?.code && { name: `Project: ${project.code}` },
            ]}
          />
        </div>
        <TimeLeft time={project.endDate} isComplete={project.process === 100} />

        <div className="info-header project-info-header">
          <h4 className="header-text">{project.name}</h4>
          <Popover
            placement="bottomRight"
            content={
              <div className="my-popover-container">
                <MyButton
                  className="my-btn-no-style my-popover-item"
                  onClick={() => toggleFinanceReportModalAction(true)}
                >
                  <Icon
                    component={IconCustom.Assessment}
                    className="my-icon-md"
                  />
                  Financial Report
                </MyButton>
                {isNotEmployee(partnerInfo) && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={_removeProject}
                  >
                    <Icon component={IconCustom.Trash} className="my-icon-md" />
                    Archive
                  </MyButton>
                )}
              </div>
            }
            trigger="focus"
          >
            <div className="text-right">
              <MyButton className="my-btn-no-style btn-edit">
                <Icon component={IconCustom.MoreHorizontal} />
                More
              </MyButton>
            </div>
          </Popover>
        </div>
        <Statistic project={project} />
        <Row className="mx-n8">
          <Col xs={24} md={8} className="px-8">
            <Information project={project} onRefreshPage={_loadPage} />
            <Documents project={project} onRefreshPage={_loadPage} />
          </Col>
          <Col xs={24} md={16} className="px-8">
            <Chart
              principal={project?.principal}
              jobs={project?.jobs || []}
              onRefreshPage={_loadPage}
              min={setHoursForDate(project?.startDate)}
              max={setHoursForDate(project?.endDate, '23:59:59')}
              projectId={project?.id}
            />
            <Job project={project} onRefreshPage={_loadPage} />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};

export default withRouter(ProjectDetail);
