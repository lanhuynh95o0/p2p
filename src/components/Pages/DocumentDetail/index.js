import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useActions from 'hooks/useActions';
import { callActionWithStatus } from 'states/common/actions';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Breadcrumb,
  CardItem,
  FileCollapse,
  FilePreview,
  InputMultipleEmails,
  ModalUpdateAttachment,
  MyButton,
  MyModal,
} from 'components/Atoms';
import { commonSelector } from 'hooks/helperSelector';
import { DOCUMENT } from 'states/document';
import { Col, Form, Row } from 'antd';
import Comment from 'components/Organisms/Comment';
import Task from 'components/Pages/Task';
import { DELETE_FILE, GET_ALL_FILE } from 'states/document/constants';
import { TASK_TYPE } from 'constants/task';
import { showModalConfirm } from 'utilities/modal';
import PropTypes from 'prop-types';
import {
  JOB_ASSIGNED_DETAIL,
  JOB_DETAIL,
  PROJECT_DETAIL,
  PROJECTS,
} from 'routers/route-path';
import * as routeName from 'routers/route-name';
import * as routePath from 'routers/route-path';
import { COMMENT_TYPE } from 'constants/common';
import { messageSuccess } from 'utilities/message';
import { updateJobDocumentFile } from 'states/document/actions';
import { selectUserInfo } from 'states/auth/selectors';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';
import Icon from '@ant-design/icons';
import { IconCustom } from 'components/Atoms/Icon';
import './styles.scss';

const DocumentDetail = ({ type }) => {
  const [privacyModal, setPrivacyModal] = useState({
    visible: false,
    file: null,
  });
  const [initEmails, setInitEmails] = useState(false);
  const [emails, setEmails] = useState([]);
  const [isUpdatingAttachment, setIsUpdatingAttachment] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isFileNotExist, setIsFileNotExist] = useState(false);
  const [callActionWithStatusAction, updateJobDocumentFileAction] = useActions([
    callActionWithStatus,
    updateJobDocumentFile,
  ]);
  const documentDetails = useSelector(
    commonSelector(DOCUMENT, 'documentDetails')
  );
  const userInfo = useSelector(selectUserInfo());
  const partnerInfo = useSelector(selectPartnerInfo());

  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  const isEditable = useMemo(
    () =>
      type === 'own' ||
      userInfo?.id === documentDetails?.job?.partner?.id ||
      userInfo?.id === documentDetails?.creator?.id,
    [type, userInfo, documentDetails]
  );

  const breadCrumb = useMemo(() => {
    if (!documentDetails) return [];
    const {
      file,
    } = documentDetails;
    if (documentDetails.job) {
      const { job: { project, id: jobId, code: jobCode } } = documentDetails;
      if (type === 'own') {
        return [
          { name: 'Projects', link: PROJECTS },
          documentDetails?.job && {
            name: `Project: ${project?.code}`,
            link: PROJECT_DETAIL.replace(':id', project?.id),
          },
          jobCode && {
            name: `Job: ${jobCode}`,
            link: JOB_DETAIL.replace(':id', jobId),
          },
          { name: file.displayName },
        ];
      } else {
        return [
          { name: routeName.JOB_ASSIGNED, link: routePath.JOB_ASSIGNED },
          jobCode && {
            name: jobCode,
            link: JOB_ASSIGNED_DETAIL.replace(':id', jobId),
          },
          { name: file.displayName },
        ];
      }
    }
  }, [type, documentDetails]);

  useEffect(() => {
    if (partnerInfo.accountType || partnerInfo.role) {
      onReloadPage();
    }
  }, [partnerInfo]);

  useEffect(() => {
    if (!initEmails && documentDetails && documentDetails.assignedEmails) {
      setInitEmails(true);
      setEmails(documentDetails.assignedEmails);
    }
  }, [documentDetails]);

  const onReloadPage = useCallback(() => {
    callActionWithStatusAction(
      GET_ALL_FILE.PROCESS,
      { id },
      () => { },
      (errData) => {
        if (errData?.code === 'FileNotExist') {
          setIsFileNotExist(true);
        }
      }
    );
  }, [documentDetails]);

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

  const onOpenPrivacyModal = useCallback(() => {
    if (documentDetails?.file) {
      setPrivacyModal({
        visible: true,
        file: { ...documentDetails.file, privacy: documentDetails.privacy },
      });
      form.setFieldsValue({ email: documentDetails.assignedEmail || '' });
    }
  }, [documentDetails]);

  const onClosePrivacyModal = useCallback(() => {
    setPrivacyModal({
      visible: false,
      file: null,
    });
  }, []);

  const onChangeFilePrivacy = useCallback(
    (privacy) => {
      setPrivacyModal((prev) => ({ ...prev, file: { ...prev.file, privacy } }));
    },
    [privacyModal]
  );

  const _onEmailsChanged = (emails) => {
    setEmails(emails);
  };

  const onUpdate = () => {
    form.validateFields().then((values) => {
      setUpdating(true);
      const email = emails.join(';');
      form.setFieldsValue({ email });
      const payload = {
        jobId: documentDetails.job.id,
        assignedEmail: email,
        fileId: privacyModal.file.id,
        privacy: privacyModal.file.privacy,
      };
      updateJobDocumentFileAction(
        payload,
        () => {
          onClosePrivacyModal();
          setUpdating(false);
          onReloadPage();
          messageSuccess({
            content: 'You have updated the attachment successfully!',
          });
        },
        () => {
          setUpdating(false);
        }
      );
    });
  };

  const _onUpdateAttachment = () => {
    setIsUpdatingAttachment(true);
  };

  const _onUpdateAttachmentModalClosed = () => {
    setIsUpdatingAttachment(false);
  };

  const _onUpdateAttachmentSuccess = (updatedAttachment, originalAttachment) => {
    setIsUpdatingAttachment(false);
    originalAttachment.displayName = updatedAttachment.displayName;
    onReloadPage();
    return true;
  };

  if (isFileNotExist) {
    return null;
  }

  return (
    <div id="detail-page">
      <div className="breadcrumb">
        <Breadcrumb path={breadCrumb} />
      </div>

      <Row className="px-n8">
        <Col xs={24} md={10} className="px-8">
          <div className="info-header">
            <h4 className="title">Attachment</h4>
          </div>
          <CardItem className="card-document-detail"
            id={documentDetails?.file?.id}
            time={documentDetails?.createdTime}
            logo={documentDetails?.job?.partner?.logo}
            name={documentDetails?.job?.partner?.name}
            isVisibleAddBtn={false}
            isVisibleRemoveBtn={isNotEmployee(partnerInfo)}
            onEdit={onOpenPrivacyModal}
            onRemove={confirmBeforeRemove}
            more={isEditable ? undefined : <></>}
            footer={
              <div
                className="d-flex align-items-center"
                key={documentDetails?.file?.id}
              >
                <FilePreview file={documentDetails?.file} fileName={documentDetails?.file?.extension} />
                <span className="name">
                  <a
                    className="file-name-custom"
                    target="_blank"
                    href={documentDetails?.file?.preview}
                  >
                    {documentDetails?.file?.displayName}
                  </a>
                </span>
                <Icon component={IconCustom.Edit}
                  className="file-edit"
                  onClick={_onUpdateAttachment}
                />
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
          />
        </Col>
        <Col xs={24} md={14} className="px-8">
          <Task
            onRefreshPage={onReloadPage}
            tasks={documentDetails?.tasks}
            jobId={documentDetails?.job?.id}
            entityRecordId={documentDetails?.file?.id}
            type={TASK_TYPE.ATTACHMENT}
            principle={documentDetails?.partner}
          />
        </Col>
      </Row>
      <MyModal
        destroyOnClose
        visible={privacyModal.visible}
        onClose={onClosePrivacyModal}
      >
        <>
          <div className="text-center block-document-detail">
            <h4 className="title">Who can see the attachment</h4>
            <p className="description">Set privacy for the attachment</p>
            <Form className="form-attachment-job-email" layout="vertical" form={form}>
              <InputMultipleEmails form={form} onEmailsChange={_onEmailsChanged} emails={emails} />
              <Form.Item
                label="Email"
                className="form-item-custom"
                name="email"
                hidden={true}
              />
            </Form>
            <hr className="my-20" />
            <div className="pb-20">
              <FileCollapse
                data={[privacyModal.file]}
                onChange={onChangeFilePrivacy}
              />
            </div>
          </div>
          <div className="text-center">
            <MyButton
              className="btn-primary-custom mx-10"
              loading={updating}
              onClick={onUpdate}
            >
              Update
            </MyButton>
          </div>
        </>
      </MyModal>
      <ModalUpdateAttachment visible={isUpdatingAttachment} attachment={documentDetails?.file} onClose={_onUpdateAttachmentModalClosed}
        onSuccess={_onUpdateAttachmentSuccess} />
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
