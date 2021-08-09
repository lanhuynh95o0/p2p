import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import './styles.scss';
import {
  Breadcrumb,
  MyButton,
  MyPagination,
  PageNotFound,
  MyModal,
  SuccessfulScreen,
} from 'components/Atoms';
import ModalCreateEmployee from './components/ModalCreateEmployee';
import PartnerEmployeeGrid from './components/PartnerEmployeeGrid';
import PartnerEmployeeList from './components/PartnerEmployeeList';
import PartnerEmployeeHeader from './components/PartnerEmployeeHeader';
import ModalEditEmployee from './components/ModalEditEmployee';
import {
  APP_INFO,
  SORT_BY_ROLE,
  SORT_BY_TIME,
  VIEW_MODE,
} from 'constants/common';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPartnerEmployees } from 'states/employee/selectors';
import {
  deleteEmployee,
  getEmployees,
  addEmployeeToProject,
} from 'states/employee/actions';
import { showModalConfirm } from 'utilities/modal';
import { Card } from 'antd';
import Spin from 'components/Atoms/Spin';
import { ClientToProject } from 'components/Pages/ClientsRelationship/components';
import { PROJECT_OWN_FILTER_TYPE } from 'constants/project';
import { getOwnProject, getEmployeeProject } from 'states/project/actions';
import { selectEmployeeProjectData } from 'states/project/selectors';
import { useHistory } from 'react-router-dom';
import { PROJECT_DETAIL } from 'routers/route-path';
import { selectPartnerInfo } from 'states/partner/selectors';

const EmployeeList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ownProjectData = useSelector(selectEmployeeProjectData());
  const [query, _setQuery] = useState({
    role: SORT_BY_ROLE[0].id,
    sortBy: SORT_BY_TIME[0].id,
    skip: 0,
    take: 5,
    terms: '',
  });
  const [view, setView] = useState(VIEW_MODE.GRID);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const setQuery = (value) => {
    if (typeof value === 'function') {
      const valueFunc = (oldValue) => {
        oldValue = value(oldValue);
        oldValue.skip = 0;
        return oldValue;
      };
      setCurrentPage(1);
      return _setQuery(valueFunc);
    } else {
      value.skip = 0;
    }
    _setQuery(value);
  };

  const [showModalAddProject, setShowModalAddProject] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const info = useSelector(selectPartnerInfo());

  const employeeSelected = useRef(null);
  const projectId = useRef(null);

  const fetchEmployees = useCallback(() => {
    dispatch(getEmployees(query));
  }, [query]);

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  useEffect(() => {
    if (showModalAddProject) {
      setTimeout(() => {
        dispatch(getEmployeeProject(employeeSelected.current.id));
      }, 500);
    }
  }, [showModalAddProject]);

  useEffect(() => {
    if (modalCreateVisible) {
      setTimeout(() => {
        dispatch(getOwnProject(''));
      }, 500);
    }
  }, [modalCreateVisible]);

  const _refreshPage = useCallback(
    () => setQuery((oldQuery) => Object.assign({}, oldQuery)),
    []
  );

  const _changeView = useCallback((value) => () => setView(value), []);

  const _switchModalCreate = useCallback(
    (value) => () => setModalCreateVisible(value),
    []
  );

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _delete = useCallback((employee) => {
    showModalConfirm({
      title: 'Archive employee',
      content: `Are you sure to archive this employee? This may affect to all ${APP_INFO.NAME} contractor.`,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => dispatch(deleteEmployee(employee.id, _refreshPage)),
    });
  }, []);

  const toggleModalAddProject = (employee) => {
    employeeSelected.current = employee;
    setShowModalAddProject((prevState) => !prevState);
    setIsSuccess(false);
  };

  const toggleModalEditEmployee = (employee) => {
    employeeSelected.current = employee;
    setModalEditVisible((prevState) => !prevState);
  };

  const _renderList = useMemo(() => {
    if (!props.employees.list) {
      return (
        <Card className="m-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!props.employees.list.length) {
      return <PageNotFound extra="Whoops! Employee not found." />;
    }
    return view === VIEW_MODE.GRID ? (
      <PartnerEmployeeGrid
        data={props.employees.list}
        onDelete={_delete}
        onAddToProject={(item) => toggleModalAddProject(item)}
        onEdit={toggleModalEditEmployee}
      />
    ) : (
      <PartnerEmployeeList
        data={props.employees.list || []}
        total={props.employees?.total || 0}
        onDelete={_delete}
        onAddToProject={(item) => toggleModalAddProject(item)}
        onEdit={toggleModalEditEmployee}
      />
    );
  }, [view, props.employees]);

  const inviteEmployee = (id) => {
    projectId.current = id;
    dispatch(
      addEmployeeToProject(
        {
          userId: employeeSelected.current.id,
          projectId: id,
        },
        () => {
          setIsSuccess(true);
        }
      )
    );
  };

  const onCloseModalSuccess = () => {
    toggleModalAddProject();
    setIsSuccess(false);
  };

  const goToProjects = () => {
    history.push(PROJECT_DETAIL.replace(':id', projectId.current));
  };

  const getProjectName = () => {
    return ownProjectData.find((x) => x.id === projectId.current)?.name || '';
  };

  const renderHeader = useMemo(() => {
    return (
      <div className="px-8 pb-16 d-table w-100p">
        <Breadcrumb
          className="d-table-cell va-m"
          path={[{ name: 'Employees' }]}
        />
        <MyButton
          className="btn-primary-custom f-right"
          onClick={_switchModalCreate(true)}
        >
          Invite employee
        </MyButton>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }, []);

  const renderPartnerEmployeeHeader = useMemo(() => {
    return (
      <PartnerEmployeeHeader
        view={view}
        onChangeView={_changeView}
        query={query}
        setQuery={setQuery}
        info={info}
      />
    );
  }, [view, query, info]);

  const renderModalAddProject = useMemo(() => {
    return (
      <MyModal visible={showModalAddProject} onClose={toggleModalAddProject}>
        {isSuccess ? (
          <SuccessfulScreen
            description={`You have sent invitation to join project to ${getProjectName()}. Please wait for their response. You can check the status in project detail.`}
            buttonSecondaryText="Back"
            onClickButtonSecondary={onCloseModalSuccess}
            buttonPrimaryText="Go to project"
            onClickButtonPrimary={goToProjects}
          />
        ) : (
          <ClientToProject
            listOwnProjects={ownProjectData}
            subTitle="Select the project that you’ve created to share to employee"
            inviteClient={inviteEmployee}
          />
        )}
      </MyModal>
    );
  }, [showModalAddProject, isSuccess, ownProjectData]);

  const renderModalCreateEmployee = useMemo(() => {
    return (
      <ModalCreateEmployee
        visible={modalCreateVisible}
        onClose={_switchModalCreate(false)}
      />
    );
  }, [modalCreateVisible]);

  const renderModalEditEmployee = useMemo(() => {
    return (
      <ModalEditEmployee
        visible={modalEditVisible}
        onClose={toggleModalEditEmployee}
        employee={employeeSelected.current}
        fetchEmployees={fetchEmployees}
      />
    );
  }, [modalEditVisible, query]);

  return (
    <div className="partners-employee-list mx-n8">
      {renderHeader}
      {renderPartnerEmployeeHeader}
      {_renderList}
      {(props.employees?.total && (
        <div className="px-8">
          <MyPagination
            totalItem={props.employees?.total}
            currentPage={currentPage}
            pageSize={query.take}
            onChange={_onChangePagination}
          />
        </div>
      )) ||
        null}
      {renderModalAddProject}
      {renderModalCreateEmployee}
      {renderModalEditEmployee}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  employees: selectPartnerEmployees(),
});

export default connect(mapStateToProps)(EmployeeList);
