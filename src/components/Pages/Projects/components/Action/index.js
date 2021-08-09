import { Popover } from 'antd';
import { MyButton } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as routePath from 'routers/route-path';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';

const Action = ({ item, onDeleteProject }) => {
  const history = useHistory();
  const partnerInfo = useSelector(selectPartnerInfo());

  const _edit = useCallback(
    () => history.push(routePath.PROJECT_DETAIL.replace(':id', item.id)),
    []
  );

  const _delete = useCallback(() => onDeleteProject(item), []);

  return (
    <>
      <Popover
        placement="topRight"
        content={
          <div className="my-popover-container">
            <MyButton
              className="my-btn-no-style my-popover-item"
              onClick={_edit}
            >
              <Icon component={IconCustom.Edit} className="my-icon-md" />
              Edit
            </MyButton>
            {isNotEmployee(partnerInfo) && (
              <MyButton
                className="my-btn-no-style my-popover-item"
                onClick={_delete}
              >
                <Icon component={IconCustom.Trash} className="my-icon-md" />
                Archive
              </MyButton>
            )}
          </div>
        }
        trigger="click"
      >
        <MyButton className="my-btn-no-style btn-icon text-dark-gray">
          <Icon component={IconCustom.MoreHorizontal} />
        </MyButton>
      </Popover>
    </>
  );
};

export default Action;
