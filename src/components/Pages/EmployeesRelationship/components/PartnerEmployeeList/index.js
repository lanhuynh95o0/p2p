import React, { useCallback } from 'react';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import { MyButton, MyTable } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';

const PartnerEmployeeList = (props) => {
  const _delete = useCallback(
    (employee) => () => {
      props.onDelete(employee);
    },
    []
  );

  return (
    <MyTable
      data={props.data}
      className="px-8 pt-16"
      columns={[
        { title: 'Employee', key: 'fullName' },
        { title: 'Role', key: 'role', align: 'center' },
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
          key: 'phoneNumber',
          render: (text) => (
            <a className="text-lg break-word text-link">{text}</a>
          ),
          align: 'center',
        },
        {
          title: 'Actions',
          key: 'action',
          render: (value, item) => (
            <>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={() => props.onEdit(item)}
                    >
                      <Icon component={IconCustom.Edit} />
                      Edit
                    </MyButton>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={() => props.onAddToProject(item)}
                    >
                      <Icon component={IconCustom.Mail} />
                      Add to project
                    </MyButton>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={_delete(item)}
                    >
                      <Icon component={IconCustom.Trash} />
                      Archive
                    </MyButton>
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
