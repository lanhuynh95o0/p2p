import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Breadcrumb,
  MyButton,
  MyModal,
  MyPagination,
  PageNotFound,
} from 'components/Atoms';
import { SORT_BY_TIME, VIEW_MODE } from 'constants/common';
import ModalCreateProject from './components/ModalCreateProject';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from 'states/project/selectors';
import { connect, useDispatch } from 'react-redux';
import { deleteProject, getProjects } from 'states/project/actions';
import ProjectGridView from './components/ProjectGrid';
import ProjectListView from './components/ProjectList';
import ProjectHeader from './components/ProjectHeader';
import { showModalConfirm } from 'utilities/modal';
import { PROJECT_CONFIRM_REMOVE, PROJECT_SORT_BY } from './constant';
import { Card } from 'antd';
import Spin from 'components/Atoms/Spin';
import { messageAction } from 'utilities/message';
import 'assets/css/listGrid.scss';

const Projects = (props) => {
  const dispatch = useDispatch();
  const [query, _setQuery] = useState({
    sortBy: PROJECT_SORT_BY.Deadline.id,
    isDesc: true,
    skip: 0,
    take: 5,
    terms: '',
  });
  const [view, setView] = useState(VIEW_MODE.GRID);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    dispatch(getProjects(query));
  }, [query]);

  const _changeView = useCallback(
    (value) => () => {
      setView(value);
    },
    []
  );

  const _refreshPage = useCallback(() => {
    setQuery((oldQuery) => Object.assign({}, oldQuery));
  }, []);

  const _switchModalCreate = useCallback(
    (value) => (isCreateSuccessful = false) => {
      if (isCreateSuccessful === true) _refreshPage();
      setModalCreateVisible(value);
    },
    []
  );

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _deleteProject = useCallback((project) => {
    const { TITLE, MESSAGE } = PROJECT_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          deleteProject(project.id, () => {
            messageAction.removeProjectSuccess(project);
            _refreshPage();
          })
        );
      },
    });
  }, []);

  const _renderList = useMemo(() => {
    if (!props.projects?.result) {
      return (
        <Card className="my-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!props.projects?.result.length) {
      return <PageNotFound extra="Whoops! Project not found." />;
    }
    return view === VIEW_MODE.GRID ? (
      <ProjectGridView
        data={props.projects.result}
        type={query.partner}
        onDeleteProject={_deleteProject}
      />
    ) : (
      <ProjectListView
        data={props.projects.result}
        type={query.partner}
        onDeleteProject={_deleteProject}
      />
    );
  }, [view, props.projects, query.partner]);

  return (
    <div id="my-grid-list">
      <div className="pb-16 d-table w-100p">
        <Breadcrumb
          className="d-table-cell va-m"
          path={[{ name: 'Projects' }]}
        />
        <MyButton
          className="btn-primary-custom f-right"
          onClick={_switchModalCreate(true)}
        >
          New project
        </MyButton>
        <br style={{ clear: 'both' }} />
      </div>
      <ProjectHeader
        view={view}
        onChangeView={_changeView}
        query={query}
        setQuery={setQuery}
      />

      {props.projects && (
        <h3 className="mt-20">
          There are {props.projects?.total} projects
        </h3>
      )}

      {_renderList}
      {(props.projects?.total && (
        <MyPagination
          totalItem={props.projects?.total}
          currentPage={currentPage}
          pageSize={query.take}
          onChange={_onChangePagination}
        />
      )) ||
        null}

      <MyModal visible={modalCreateVisible} onClose={_switchModalCreate(false)}>
        <ModalCreateProject onClose={_switchModalCreate(false)} />
      </MyModal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects(),
});

export default connect(mapStateToProps)(Projects);
