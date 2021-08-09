import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME } from 'states/dashboard/constants';
import { MyButton, MyTable } from 'components/Atoms';
import { Avatar, Popover, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import { showModalError } from 'utilities/modal';

export const LIST_DASHBOARD_TYPE = {
  PARTNER: 'PARTNER',
  CLIENT: 'CLIENT',
};

const ListDashboard = ({
  dataSource,
  onAddPartner = () => null,
  onAddClient = () => null,
  type = LIST_DASHBOARD_TYPE.CLIENT,
}) => {
  const loading = useSelector(commonSelector(STATE_NAME, 'loading'));

  const _visitSite = useCallback(
    (partner) => () => {
      if (!partner.subDomain) {
        return showModalError({
          title: 'Warning',
          content: 'This contractor does not create public url yet!',
        });
      }
      const { protocol, host } = window.location;
      window.open(`${protocol}//${partner.subDomain}.${process.env.REACT_APP_HOST_NAME}`, '_blank');
    },
    []
  );

  const partnersColumns = [
    {
      title: '',
      key: 'name',
      width: 50,
      render: (_, { name, logo }) => (
        <Avatar shape="circle" size={40} src={logo} alt={name} />
      ),
    },
    {
      title: '',
      key: 'logo',
      render: (_, { name }) => (
        <p className="mb-0 ml-10 partner-name">{name}</p>
      ),
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      className: 'add__more-icon',
      render: (_, record) => (
        <>
          <Popover
            placement="topRight"
            content={
              <div className="my-popover-container">
                <MyButton
                  onClick={() =>
                    type === LIST_DASHBOARD_TYPE.PARTNER
                      ? onAddPartner(record)
                      : onAddClient(record)
                  }
                  className="my-btn-no-style my-popover-item"
                >
                  <Icon component={IconCustom.Mail} />
                  {type === LIST_DASHBOARD_TYPE.CLIENT
                    ? 'Add to project'
                    : 'Send invitation'}
                </MyButton>
                {type === LIST_DASHBOARD_TYPE.PARTNER && (
                  <MyButton
                    onClick={_visitSite(record)}
                    className="my-btn-no-style my-popover-item"
                  >
                    <Icon component={IconCustom.Site} />
                    Visit site
                  </MyButton>
                )}
              </div>
            }
            trigger="focus"
          >
            <MyButton className="my-btn-no-style btn-icon text-gray">
              <Icon component={IconCustom.MoreHorizontal} />
            </MyButton>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <MyTable
      data={dataSource}
      columns={partnersColumns}
      showHeader={false}
      loading={loading}
      className="scroll-y max-h-550"
      totalItem={0}
    />
  );
};

ListDashboard.propTypes = {
  dataSource: PropTypes.array,
  onAddPartner: PropTypes.func,
  onAddClient: PropTypes.func,
  type: PropTypes.oneOf(Object.values(LIST_DASHBOARD_TYPE)),
};

export default React.memo(ListDashboard);
