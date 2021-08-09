import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover, Button } from 'antd';
import { Image, MyButton, MyProgress, MyTable } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import './styles.scss';
import * as routePath from 'routers/route-path';
import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import { selectPartnerInfo } from 'states/partner/selectors';
import { useSelector } from 'react-redux';
import { isNotEmployee } from 'utilities/common';

const JobListView = ({ data, onRemove, isEditable }) => {
  const history = useHistory();

  const partnerInfo = useSelector(selectPartnerInfo());

  const _edit = (item) => () =>
    history.push(routePath.JOB_DETAIL.replace(':id', item.id));

  const _viewDetail = useCallback(
    (item) => () =>
      history.push(routePath.CLIENT_JOB_SHARED.replace(':id', item.id)),
    []
  );

  const _delete = useCallback((item) => () => onRemove(item), []);

  const checkShowStatus = (col, isCheckClass = false) => {
    if (!col || !col?.participantPartner?.status) {
      return '';
    }

    if (
      col?.participantPartner?.status === CONTRACT_STATUS_CLASS.Pending.name
    ) {
      return isCheckClass
        ? CONTRACT_STATUS_CLASS.Pending.class
        : CONTRACT_STATUS_CLASS.Pending.name;
    }
    return isCheckClass
      ? CONTRACT_STATUS_CLASS[col.statusName]?.class
      : CONTRACT_STATUS_CLASS[col.statusName]?.name;
  };

  return (
    <MyTable
      data={data}
      className="pt-16 job-list"
      columns={[
        {
          title: 'Job name',
          key: 'name',
          render: (value, item) => (
            <Button type="link" onClick={_edit(item)} className="btn-job-name text-left">
              <span title={value}>{value}</span>
            </Button>
          ),
        },
        {
          title: 'Contractor',
          key: 'participantPartner',
          render: (value, col) => {
            return (
              <>
                {(value && (
                  <div className="partner-item">
                    <Image src={value.logo} />
                    <div>
                      <p className="title">{value.name}</p>
                      <p className={`contact ${checkShowStatus(col, true)}`}>
                        {checkShowStatus(col)}
                      </p>
                    </div>
                  </div>
                )) ||
                  null}
              </>
            );
          },
        },
        {
          title: 'ID',
          key: 'code',
          align: 'center',
        },
        {
          title: 'Progress',
          key: 'progressType',
          render: (value) => (
            <MyProgress
              progress={value}
              type={'text'}
              className="justify-content-center"
            />
          ),
          align: 'center',
        },
        {
          title: 'Actions',
          key: 'action',
          align: 'center',
          render: (value, item) => (
            <>
              <Popover
                placement="topRight"
                content={
                  <div className="my-popover-container">
                    {isEditable ? (
                      <>
                        <MyButton
                          className="my-btn-no-style my-popover-item"
                          onClick={_edit(item)}
                        >
                          <Icon
                            component={IconCustom.Edit}
                            className="my-icon-md"
                          />
                          Edit
                        </MyButton>
                        {isNotEmployee(partnerInfo) && (
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
                      </>
                    ) : (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_viewDetail(item)}
                      >
                        <Icon
                          component={IconCustom.EyeOpen}
                          className="my-icon-md"
                        />
                        View Detail
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
          ),
        },
      ]}
    />
  );
};

export default JobListView;
