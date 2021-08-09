import React, { useCallback, useMemo, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import './styles.scss';
import {
  FilePreview,
  MyButton,
  ModalNewDocument,
  NoData,
  MyModal,
} from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createJobDocuments } from 'states/job/actions';
import { showModalConfirm } from 'utilities/modal';
import { removeBulkFile } from 'states/common/actions';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { messageAction } from 'utilities/message';
import { Link } from 'react-router-dom';
import { DOCUMENT_ASSIGN_DETAIL, DOCUMENT_DETAIL } from 'routers/route-path';
import ModalUpsertTask from 'components/Pages/Task/components/ModalUpsertTask';
import { TASK_TYPE } from 'components/Pages/Task/constant';
import { selectUserInfo } from 'states/auth/selectors';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';

const Documents = ({ job, onRefreshPage, isEditable = true, type = 'own' }) => {
  const dispatch = useDispatch();
  const [newDocVisible, setNewDocVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(false);
  const userInfo = useSelector(selectUserInfo());

  console.log('job.attachments: ', job.attachments);

  const partnerInfo = useSelector(selectPartnerInfo());

  const option = useMemo(() => {
    if (type === 'own') {
      return {
        detailPath: DOCUMENT_DETAIL,
      };
    }
    return {
      detailPath: DOCUMENT_ASSIGN_DETAIL,
    };
  }, [type]);

  const _updateSelectedDoc = useCallback(
    (value) => () =>
      setSelectedDoc(
        value
          ? {
            jobId: job.id,
            entityRecordId: value.id,
          }
          : null
      ),
    []
  );

  const _switchModal = useCallback(
    (value) => () => {
      setNewDocVisible(value);
    },
    []
  );

  const _renderItem = useCallback(
    (doc) => {
      const extra = [
        {
          icon: IconCustom.Clipboard,
          value: doc.taskCount || 0,
          text: 'task',
        },
        {
          icon: IconCustom.Message,
          value: doc.commentCount || 0,
          text: 'comment',
        },
      ];
      const allowArchive =
        userInfo &&
        job &&
        (userInfo.id === job.principle?.id || userInfo.id === doc.creator?.id);
      return (
        <div className="doc-item-wrapper" key={doc.id}>
          <div className="doc-item">
            <FilePreview fileName={doc.slug} />
            <span className="name">{doc.displayName}</span>
            <Popover
              placement="topRight"
              content={
                <div className="my-popover-container">
                  {isEditable ? (
                    <>
                      <Link to={option.detailPath.replace(':id', doc.id)}>
                        <MyButton className="my-btn-no-style my-popover-item">
                          <Icon
                            component={IconCustom.Lock}
                            className="my-icon-md"
                          />
                          {type === 'own' ? 'Edit' : 'View detail'}
                        </MyButton>
                      </Link>
                      {allowArchive && isNotEmployee(partnerInfo) && (
                        <MyButton
                          className="my-btn-no-style my-popover-item"
                          onClick={_removeDocument(doc)}
                        >
                          <Icon
                            component={IconCustom.Trash}
                            className="my-icon-md"
                          />
                          Archive
                        </MyButton>
                      )}
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_updateSelectedDoc(doc)}
                      >
                        <Icon
                          component={IconCustom.Clipboard}
                          className="my-icon-md"
                        />
                        Add new task
                      </MyButton>
                    </>
                  ) : (
                    <a download href={doc.preview} target="_blank">
                      <MyButton className="my-btn-no-style my-popover-item">
                        <DownloadOutlined className="my-icon-md" />
                        Download
                      </MyButton>
                    </a>
                  )}
                </div>
              }
              trigger="focus"
            >
              <MyButton className="my-btn-no-style btn-icon text-dark-gray">
                <Icon
                  component={IconCustom.MoreHorizontal}
                  className="my-icon-md-dark-gray"
                />
              </MyButton>
            </Popover>
          </div>

          {((doc.taskCount || doc.commentCount) && (
            <div className="footer">
              {extra.map((item) => (
                <span key={item.text}>
                  <Icon component={item.icon} className="icon" />
                  <span className="label">
                    {item.value}
                    {` ${item.text}${item.value === 1 ? '' : 's'}`}
                  </span>
                </span>
              ))}
            </div>
          )) ||
            null}
        </div>
      );
    },
    [userInfo, job]
  );

  const _closeModal = useCallback((isSuccess) => {
    setNewDocVisible(false);
    if (isSuccess) onRefreshPage();
  }, []);

  const _uploadDocuments = useCallback((documents, assignedEmail, callback) => {
    dispatch(
      createJobDocuments({ id: job.id, documents, assignedEmail }, callback)
    );
  }, []);

  const _removeDocument = useCallback(
    (documents) => () => {
      showModalConfirm({
        title: 'Archive document',
        content:
          'All comments and task will be deleted if you archive this attachment?',
        cancelText: 'Cancel',
        okText: 'Archive',
        onOk: () =>
          dispatch(
            removeBulkFile({ slugs: [documents.slug], physical: true }, () => {
              messageAction.removeDocSuccess(documents);
              onRefreshPage();
            })
          ),
      });
    },
    []
  );

  return (
    <div className="job-documents">
      <div className="info-header">
        <h4 className="title">Attachments</h4>
        {isEditable && (
          <MyButton className="btn-primary-custom btn-add-attachment" onClick={_switchModal(true)}>
            New attachment
          </MyButton>
        )}
      </div>
      {(job.attachments?.length && (
        <div className="body">{job.attachments.map(_renderItem)}</div>
      )) || <NoData description={COMMON_NODATA_TEXT.DOCUMENT} />}
      <ModalNewDocument
        visible={newDocVisible}
        onClose={_closeModal}
        onSubmit={_uploadDocuments}
        description="Upload attachments for this job."
        successText={'You have added new attachments for this job'}
        buttonPrimaryText="Back to job"
      />
      <MyModal visible={!!selectedDoc} onClose={_updateSelectedDoc(null)}>
        <ModalUpsertTask
          onClose={_updateSelectedDoc(null)}
          entityRecordId={selectedDoc?.entityRecordId}
          jobId={selectedDoc?.jobId}
          type={TASK_TYPE.ATTACHMENT}
          successButtonText="Back to Job detail"
          onSubmit={onRefreshPage}
        />
      </MyModal>
    </div>
  );
};

export default Documents;
