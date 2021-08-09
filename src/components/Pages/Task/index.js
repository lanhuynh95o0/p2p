import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MyButton, MyModal, NoData } from 'components/Atoms';
import TaskListView from './components/TaskList';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showModalConfirm } from 'utilities/modal';
import { getTask, removeTask } from 'states/task/actions';
import ModalUpsertTask from './components/ModalUpsertTask';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import ModalDetailTask from './components/ModalDetailTask';
import { TASK_CONFIRM_REMOVE } from 'components/Pages/Task/constant';
import useActions from 'hooks/useActions';
import { PAGE_TYPE } from 'constants/common';
import { useLocation } from 'react-router-dom';
import 'assets/css/listGrid.scss';
import { messageSuccess } from 'utilities/message';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Task = ({
  tasks,
  onRefreshPage,
  entityRecordId,
  type,
  jobId = null,
  pageType = PAGE_TYPE.OWN,
  principle,
}) => {
  const dispatch = useDispatch();
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [taskSelected, setTaskSelected] = useState(null);
  const getTaskAction = useActions(getTask);
  const query = useQuery();

  useEffect(() => {
    const taskId = query.get('taskId');
    if (!taskId) {
      return;
    }
    getTaskAction(taskId, setTaskSelected);
  }, [query.get('taskId')]);

  const option = useMemo(() => {
    if (pageType === PAGE_TYPE.SHARED) {
      return {
        isEditable: false,
      };
    }
    return {
      isEditable: true,
    };
  }, [pageType]);

  const _switchModalCreate = useCallback(
    (value) => () => setModalCreateVisible(value),
    []
  );

  const _closeModalDetail = useCallback(() => setTaskSelected(null), []);

  const _removeTask = useCallback((item) => {
    const { MESSAGE, TITLE } = TASK_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () =>
        dispatch(
          removeTask(item.id, () => {
            messageSuccess({ content: 'You have removed task successfully' });
            onRefreshPage();
            _closeModalDetail();
          })
        ),
    });
  }, []);

  useEffect(() => {
    if (!modalCreateVisible) setTaskSelected(null);
  }, [modalCreateVisible]);

  const onSelectTaskDetail = (task) => {
    getTaskAction(task.id, setTaskSelected);
  };

  return (
    <div id="detail-page">
      <div className="info-header mb-4">
        <h4 className="title">Tasks</h4>
        {option.isEditable && (
          <MyButton
            className="btn-primary-custom h-40"
            onClick={_switchModalCreate(true)}
          >
            New task
          </MyButton>
        )}
      </div>
      {(tasks?.length && (
        <TaskListView
          data={tasks}
          onRemove={_removeTask}
          pageType={pageType}
          onEdit={onSelectTaskDetail}
          principle={principle}
        />
      )) || <NoData description={COMMON_NODATA_TEXT.TASK} />}
      <MyModal
        visible={modalCreateVisible}
        onClose={_switchModalCreate(false)}
        zIndex={1000}
      >
        <ModalUpsertTask
          onClose={_switchModalCreate(false)}
          entityRecordId={entityRecordId}
          successButtonText="Back"
          jobId={jobId}
          task={taskSelected}
          type={type}
          onSubmit={onRefreshPage}
        />
      </MyModal>
      <MyModal visible={!!taskSelected} onClose={_closeModalDetail}>
        <ModalDetailTask
          onSelectTaskDetail={onSelectTaskDetail}
          onClose={_closeModalDetail}
          task={taskSelected}
          onDeleteTask={_removeTask}
          onRefreshPage={onRefreshPage}
          isEditable={true}
          onEditTask={_switchModalCreate(true)}
          principle={principle}
        />
      </MyModal>
    </div>
  );
};

export default Task;

Task.propTypes = {
  tasks: PropTypes.array,
  entityRecordId: PropTypes.number,
  onRefreshPage: PropTypes.func,
};
