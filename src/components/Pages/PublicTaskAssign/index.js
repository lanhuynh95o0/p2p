import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAssignedTaskDetail, updateAssignedTask } from 'states/task/actions';
import { TASK_STATUS } from '../Task/constant';
import DropDownWithArrowIcon from 'components/Atoms/DropDownWithArrowIcon';
import './styles.scss';
import Comment from 'components/Organisms/Comment';
import { COMMENT_TYPE } from 'constants/common';

const PublicTaskAssign = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const [status, setStatus] = useState();
  const [taskSelected, setTaskSelected] = useState({});
  useEffect(() => {
    if (!token) {
      return;
    }
    getData();
  }, [token]);

  const getData = () => {
    dispatch(
      getAssignedTaskDetail(token, (data) => {
        setTaskSelected(data);
        setStatus(data.status);
      })
    );
  };

  const menu = useMemo(
    () =>
      Object.entries(TASK_STATUS).map(([key, { label }], index) => ({
        value: key,
        component: label,
      })),
    []
  );

  const onSelectStatus = (status) => {
    setStatus(status);
    dispatch(updateAssignedTask({ token, status }));
  };

  return (
    <div className="task-assigned-page">
      <div className="content">
        <div className="header">{taskSelected?.title}</div>

        <div className="mt-10 mb-40 d-flex justify-content-center">
          <DropDownWithArrowIcon menu={menu} onSelectItem={onSelectStatus}>
            <div
              className={`${TASK_STATUS[status]?.color} radius-20 px-30 py-5`}
            >
              {TASK_STATUS[status]?.label}
            </div>
          </DropDownWithArrowIcon>
        </div>

        <Row gutter={[40, 40]} className="mt-32">
          <Col xs={24} lg={12}>
            <div className="title">Assignee</div>
            <div className="line-item">
              <div className="label">Email</div>
              <div className="value">{taskSelected?.assigneeEmail}</div>
            </div>

            <div className="title">Timeline</div>
            <div className="line-item">
              <div className="label">Start date</div>
              <div className="value">{taskSelected?.startDate}</div>
            </div>
            <div className="line-item">
              <div className="label">End date</div>
              <div className="value">{taskSelected?.endDate}</div>
            </div>

            <div className="title">Description</div>
            <div className="value">{taskSelected?.description}</div>
          </Col>

          <Col xs={24} lg={12}>
            <Comment
              disableTask
              isShowHeader={false}
              comments={taskSelected.comments}
              type={COMMENT_TYPE.TASK}
              jobId={taskSelected.id}
              entityRecordId={taskSelected.id}
              onRefreshPage={getData}
              isPublic={true}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PublicTaskAssign;
