import React, { useCallback, useMemo } from 'react';
import { Popover } from 'antd';
import { MyButton, MyProgress, MyTable, TimeLeft } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { getTimeFormatNormal } from 'utilities/time';
import { PAGE_TYPE } from 'constants/common';
import { TASK_STATUS } from '../../constant';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'states/auth/selectors';

const TaskListView = ({ data, onRemove, onEdit, pageType, principle }) => {
  const userInfo = useSelector(selectUserInfo());

  let isPrinciple = useMemo(() => {
    return userInfo?.id === principle?.id;
  }, [userInfo, principle]);

  const allowArchive = useCallback(
    (creator) => {
      let isContractor =
        userInfo?.id !== principle?.id && userInfo?.id === creator?.id;
      return pageType !== PAGE_TYPE.SHARED && (isPrinciple || isContractor);
    },
    [pageType, userInfo]
  );

  const _edit = useCallback((item) => () => onEdit(item), []);

  const _delete = useCallback((item) => () => onRemove(item), []);

  const columns = useMemo(() => {
    let c = [
      {
        title: 'Task',
        key: 'title',
        render: (value, item) => (
          <>
            <div>
              {value} <MyProgress percent={0} type="text" />
            </div>
            {item.status && (
              <span className={`${TASK_STATUS[item.status]?.color}`}>
                {item.statusName}
              </span>
            )}
          </>
        ),
      },
      {
        title: 'Start date',
        key: 'startDate',
        render: (value) => getTimeFormatNormal(value),
      },
      {
        title: 'End date',
        key: 'endDate',
        align: 'center',
        render: (value) => getTimeFormatNormal(value),
      },
      {
        title: 'Timeline',
        key: 'progress',
        render: (value, item) => <TimeLeft time={item.endDate} isComplete={item.status === TASK_STATUS.Completed.value} />,
        align: 'center',
      },
      {
        title: 'Actions',
        key: 'action',
        align: 'center',
        render: (value, item) => {
          return (
            <>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={_edit(item)}
                    >
                      <Icon
                        component={IconCustom.EyeOpen}
                        className="my-icon-md"
                      />
                      Detail
                    </MyButton>
                    {allowArchive(item.creator) && (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_delete(item)}
                      >
                        <Icon
                          component={IconCustom.Trash}
                          className="my-icon-md"
                        />
                        Archive
                      </MyButton>
                    )}
                  </div>
                }
                trigger="focus"
              >
                <MyButton className="my-btn-no-style btn-icon text-dark-gray">
                  <Icon component={IconCustom.MoreHorizontal} />
                </MyButton>
              </Popover>
            </>
          );
        },
      },
    ];

    if (pageType == PAGE_TYPE.SHARED) {
      c.pop();
      return c;
    }

    return c;
  }, [data, pageType, allowArchive]);

  return <MyTable data={data} columns={columns} />;
};

export default TaskListView;
