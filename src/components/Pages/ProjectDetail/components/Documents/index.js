import React, { useCallback, useState } from 'react';
import {
  FilePreview,
  ModalNewDocument,
  MyButton,
  NoData,
  CustomToolTips,
} from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { Popover } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { createProjectDocuments } from 'states/project/actions';
import { useDispatch } from 'react-redux';
import { showModalConfirm } from 'utilities/modal';
import { removeBulkFile } from 'states/common/actions';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { messageAction } from 'utilities/message';
import { Link } from 'react-router-dom';
import { DOCUMENT_DETAIL } from 'routers/route-path';

const Documents = ({ project, onRefreshPage, isEditable = true }) => {
  const dispatch = useDispatch();
  const [newDocVisible, setNewDocVisible] = useState(false);

  const _switchModal = useCallback(
    (value) => () => {
      setNewDocVisible(value);
    },
    []
  );

  const _uploadDocument = (documents, email, callback) => {
    dispatch(createProjectDocuments({ id: project.id, documents }, callback));
  };

  const _removeDocument = useCallback(
    (documents) => () => {
      showModalConfirm({
        title: 'Archive document',
        content: 'Are you sure to archive this document?',
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

  const _renderItem = useCallback(
    (doc) => {
      return (
        <div className="doc-item" key={doc.id}>
          <FilePreview fileName={doc.extension} />
          <div className="name">
            <CustomToolTips title={doc.displayName} />
          </div>
          <Popover
            placement="topRight"
            content={
              <div className="my-popover-container">
                <a href={doc.preview} target="_blank">
                  <MyButton className="my-btn-no-style my-popover-item">
                    <DownloadOutlined className="my-icon-md" />
                    Download
                  </MyButton>
                </a>
                <Link to={DOCUMENT_DETAIL.replace(':id', doc.id)}>
                  <MyButton className="my-btn-no-style my-popover-item">
                    <Icon
                      component={IconCustom.Lock}
                      className="my-icon-md"
                    />
                    View Detail
                  </MyButton>
                </Link>
                {isEditable && (
                  <MyButton
                    className="my-btn-no-style my-popover-item"
                    onClick={_removeDocument(doc)}
                  >
                    <Icon component={IconCustom.Trash} className="my-icon-md" />
                    Archive
                  </MyButton>
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
      );
    },

    []
  );

  const _closeModal = useCallback((isSuccess) => {
    setNewDocVisible(false);
    if (isSuccess) onRefreshPage();
  }, []);

  return (
    <>
      <div className="info-header">
        <h4 className="title">Attachments</h4>
        {isEditable && (
          <MyButton
            className="my-btn-no-style btn-edit"
            onClick={_switchModal(true)}
          >
            New attachment
          </MyButton>
        )}
      </div>
      {(project.attachments?.length && (
        <div className="doc-list">{project.attachments.map(_renderItem)}</div>
      )) || <NoData description={COMMON_NODATA_TEXT.DOCUMENT} />}
      <ModalNewDocument
        visible={newDocVisible}
        onClose={_closeModal}
        onSubmit={_uploadDocument}
        description="Upload attachments of this project or you can skip for later. Only you and client can view these attachments"
        successText="You have added new attachments for this project"
        buttonPrimaryText="Back to job"
        hideAssigneeField={true}
      />
    </>
  );
};

export default Documents;
