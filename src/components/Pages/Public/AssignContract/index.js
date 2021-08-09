import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Col, Popover, Row } from 'antd';

import Comment from 'components/Organisms/Comment';
import { COMMENT_TYPE } from 'constants/common';
import ContractInfo from 'components/Pages/ContractDetail/components/ContractInfo';

import { CONTRACT_STATUS_CLASS } from 'constants/contract';

import axios from 'utilities/axios';

const ContractDetail = (props) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    _loadPage();
  }, []);

  const _loadPage = useCallback(() => {
    const { token } = props.match.params;

    axios.get(`contracts/assigned/${token}`).then((res) => {
      setContract(res.data);
    });
  }, []);

  if (contract) {
    const status = CONTRACT_STATUS_CLASS[contract.statusName];

    return (
      <div id="detail-page">
        <div
          className={`${status?.class} ${status?.classBg} d-inline-block py-5 px-10 radius-20 text-14`}
        >
          {contract.statusName}
        </div>
        <div className="detail-header">
          <h4 className="header-text">{contract.title}</h4>
        </div>
        <Row className="px-n8">
          <Col span={10} className="px-8 max-h-100vh scroll-y">
            <Comment
              inputCommentClass="my-input-white mb-16"
              comments={contract.comments}
              type={COMMENT_TYPE.CONTRACT}
              jobId={contract.jobId}
              entityRecordId={contract.jobId}
              onRefreshPage={_loadPage}
              disabledAddTask={true}
              isEditable={false}
            />
          </Col>
          <Col span={14} className="px-8">
            <div className="info-header">
              <h4 className="title">Contract info</h4>
            </div>
            <ContractInfo
              latestStatus={contract?.latestStatus}
              info={contract.contractImages}
            />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};

export default withRouter(ContractDetail);
