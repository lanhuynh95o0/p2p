import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/css/detailPage.scss';
import { MyButton, MyModal, MyPagination, NoData } from 'components/Atoms';
import JobHeader from './components/JobHeader';
import ModalCreateJob from './components/ModalCreateJob';
import JobListView from './components/JobList';
import { useDispatch } from 'react-redux';
import { removeJob } from 'states/job/actions';
import PropTypes from 'prop-types';
import { showModalConfirm } from 'utilities/modal';
import { JOB_CONFIRM_REMOVE } from './constant';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { messageAction } from 'utilities/message';

const Job = (props) => {
  const dispatch = useDispatch();
  const allJob = useMemo(() => props.project?.jobs || [], [props.project]);
  const [total, setTotal] = useState(props.project?.jobs?.length || 0);
  const [jobs, setJobs] = useState([]);
  const [query, _setQuery] = useState({
    terms: '',
    skip: 0,
    take: 5,
  });
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
    if (!jobs.length && currentPage > 1) {
      setCurrentPage((prev) => --prev);
      setQuery((oldQuery) => ({
        ...oldQuery,
        skip: (currentPage - 2) * oldQuery.take,
      }));
    }
  }, [jobs]);

  useEffect(() => {
    const { terms, skip, take } = query;
    const result = allJob.filter(
      (_) =>
        (_.name?.toLowerCase() || '').includes(terms?.toLowerCase()) ||
        (_.code || '').includes(terms) ||
        (_.participantPartnerName?.toLowerCase() || '').includes(
          terms?.toLowerCase()
        )
    );
    setTotal(result.length);
    setJobs(result.slice(skip, skip + take));
  }, [query, allJob]);

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _removeJob = useCallback((item) => {
    const { MESSAGE, TITLE } = JOB_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          removeJob(item.id, () => {
            messageAction.removeJobSuccess(item);
            props.onRefreshPage();
          })
        );
      },
    });
  }, []);

  const _switchModalCreate = useCallback(
    (value) => () => setModalCreateVisible(value),
    []
  );

  return (
    <div id="detail-page" className="mt-20 mt-sm-0">
      <div className="info-header">
        <h4 className="title">Jobs</h4>
        {props.isEditable && (
          <MyButton
            className="btn-primary-custom"
            onClick={_switchModalCreate(true)}
          >
            New job
          </MyButton>
        )}
      </div>
      <JobHeader query={query} setQuery={setQuery} />
      {(jobs?.length && (
        <JobListView
          total={total}
          data={jobs}
          onRemove={_removeJob}
          isEditable={props.isEditable}
        />
      )) || <NoData description={COMMON_NODATA_TEXT.JOB} />}
      {(total && (
        <MyPagination
          totalItem={total}
          currentPage={currentPage}
          pageSize={query.take}
          onChange={_onChangePagination}
        />
      )) ||
        null}
      <MyModal visible={modalCreateVisible} onClose={_switchModalCreate(false)}>
        <ModalCreateJob
          onClose={_switchModalCreate(false)}
          projectId={props.project.id}
          currency={props.project?.currency}
          onSubmit={props.onRefreshPage}
          minDate={props.project?.startDate}
          maxDate={props.project?.endDate}
        />
      </MyModal>
    </div>
  );
};

export default Job;

Job.propTypes = {
  project: PropTypes.object,
  onRefreshPage: PropTypes.func,
  isEditable: PropTypes.bool,
};

Job.defaultProps = {
  isEditable: true,
};
