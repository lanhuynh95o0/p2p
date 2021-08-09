import React, { useCallback } from 'react';
import { Popover, Tag } from 'antd';
import PropTypes from 'prop-types';
import { MyButton, MyTable } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';

const statusColor = {
  New: 'warning',
  Inprogress: 'processing',
  Done: 'success',
};

const PartnerEmployeeList = (props) => {
  return (
    <MyTable
      data={props.data}
      className="px-8 pt-16"
      scroll={{ x: 1045}}
      columns={[
        { title: 'Name', key: 'name' },
        {
          title: 'Email',
          key: 'email',
          render: (text) => (
            <a className="text-lg break-word text-link">{text}</a>
          ),
          align: 'center',
        },
        {
          title: 'Phone number',
          key: 'phone',
          render: (text) => (
            <a className="text-lg break-word text-link">{text}</a>
          ),
          align: 'center',
        },
        { title: 'Inquiry', key: 'inquiry' },
        {
          title: 'Status',
          key: 'status',

          render: (text) => <Tag color={statusColor[text]}>{text}</Tag>,
        },
        {
          title: 'Actions',
          key: 'status',
          render: (value, item) => {
            const listStattus = 'New Inprogress Done '
              .replace(`${value} `, '')
              .trim()
              .split(' ');

            return (
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    {!item.clientEmail && (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={props.clickAddClient(item)}
                      >
                        <Icon component={IconCustom.UserAdd} />
                        Create Client
                      </MyButton>
                    )}

                    {listStattus.map((s) => (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={props.changeStatus({
                          id: item.id,
                          data: {
                            status: s,
                          },
                        })}
                      >
                        <Icon component={IconCustom.ChervonRight} />
                        {s}
                      </MyButton>
                    ))}
                  </div>
                }
                trigger="focus"
              >
                <MyButton className="my-btn-no-style btn-icon text-dark-gray">
                  <Icon component={IconCustom.MoreHorizontal} />
                </MyButton>
              </Popover>
            );
          },
          align: 'center',
        },
      ]}
    />
  );
};

export default PartnerEmployeeList;

PartnerEmployeeList.propTypes = {
  data: PropTypes.array,
};
