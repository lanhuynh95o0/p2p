import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Popover, Row, Tag } from 'antd';
import { MyButton, MyProgress } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { updateTask } from 'states/task/actions';
import useActions from 'hooks/useActions';
import DropDownWithArrowIcon from 'components/Atoms/DropDownWithArrowIcon';
import { TASK_STATUS } from 'components/Pages/Task/constant';
import Comment from 'components/Organisms/Comment';
import { COMMENT_TYPE } from 'constants/common';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'states/auth/selectors';
import { messageSuccess } from 'utilities/message';

const ModalDetailTask = ({
  task,
  onDeleteTask = () => null,
  onEditTask = () => null,
  onRefreshPage = () => null,
  isEditable = true,
  onSelectTaskDetail,
  principle,
}) => {
  const [taskStatus, setStatus] = useState(task.status);
  const updateTaskAction = useActions(updateTask);
  const userInfo = useSelector(selectUserInfo());

  let isPrinciple = useMemo(() => {
    return userInfo?.id === principle?.id;
  }, [userInfo, principle]);

  let isContractor = useMemo(() => {
    return userInfo?.id !== principle?.id && userInfo?.id === task?.creator?.id;
  }, [userInfo, principle, task]);

  const onSelectStatus = (status) => {
    setStatus(status);
    updateTaskAction({ ...task, status }, () => {
      messageSuccess({
        key: 'onSelectStatus',
        content: 'You have updated the task',
      });
      onRefreshPage();
    });
  };

  const menu = useMemo(
    () =>
      Object.entries(TASK_STATUS).map(([key, { label }], index) => ({
        value: key,
        component: label,
      })),
    []
  );

  const allowEdit = useMemo(() => {
    return isEditable && isPrinciple;
  }, [task, userInfo, isEditable]);

  return (
    <>
      <div className="view-content">
        {(isPrinciple || isContractor) && (
          <Popover
            placement="topRight"
            content={
              <div className="my-popover-container">
                {allowEdit && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={() => onEditTask(task)}
                  >
                    <Icon component={IconCustom.Edit} className="my-icon-md" />
                    Edit
                  </MyButton>
                )}
                <MyButton
                  className="my-btn-no-style my-popover-item"
                  onClick={() => onDeleteTask(task)}
                >
                  <Icon component={IconCustom.Trash} className="my-icon-md" />
                  Archive
                </MyButton>
              </div>
            }
            trigger="focus"
          >
            <MyButton className="my-btn-no-style btn-more">
              <Icon component={IconCustom.MoreHorizontal} />
              More
            </MyButton>
          </Popover>
        )}

        <h4 className="title text-center">{task?.title || 'TEST'}</h4>

        <div className="d-flex justify-content-center">
          <DropDownWithArrowIcon menu={menu} onSelectItem={onSelectStatus}>
            <div
              className={`${TASK_STATUS[taskStatus]?.color} radius-20 px-30 py-5 fs-16`}
            >
              {TASK_STATUS[taskStatus]?.label}
            </div>
          </DropDownWithArrowIcon>
        </div>
        <MyProgress percent={10} type="text" />

        <Row gutter={20} className="mt-32">
          <Col span={12}>
            <div>
              <p className="label-bold">Assignee</p>
              <Row className="pl-16">
                <Col span={6} className="label">
                  Email
                </Col>
                <Col span={18} className="description text-right">
                  {task?.assigneeEmails.map(email => <Tag
                    key={email}
                    color="geekblue"
                    className="ml-8 my-5"
                  >
                    {email}
                  </Tag>) || ''}
                </Col>
              </Row>
              <p className="label-bold mb-16">Timeline</p>
              <Row className="pl-16">
                <Col span={6} className="label">
                  Start date
                </Col>
                <Col span={18} className="description text-right">
                  {getTimeFormatNormal(task?.startDate || new Date())}
                </Col>
              </Row>
              <Row className="pl-16">
                <Col span={6} className="label">
                  End date
                </Col>
                <Col span={18} className="description text-right">
                  {getTimeFormatNormal(task?.endDate || new Date())}
                </Col>
              </Row>
              <span className="label-bold">Description</span>
              <div>
                <span className="description">
                  {task?.description || 'hel'}
                </span>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <Comment
              disableTask
              isShowHeader={false}
              comments={task.comments}
              type={COMMENT_TYPE.TASK}
              jobId={task.id}
              entityRecordId={task.id}
              onRefreshPage={() => onSelectTaskDetail(task)}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ModalDetailTask;

ModalDetailTask.propTypes = {
  task: PropTypes.object,
};
