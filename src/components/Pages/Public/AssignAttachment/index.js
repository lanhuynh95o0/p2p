import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useActions from 'hooks/useActions';
import { callActionWithStatus } from 'states/common/actions';
import { useHistory, useParams } from 'react-router-dom';
import { Breadcrumb, CardItem, FilePreview } from 'components/Atoms';
import { Col, Row } from 'antd';
import Comment from 'components/Organisms/Comment';
import Task from 'components/Pages/Task';
import { DELETE_FILE, GET_ALL_FILE } from 'states/document/constants';
import { TASK_TYPE } from 'constants/task';
import { showModalConfirm } from 'utilities/modal';
import PropTypes from 'prop-types';
import axios from 'utilities/axios';

import { COMMENT_TYPE, PAGE_TYPE } from 'constants/common';
import { messageSuccess } from 'utilities/message';

const DocumentDetail = ({ type }) => {
  const [callActionWithStatusAction] = useActions([callActionWithStatus]);

  const [documentDetails, setDocumentDetails] = useState({});

  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    onReloadPage();
  }, []);

  const onReloadPage = useCallback(() => {
    // callActionWithStatusAction(GET_ALL_FILE.PROCESS, { id });

    axios.get(`files/assigned/${token}`).then((res) => {
      setDocumentDetails(res.data);
    });
  }, []);

  const confirmBeforeRemove = () => {
    showModalConfirm({
      title: 'Archive Attachment',
      content:
        'All comments and task will be deleted if you archive this attachment?',
      okText: 'Archive',
      cancelText: 'Cancel',
      onOk: () =>
        callActionWithStatusAction(
          DELETE_FILE.PROCESS,
          {
            ...documentDetails,
            history,
          },
          () => {
            messageSuccess({
              content: 'You have archived the attachment successfully!',
            });
          }
        ),
    });
  };

  return (
    <div id="detail-page">
      <Row className="px-n8">
        <Col span={10} className="px-8">
          <div className="info-header">
            <h4 className="title">Attachment</h4>
          </div>
          <CardItem
            id={documentDetails?.file?.id}
            time={documentDetails?.createdTime}
            logo={documentDetails?.job?.partner?.logo}
            name={documentDetails?.job?.partner?.name}
            isVisibleAddBtn={false}
            isVisibleEditBtn={false}
            onRemove={confirmBeforeRemove}
            more={<></>}
            footer={
              <div
                className="d-flex align-items-center"
                key={documentDetails?.file?.id}
              >
                <FilePreview fileName={documentDetails?.file?.extension} />
                <span className="name">
                  <a
                    className="file-name-custom"
                    target="_blank"
                    href={documentDetails?.file?.preview}
                  >
                    {documentDetails?.file?.displayName}
                  </a>
                </span>
              </div>
            }
          />
          <Comment
            inputCommentClass="my-input-white mb-16"
            comments={documentDetails?.comments}
            entityRecordId={documentDetails?.file?.id}
            jobId={documentDetails?.job?.id}
            type={COMMENT_TYPE.DOCUMENT}
            onRefreshPage={onReloadPage}
            isEditable={false}
          />
        </Col>
        <Col span={14} className="px-8">
          <Task
            onRefreshPage={onReloadPage}
            tasks={documentDetails?.tasks}
            jobId={documentDetails?.job?.id}
            entityRecordId={documentDetails?.file?.id}
            type={TASK_TYPE.ATTACHMENT}
            pageType={PAGE_TYPE.SHARED}
            principle={documentDetails?.partner}
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DocumentDetail);

DocumentDetail.propTypes = {
  type: PropTypes.oneOf(['own', 'assign']),
};

DocumentDetail.defaultProps = {
  type: 'own',
};
