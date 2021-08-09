import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, MyPagination, PageNotFound } from 'components/Atoms';
import AssignedJobsGrid from './components/AssignedJobsGrid';
import AssignedJobsList from './components/AssignedJobsList';
import ContractHeader from './components/AssignedJobHeader';
import { SORT_BY_JOB_ASSIGN, SORT_BY_TIME, VIEW_MODE } from 'constants/common';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card } from 'antd';
import Spin from 'components/Atoms/Spin';
import 'assets/css/listGrid.scss';
import {
  deleteJobInvitation,
  getAssignedJob,
  updateJobInvitation,
} from 'states/job/actions';
import { selectAssignedJobs } from 'states/job/selectors';
import { useHistory, withRouter } from 'react-router-dom';
import { showModalConfirm } from 'utilities/modal';
import { messageAction } from 'utilities/message';
import { JOB_ASSIGNED_DETAIL } from 'routers/route-path';

const AssignedJobs = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, _setQuery] = useState({
    assignedBy:
      new URLSearchParams(props.location.search).get('assignedBy') ||
      SORT_BY_JOB_ASSIGN[0].id,
    sortBy: SORT_BY_TIME[0].id,
    skip: 0,
    take: 5,
    terms: '',
  });
  const [view, setView] = useState(VIEW_MODE.GRID);
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
    dispatch(getAssignedJob(query));
  }, [query]);

  const _refreshPage = useCallback(() => {
    setQuery((value) => ({ ...value }));
  }, []);

  const _changeView = useCallback((value) => () => setView(value), []);

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _viewDetail = useCallback(
    (item) => () => {
      history.push(JOB_ASSIGNED_DETAIL.replace(':id', item.id));
    },
    []
  );

  const _accept = useCallback(
    (item) => () => {
      showModalConfirm({
        title: 'Notice',
        content: 'Are you sure you want to accept this job?',
        cancelText: 'Cancel',
        okText: 'Accept',
        onOk: () => {
          dispatch(
            updateJobInvitation(item.invitationCode, () => {
              messageAction.acceptJob(item);
              _refreshPage();
            })
          );
        },
      });
    },
    []
  );

  const _reject = useCallback(
    (item) => () => {
      showModalConfirm({
        title: 'Notice',
        content:
          "Are you sure to reject this job? You can't view it after rejecting it unless owner re-invite you.",
        cancelText: 'Cancel',
        okText: 'Reject',
        onOk: () =>
          dispatch(
            deleteJobInvitation(item.invitationCode, () => {
              messageAction.rejectJob(item);
              _refreshPage();
            })
          ),
      });
    },
    []
  );

  const _renderList = useMemo(() => {
    if (!props.assignedJobs.list) {
      return (
        <Card className="my-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!props.assignedJobs.list.length) {
      return <PageNotFound extra={<p>
        There are no assigned jobs to display.
        <br />
        Jobs will be displayed once a contractor accepts an invitation to work
      </p>} />;
    }
    return view === VIEW_MODE.GRID ? (
      <AssignedJobsGrid
        data={props.assignedJobs.list}
        onAccept={_accept}
        onReject={_reject}
        onViewDetail={_viewDetail}
      />
    ) : (
      <AssignedJobsList
        data={props.assignedJobs.list || []}
        total={props.assignedJobs?.total || 0}
        onAccept={_accept}
        onReject={_reject}
        onViewDetail={_viewDetail}
      />
    );
  }, [view, props.assignedJobs]);

  return (
    <div id="my-grid-list">
      <div className="breadcrumb">
        <Breadcrumb path={[{ name: 'Assigned Jobs' }]} />
      </div>
      <ContractHeader
        view={view}
        onChangeView={_changeView}
        query={query}
        setQuery={setQuery}
      />
      {_renderList}
      {(props.assignedJobs?.total && (
        <div className="px-8">
          <MyPagination
            totalItem={props.assignedJobs?.total}
            currentPage={currentPage}
            pageSize={query.take}
            onChange={_onChangePagination}
          />
        </div>
      )) ||
        null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  assignedJobs: selectAssignedJobs(),
});

export default withRouter(connect(mapStateToProps)(AssignedJobs));
