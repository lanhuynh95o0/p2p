import React from 'react';
import PropTypes from 'prop-types';
import { MyButton, MyTable } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import { Popover } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import AssignedJobTimeline from '../AssignedJobTimeline';
import { INVITE_STATUS } from 'constants/common';

const AssignedJobsList = (props) => {
  return (
    <MyTable
      data={props.data}
      className="pt-16"
      scroll={{ x: 870}}
      columns={[
        {
          title: 'Assigned Job',
          key: 'name',
        },
        {
          title: 'Code',
          key: 'code',
          align: 'center',
        },
        {
          title: 'Timeline',
          key: 'status',
          render: (text) => <AssignedJobTimeline status={text} />,
          align: 'center',
        },
        {
          title: 'Date',
          key: 'createdTime',
          render: (text) => getTimeFormatNormal(text),
          align: 'center',
        },
        {
          title: 'Project',
          key: 'projectName',
          align: 'center',
        },
        {
          title: 'Owner',
          key: 'owner',
          align: 'center',
        },
        {
          title: 'Actions',
          key: 'action',
          align: 'center',
          render: (text, item) => (
            <>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    {item.status === INVITE_STATUS.ACCEPTED ? (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={props.onViewDetail(item)}
                      >
                        <Icon
                          component={IconCustom.EyeOpen}
                          className="my-icon-md"
                        />
                        View Detail
                      </MyButton>
                    ) : (
                      <>
                        <MyButton
                          className="my-btn-no-style my-popover-item"
                          onClick={props.onAccept(item)}
                        >
                          <Icon
                            component={IconCustom.Checked}
                            className="my-icon-md"
                          />
                          Accept
                        </MyButton>
                        <MyButton
                          className="my-btn-no-style my-popover-item"
                          onClick={props.onReject(item)}
                        >
                          <Icon
                            component={IconCustom.Close}
                            className="my-icon-md"
                          />
                          Reject
                        </MyButton>
                      </>
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
          ),
        },
      ]}
    />
  );
};

export default AssignedJobsList;

AssignedJobsList.propTypes = {
  data: PropTypes.array,
};
