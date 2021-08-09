import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { CLIENTS_RELATIONSHIP } from 'routers/route-path';
import ListDashboard from 'components/Pages/Home/components/ListDashboard';
import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME } from 'states/dashboard/constants';
import { MyModal, SuccessfulScreen } from 'components/Atoms';
import { ClientToProject } from 'components/Pages/ClientsRelationship/components';
import { selectOwnProjectData } from 'states/project/selectors';
import useActions from 'hooks/useActions';
import { getOwnProject, inviteClientToProject } from 'states/project/actions';
import { PROJECT_OWN_FILTER_TYPE } from 'constants/project';
import * as routePath from 'routers/route-path';
import { useHistory } from 'react-router-dom';

const ClientsSection = ({ isShowAds }) => {
  const history = useHistory();
  const clients = useSelector(commonSelector(STATE_NAME, 'clients'));
  const [clientSelected, setClientSelected] = useState(null);
  const ownProjectData = useSelector(selectOwnProjectData());
  const [getOwnProjectAction, inviteClientToProjectAction] = useActions([
    getOwnProject,
    inviteClientToProject,
  ]);
  const [projectId, setProjectId] = useState(null);

  const _switchModalClientToProject = useCallback(
    (value) => () => {
      setClientSelected(value);
    },
    []
  );

  useEffect(() => {
    getOwnProjectAction(PROJECT_OWN_FILTER_TYPE.CLIENT);
  }, []);

  const [isSuccess, setIsSuccess] = useState(false);

  const onCloseModal = () => {
    setIsSuccess(false);
    setClientSelected(null);
  };

  const onInviteClientToProject = (projectId) => {
    inviteClientToProjectAction(
      { projectId, clientId: clientSelected.id },
      () => {
        setProjectId(projectId);
        setIsSuccess(true);
      }
    );
  };

  const goToProjects = useCallback(() => {
    history.push(routePath.PROJECT_DETAIL.replace(':id', projectId));
  }, [projectId]);

  const getProjectName = useCallback(
    () => ownProjectData.find((x) => x.id === projectId)?.name || '',
    [projectId]
  );

  return (
    <Col lg={isShowAds ? 24 : 12} xs={24}>
      <Row justify="space-between">
        <h3 className="dash-board-title mb-16">My Clients</h3>

        <Link to={CLIENTS_RELATIONSHIP}>
          <Button type="link" className="view-all-btn">
            View all
          </Button>
        </Link>
      </Row>

      <ListDashboard dataSource={clients} onAddClient={setClientSelected} />

      <MyModal
        visible={clientSelected}
        onClose={_switchModalClientToProject(null)}
      >
        {isSuccess ? (
          <SuccessfulScreen
            description={`You have sent invitation to join jobs to ${getProjectName()}. Please wait for their response. You can check the status in project detail`}
            buttonSecondaryText="Back"
            onClickButtonSecondary={onCloseModal}
            buttonPrimaryText="Go to project"
            onClickButtonPrimary={goToProjects}
          />
        ) : (
          <ClientToProject
            listOwnProjects={ownProjectData}
            inviteClient={onInviteClientToProject}
          />
        )}
      </MyModal>
    </Col>
  );
};

ClientsSection.propTypes = {
  isShowAds: PropTypes.bool,
};

export default memo(ClientsSection);
