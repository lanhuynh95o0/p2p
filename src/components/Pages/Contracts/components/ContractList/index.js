import React from 'react';
import PropTypes from 'prop-types';
import { Image, MyButton, MyTable } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import { Popover, Tag } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';

const ContractList = (props) => {
  return (
    <MyTable
      data={props.data}
      className="pt-16"
      scroll={{ x: 1000}}
      columns={[
        {
          title: 'Contract',
          key: 'name',
        },
        {
          title: 'Partner',
          key: 'partnerName',
          render: (text, item) => (
            <div className="grid-item">
              <div className="header">
                <Image src={item.logo} className="avatar-circle mb-0" />
                <div className="info">
                  <p className="text-md m-0">
                    <Tag className="tag-partner-type" color={'processing'}>{item.isOwner ? 'Vendor' : 'Customer'}</Tag>
                    {item.partnerName}
                  </p>
                  <p className={`text-extra m-0 ${CONTRACT_STATUS_CLASS[item.status].class}`}>
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: 'Code',
          key: 'code',
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
          title: 'Job',
          key: 'jobName',
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

export default ContractList;

ContractList.propTypes = {
  data: PropTypes.array,
};
