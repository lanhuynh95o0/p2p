import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import {
  Breadcrumb,
  MyButton,
  MyModal,
  PageNotFound,
  SuccessfulScreen,
} from 'components/Atoms';
import {
  ClientRelationshipForm,
  ClientRelationshipGrid,
  ClientRelationshipList,
  ClientToProject,
  SearchClient,
} from './components';
import {
  createClient,
  deleteClient,
  getClientDetail,
  getClients,
  updateClient,
} from 'states/client/actions';
import { createStructuredSelector } from 'reselect';
import { selectClientData, selectClientDetail } from 'states/client/selectors';
import { cloneDeep } from 'lodash';
import { showModalConfirm } from 'utilities/modal';
import 'assets/css/listGrid.scss';
import Spin from 'components/Atoms/Spin';
import { getOwnProject, inviteClientToProject } from 'states/project/actions';
import { selectOwnProjectData } from 'states/project/selectors';
import * as routePath from 'routers/route-path';
import { APP_INFO, SORT_BY_TIME, VIEW_MODE } from 'constants/common';
import { PROJECT_OWN_FILTER_TYPE } from 'constants/project';
import { messageSuccess } from 'utilities/message';

const ClientRelationship = ({ clientData, clientDetail, ownProjectData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [view, setView] = useState(VIEW_MODE.GRID);
  const [searchClient, _setSearchClient] = useState(
    cloneDeep({
      current: 1,
      sortBy: SORT_BY_TIME[0].id,
      skip: 0,
      take: 5,
      terms: '',
    })
  );
  const onPagingChange = _setSearchClient;
  const setSearchClient = (value) => {
    if (typeof value === 'function') {
      const valueFunc = (oldValue) => {
        oldValue = value(oldValue);
        oldValue.skip = 0;
        oldValue.current = 1;
        return oldValue;
      };
      return _setSearchClient(valueFunc);
    } else {
      value.skip = 0;
      value.current = 1;
    }
    _setSearchClient(value);
  };
  const [modalClientToProject, setModalClientToProject] = useState({
    visible: false,
    data: {},
  });
  const [modalClientForm, setModalClientForm] = useState({ visible: false, step: 1 });
  const [isSuccess, setIsSuccess] = useState(false);
  const [projectId, setProjectId] = useState(undefined);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (clientDetail) {
      setTimeout(() => {
        _setSelectedClientAndOpenModal(clientDetail, { visible: true })();
        dispatch(getClientDetail({ id: null }));
      }, 100);
    }
  }, [clientDetail]);

  useEffect(() => {
    dispatch(getClients(searchClient));
  }, [searchClient]);

  useEffect(() => {
    dispatch(getOwnProject(null));
  }, []);

  const _switchModalClientToProject = useCallback(
    (value, item = null) => () => {
      setModalClientToProject({ visible: value, data: item });
    },
    []
  );

  const _switchModalClientForm = useCallback(
    (value) => () => {
      setModalClientForm(value);
    },
    []
  );

  const _setSelectedClientAndOpenModal = useCallback(
    (client = null, modalOptions = { visible: false, step: 1 }) => () => {
      setSelectedClient(
        client
          ? {
            ...client,
            phoneData: {
              code: client.phoneCode,
              number: client.phoneNumber,
            },
          }
          : null
      );
      _switchModalClientForm(modalOptions)();
    },
    []
  );

  const onSwitchView = (typeView) => () => {
    setView(typeView);
  };

  const onDeleteClient = (id) => {
    showModalConfirm({
      title: 'Archive client',
      content: `Are you sure to remove this client? This may affect to all ${APP_INFO.NAME} contractor.`,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () =>
        dispatch(
          deleteClient(id, () => {
            setSearchClient({ ...searchClient, Skip: 0, Current: 1 });
          })
        ),
    });
  };

  const _renderList = useMemo(() => {
    if (!clientData?.result) {
      return (
        <Card className="my-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!clientData.result.length) {
      return <PageNotFound extra="Whoops! Client not found." />;
    }
    return view === VIEW_MODE.GRID ? (
      <ClientRelationshipGrid
        onDeleteClient={onDeleteClient}
        searchClient={searchClient}
        onPagingChange={onPagingChange}
        clientData={clientData}
        addClientToProject={_switchModalClientToProject}
        onEdit={_setSelectedClientAndOpenModal}
      />
    ) : (
      <ClientRelationshipList
        onDeleteClient={onDeleteClient}
        searchClient={searchClient}
        onPagingChange={onPagingChange}
        clientData={clientData}
        addClientToProject={_switchModalClientToProject}
        onEdit={_setSelectedClientAndOpenModal}
      />
    );
  }, [view, clientData]);

  const onSearchClient = (field, value) => {
    setSearchClient({
      ...searchClient,
      [field]: value,
    });
  };

  const onCreateClient = (payload) => {
    dispatch(
      createClient(payload, () => {
        messageSuccess({ content: 'You have created new client' });
        setSearchClient({ ...searchClient });
      })
    );
    _switchModalClientForm({ visible: false })();
  };

  const onEditClient = (payload) => {
    dispatch(
      updateClient(payload, () => {
        messageSuccess({ content: 'You have updated the client information' });
        setSearchClient({ ...searchClient });
      })
    );
    _switchModalClientForm({ visible: false })();
  };

  const onInviteClientToProject = (projectId) => {
    dispatch(
      inviteClientToProject(
        { projectId, clientId: modalClientToProject.data?.id },
        () => {
          setIsSuccess(true);
          setProjectId(projectId);
        }
      )
    );
  };

  const goToProjects = () => {
    history.push(routePath.PROJECT_DETAIL.replace(':id', projectId));
  };

  const onCloseModal = () => {
    setModalClientToProject({ visible: false });
    setIsSuccess(false);
  };

  const getProjectName = () => {
    return ownProjectData.find((x) => x.id === projectId)?.name || '';
  };

  if (clientData && clientData.result) {
    const urlParams = new URLSearchParams(window.location.search);
    const viewClientId = parseInt(urlParams.get('client'));
    if (viewClientId) {
      urlParams.delete('client');
      let queryStr = urlParams.toString();
      queryStr = queryStr ? ('?' + queryStr) : '';
      const url = new URL(`${window.location.origin}${window.location.pathname}${queryStr}`);
      window.history.pushState({}, document.title, url.toString());
      dispatch(getClientDetail({ id: viewClientId }));
    }
  }

  return (
    <div id="my-grid-list">
      <div className="pb-16 d-table w-100p">
        <Breadcrumb
          className="d-table-cell va-m"
          path={[{ name: 'Clients' }]}
        />
        <MyButton
          className="btn-primary-custom f-right"
          onClick={_switchModalClientForm({ visible: true })}
        >
          New client
        </MyButton>
      </div>

      <SearchClient
        view={view}
        onSwitchView={onSwitchView}
        searchClient={searchClient}
        onSearchClient={onSearchClient}
      />

      {_renderList}
      <MyModal
        visible={modalClientForm.visible}
        onClose={_setSelectedClientAndOpenModal()}
      >
        <ClientRelationshipForm
          onSave={onCreateClient}
          onEdit={onEditClient}
          step={modalClientForm.step}
          initClient={selectedClient}
          isEdit={!!selectedClient}
          visible={modalClientForm.visible}
        />
      </MyModal>

      <MyModal visible={modalClientToProject.visible} onClose={onCloseModal}>
        {isSuccess ? (
          <SuccessfulScreen
            description={`You have sent invitation to join jobs to ${getProjectName()}. Please wait for their response. You can check the status in project detail.`}
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clientData: selectClientData(),
  clientDetail: selectClientDetail(),
  ownProjectData: selectOwnProjectData(),
});

export default connect(mapStateToProps, null)(ClientRelationship);
