import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, MyButton, MyModal } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModalConfirm, showModalError } from 'utilities/modal';
import * as routePath from 'routers/route-path';
import { DownloadOutlined } from '@ant-design/icons';
import {
  JOB_ASSIGNED_DETAIL,
  JOB_DETAIL,
  PROJECT_DETAIL,
  PROJECTS,
  HOME,
  CONTRACTS,
} from 'routers/route-path';
import { Col, Popover, Row } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import {
  getContract,
  removeContract,
  verifyContract,
} from 'states/contract/actions';
import { partnerGetInfo } from 'states/partner/actions';
import Comment from 'components/Organisms/Comment';
import { COMMENT_TYPE } from 'constants/common';
import ContractInfo from './components/ContractInfo';
import ModalSignContract from './components/ModalSignContract';
import {
  CONTRACT_PRINCIPLE_SIGN,
  CONTRACT_SIGN_TYPE,
  CONTRACT_STATUS_CLASS,
} from 'constants/contract';
import * as routeName from 'routers/route-name';
import { messageAction } from 'utilities/message';
import { getTimeFormatDateTime } from 'utilities/time';
import ModalUpdateContract from 'components/Pages/ContractDetail/components/ModalUpdateContract';
import './styles.scss';

const ContractDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState(props.match?.params?.id || 0);
  const [contract, setContract] = useState(null);
  const [modalSignContract, setModalSignContract] = useState(false);
  const [modalUpdateContract, setModalUpdateContract] = useState(false);

  const breadcrumb = useMemo(() => {
    if (!contract) return [];
    // if (contract.isOwnContract) {
    //   return [
    //     { name: 'Projects', link: PROJECTS },
    //     contract.projectCode && {
    //       name: contract.projectCode,
    //       link: PROJECT_DETAIL.replace(':id', contract.projectId),
    //     },
    //     contract.jobCode && {
    //       name: contract.jobCode,
    //       link: JOB_DETAIL.replace(':id', contract.jobId),
    //     },
    //     { name: contract.code },
    //   ];
    // }
    // return [
    //   { name: routeName.JOB_ASSIGNED, link: routePath.JOB_ASSIGNED },
    //   contract.jobCode && {
    //     name: contract.jobCode,
    //     link: JOB_ASSIGNED_DETAIL.replace(':id', contract.jobId),
    //   },
    //   { name: contract.code },
    // ];
    return [{ name: 'Contracts', link: CONTRACTS }, { name: contract.code }];
  }, [contract]);

  useEffect(() => {
    _loadPage();
  }, [id]);

  const _switchModalSignContract = useCallback(
    (value) => () => {
      if (value) {
        dispatch(partnerGetInfo());
      }
      setModalSignContract(value);
    },
    []
  );

  const _switchModalUpdateContract = useCallback(
    (value) => () => setModalUpdateContract(value),
    []
  );

  const _loadPage = useCallback(() => {
    dispatch(
      getContract(
        id,
        (data) => {
          if (data) {
            setContract(data);
          } else {
            showModalError({
              title: 'Error',
              content: 'Oops! Something went wrong. Contract not found!',
              okText: 'Back to home',
              onOk: () => history.push(HOME),
            });
          }
        },
        (errorMsg) => {
          showModalError({
            title: 'Error',
            content: 'Oops! Something went wrong. Contract not found!',
            okText: 'Back to home',
            onOk: () => history.push(HOME),
          });
        }
      )
    );
  }, [id]);

  const _handleSubmit = useCallback(() => {
    _loadPage();
  }, [id]);

  const _remove = useCallback(() => {
    showModalConfirm({
      title: 'Archive contract',
      content: 'Are you sure to archive this contract',
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          removeContract(contract.jobId, () => {
            history.push(JOB_DETAIL.replace(':id', contract.jobId));
          })
        );
      },
    });
  }, [contract]);

  const _verifyContract = useCallback(() => {
    showModalConfirm({
      title: 'Verify contract',
      content: 'Are you sure to verify this contract',
      cancelText: 'Cancel',
      okText: 'Verify',
      onOk: () => {
        dispatch(
          verifyContract(
            { jobId: contract.jobId, status: contract.latestStatus },
            () => {
              messageAction.verifyContract({ contract });
              _loadPage();
            }
          )
        );
      },
    });
  }, [contract]);

  const _renderSignButton = useMemo(() => {
    if (!contract) return null;
    if (!contract.signType && !contract.isOwnContract)
      return (
        <span className="status-text">
          Please waiting for principle sign the contract
        </span>
      );

    if (contract.verifyDate)
      return (
        <span className="status-text">
          Verified at {getTimeFormatDateTime(contract.verifyDate)}
        </span>
      );

    if (contract.signType === CONTRACT_SIGN_TYPE.DOCUSIGN.NAME) {
      // Primary
      if (contract.isOwnContract) {
        if (
          contract.latestStatus ===
          CONTRACT_STATUS_CLASS[CONTRACT_PRINCIPLE_SIGN].code
        )
          return <span className="status-text">Signed by Docusign</span>;

        if (contract.latestStatus === CONTRACT_STATUS_CLASS.Draft.name)
          return (
            <span className="status-text">
              Please check your email to sign the contract by Docusign
            </span>
          );
      } else {
        // Participant
        if (contract.latestStatus === CONTRACT_STATUS_CLASS.Signed.name)
          return <span className="status-text">Signed by Docusign</span>;
        if (
          contract.latestStatus ===
          CONTRACT_STATUS_CLASS[CONTRACT_PRINCIPLE_SIGN].code
        )
          return (
            <span className="status-text">
              Please check your email to sign the contract by Docusign
            </span>
          );
      }
    } else {
      // Primary
      if (contract.isOwnContract) {
        if (
          contract.latestStatus ===
          CONTRACT_STATUS_CLASS[CONTRACT_PRINCIPLE_SIGN].code
        )
          return <span className="status-text">Signed the contract</span>;
      } else {
        // Participant
        if (contract.latestStatus === CONTRACT_STATUS_CLASS.Signed.name)
          return <span className="status-text">Signed the contract</span>;
      }
    }

    if (
      contract.signType !== CONTRACT_SIGN_TYPE.DOCUSIGN.NAME &&
      ((contract.latestStatus === CONTRACT_STATUS_CLASS.Draft.name &&
        contract.isOwnContract) ||
        (contract.latestStatus ===
          CONTRACT_STATUS_CLASS[CONTRACT_PRINCIPLE_SIGN].code &&
          !contract.isOwnContract))
    ) {
      return (
        <MyButton
          className="btn-primary-custom"
          onClick={_switchModalSignContract(true)}
        >
          <Icon component={IconCustom.Checked} />
          Sign contract
        </MyButton>
      );
    }
    if (
      contract.isOwnContract &&
      !contract.verifyDate &&
      contract.latestStatus === CONTRACT_STATUS_CLASS.Signed.name
    ) {
      return (
        <MyButton className="btn-primary-custom" onClick={_verifyContract}>
          <Icon component={IconCustom.Checked} />
          Verify contract
        </MyButton>
      );
    }

    return null;
  }, [contract]);

  if (contract) {
    const status = CONTRACT_STATUS_CLASS[contract.statusName];

    const checkIsShowEdit = () => {
      // Contract was uploaded by manually.
      if (!contract.verifyDate && CONTRACT_SIGN_TYPE.MANUALLY.NAME) {
        // Contractor signed, contractor can edit contract.
        if (
          !contract.isOwnContract &&
          contract.latestStatus === CONTRACT_STATUS_CLASS.Signed.name
        )
          return true;

        // Principle signed or contract draft, principle can edit contract.
        if (contract.isOwnContract) return true;
      }
      return false;
    };

    return (
      <div id="detail-page" className="contract-detail-page">
        <div className="breadcrumb">
          <Breadcrumb path={breadcrumb} />
        </div>

        <div
          className={`${status?.class} ${status?.classBg} d-inline-block py-5 px-10 radius-20 text-14`}
        >
          {contract.statusName}
        </div>
        <div className="detail-header">
          <h4 className="header-text">{contract.title}</h4>
          {_renderSignButton}
          <Popover
            placement="bottomRight"
            content={
              <div className="my-popover-container">
                {contract.isOwnContract && !contract.verifyDate && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={_remove}
                  >
                    <Icon component={IconCustom.Trash} className="my-icon-md" />
                    Archive
                  </MyButton>
                )}
                <a href={contract.slug} download target="_blank">
                  <MyButton className="my-btn-no-style my-popover-item">
                    <DownloadOutlined className="my-icon-md" />
                    Download
                  </MyButton>
                </a>
                {checkIsShowEdit() && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={_switchModalUpdateContract(true)}
                  >
                    <Icon component={IconCustom.Edit} className="my-icon-md" />
                    Edit Contract
                  </MyButton>
                )}
              </div>
            }
            trigger="focus"
          >
            <div className="text-right">
              <MyButton className="my-btn-no-style my-btn-gray ml-20">
                <Icon component={IconCustom.MoreHorizontal} />
                More
              </MyButton>
            </div>
          </Popover>
        </div>
        <Row className="px-n8">
          <Col xs={24} md={10} className="px-8 max-h-100vh scroll-y">
            <Comment
              inputCommentClass="my-input-white mb-16"
              comments={contract.comments}
              type={COMMENT_TYPE.CONTRACT}
              jobId={contract.jobId}
              entityRecordId={contract.jobId}
              onRefreshPage={_loadPage}
              disabledAddTask={true}
            />
          </Col>
          <Col xs={24} md={14} className="px-8">
            <div className="info-header">
              <h4 className="title">Contract info</h4>
            </div>
            <ContractInfo
              latestStatus={contract?.latestStatus}
              info={contract.contractImages}
            />
          </Col>
        </Row>
        <MyModal
          visible={modalSignContract}
          onClose={_switchModalSignContract(false)}
        >
          <ModalSignContract
            onClose={_switchModalSignContract(false)}
            onSubmit={_handleSubmit}
            jobId={contract?.jobId}
            contractSlug={contract?.slug}
            signType={contract.signType}
            status={contract.latestStatus}
            partnerText={contract.isOwnContract ? 'contractor' : 'principle'}
            participantName={
              contract?.isOwnContract
                ? contract?.participantName
                : contract?.primaryName
            }
          />
        </MyModal>
        <MyModal
          visible={modalUpdateContract}
          onClose={_switchModalUpdateContract(false)}
          maskClosable={false}
        >
          <ModalUpdateContract
            onClose={_switchModalUpdateContract(false)}
            onSubmit={_loadPage}
            contractId={contract?.id}
            jobId={contract?.jobId}
            email={contract?.assignedEmail}
            contract={contract}
          />
        </MyModal>
      </div>
    );
  }
  return null;
};

export default withRouter(ContractDetail);
