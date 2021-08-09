import React from 'react';
import { Popover } from 'antd';
import { MyTable, MyButton } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { get } from 'lodash';
import Image from 'components/Atoms/Image';

const CONTACT_STEP = 3;

const ClientRelationshipList = ({
  addClientToProject,
  clientData,
  searchClient,
  onPagingChange,
  onDeleteClient,
  onEdit,
}) => {
  return (
    <MyTable
      data={get(clientData, 'result') || []}
      pageSize={searchClient.take}
      currentPage={searchClient.current}
      totalItem={get(clientData, 'total')}
      className="mt-20 table-client-page"
      scroll={{ x: 1235}}
      onChange={(data) => {
        onPagingChange({
          ...searchClient,
          ...data,
        });
      }}
      columns={[
        { title: 'Code', key: 'id', align: 'center' },
        {
          title: 'Partner',
          key: 'name',
          render: (text, col) => (
            <div className="d-flex">
              <Image className="avatar" src={col.logoUrl} alt={col.name} />
              <span className="break-word">{col.name}</span>
            </div>
          ),
        },
        {
          title: 'Legal Name',
          key: 'legalCompanyName',
          align: 'center',
        },
        {
          title: 'ABN',
          key: 'abn',
          align: 'center',
        },
        {
          title: 'Email',
          key: 'email',
          className: 'col-body-email',
          render: (text) => <span className="text-link">{text}</span>,
          align: 'center',
        },
        {
          title: 'Phone number',
          key: 'phoneNumber',
          className: 'col-body-phone',
          render: (text) => <span className="text-link">{text}</span>,
          align: 'center',
        },
        {
          title: 'Address',
          key: 'address',
          align: 'center',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, col) => (
            <>
              <Popover
                placement="bottomRight"
                content={
                  <>
                    <div className="my-popover-container">
                      <MyButton
                        onClick={onEdit(col, { visible: true })}
                        className="my-btn-no-style my-popover-item"
                      >
                        <Icon component={IconCustom.Edit} />
                        Edit
                      </MyButton>
                      <MyButton
                        onClick={onEdit(col, { visible: true, step: CONTACT_STEP })}
                        className="my-btn-no-style my-popover-item"
                      >
                        <Icon component={IconCustom.ViewList} />
                        View contacts
                      </MyButton>
                      <MyButton
                        onClick={addClientToProject(true, col)}
                        className="my-btn-no-style my-popover-item"
                      >
                        <Icon component={IconCustom.Mail} />
                        Add to project
                      </MyButton>
                      <MyButton
                        onClick={() => onDeleteClient(col.id)}
                        className="my-btn-no-style my-popover-item"
                      >
                        <Icon component={IconCustom.Trash} />
                        Remove
                      </MyButton>
                    </div>
                  </>
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

export default ClientRelationshipList;
