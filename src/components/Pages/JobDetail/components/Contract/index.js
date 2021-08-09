import React, { useCallback, useEffect, useState } from 'react';
import 'assets/css/detailPage.scss';
import './styles.scss';
import { FilePreview, MyButton, MyModal } from 'components/Atoms';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import ModalCreateContract from './components/ModalCreateContract';
import { CONTRACT_DETAIL } from 'routers/route-path';
import Comment from 'components/Organisms/Comment';
import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import { COMMENT_TYPE } from 'constants/common';
import { downloadFileFromUrl } from 'utilities/file';
import { Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const Contract = ({
  job,
  onRefreshPage,
  contract,
  textNoContract,
  canCreateContract,
}) => {
  const history = useHistory();
  const [contractSelected, setContractSelected] = useState(
    contract?.[0] || undefined
  );

  useEffect(() => {
    setContractSelected(contract?.[0] || undefined);
  }, [contract]);

  const [modalCreateVisible, setModalCreateVisible] = useState(false);

  const _switchModalCreate = useCallback(
    (value) => () => setModalCreateVisible(value),
    []
  );

  const _goToDetail = useCallback(() => {
    history.push(CONTRACT_DETAIL.replace(':id', contractSelected?.id));
  }, [contractSelected]);

  const _downloadContract = useCallback(
    (contract) => () =>
      downloadFileFromUrl(
        contract.preview,
        `${contract.name}${contract.extension}`
      ),
    []
  );

  const _renderFileContract = useCallback((item) => {
    if (item)
      return (
        <FilePreview
          fileName={`${item.name}${item.extension || ''}`}
          showName
          extra={
            <p
              className={`file-preview-status ${
                CONTRACT_STATUS_CLASS[item.statusName]?.class
              }`}
            >
              {item.statusName}
            </p>
          }
        />
      );
    return null;
  }, []);

  const _renderContractList = useCallback((list) => {
    return list.map((item) => (
      <Menu.Item key={item.id} onClick={_downloadContract(item)}>
        {_renderFileContract(item)}
      </Menu.Item>
    ));
  }, []);

  return (
    <div id="detail-page" className="contract-page">
      <div className="info-header">
        <h4 className="title">Contract</h4>
        {(contract?.length && (
          <MyButton className="my-btn-no-style btn-edit" onClick={_goToDetail}>
            View Detail
          </MyButton>
        )) ||
          null}
      </div>
      <div className="info-body">
        {contract?.length ? (
          <>
            {contract?.length > 1 ? (
              <Dropdown
                trigger="click"
                className="dropdown-contract"
                overlay={<Menu>{_renderContractList(contract)}</Menu>}
              >
                <div className="contract-preview">
                  <MyButton
                    className="my-btn-no-style contract-item"
                    onClick={_downloadContract(contractSelected)}
                  >
                    {_renderFileContract(contractSelected)}
                  </MyButton>
                  <MyButton className="my-btn-no-style">
                    <CaretDownOutlined />
                  </MyButton>
                </div>
              </Dropdown>
            ) : (
              <div className="contract-preview">
                <MyButton
                  className="my-btn-no-style contract-item"
                  onClick={_downloadContract(contractSelected)}
                >
                  {_renderFileContract(contract[0])}
                </MyButton>
              </div>
            )}
            <Comment
              type={COMMENT_TYPE.CONTRACT}
              entityRecordId={job?.id}
              jobId={job?.id}
              onRefreshPage={onRefreshPage}
              comments={job?.contractComments || []}
              disableTask
            />
          </>
        ) : (
          (job.participantPartner?.status ===
            CONTRACT_STATUS_CLASS.Accepted.name &&
            canCreateContract && (
              <>
                <p className="info-content my-16">
                  You have not created any contract. Tap "New contract" to
                  continue.
                </p>
                <MyButton
                  className="btn-primary-custom"
                  onClick={_switchModalCreate(true)}
                >
                  <Icon component={IconCustom.Plus} />
                  New contract
                </MyButton>
              </>
            )) || <p className="info-content my-16">{textNoContract}</p>
        )}
      </div>
      <MyModal
        visible={modalCreateVisible}
        onClose={_switchModalCreate(false)}
        maskClosable={false}
      >
        <ModalCreateContract
          jobId={job?.id}
          onClose={_switchModalCreate(false)}
          onSubmit={onRefreshPage}
        />
      </MyModal>
    </div>
  );
};

export default Contract;

Contract.propTypes = {
  job: PropTypes.object,
  onRefreshPage: PropTypes.func,
  contract: PropTypes.array,
  textNoContract: PropTypes.string,
  canCreateContract: PropTypes.bool,
};

Contract.defaultProps = {
  textNoContract:
    'You must invite contractor and wait for the contractor accept to create a contract.',
  canCreateContract: true,
};
