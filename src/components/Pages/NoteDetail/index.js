import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, CardItem, MyModal } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_DETAIL, PROJECTS } from 'routers/route-path';
import { Col, Row } from 'antd';
import { getNote, removeNote } from 'states/note/actions';
import Comment from 'components/Organisms/Comment';
import ModalUpsertNote from 'components/Pages/Notes/components/ModalUpsertNote';
import { NOTE_CONFIRM_REMOVE } from 'components/Pages/Notes/constant';
import { showModalConfirm } from 'utilities/modal';
import Task from '../Task';
import { COMMENT_TYPE, PAGE_TYPE } from 'constants/common';
import * as routeName from 'routers/route-name';
import * as routePath from 'routers/route-path';
import { JOB_ASSIGNED_DETAIL } from 'routers/route-path';
import { PROJECT_DETAIL } from 'routers/route-path';
import { messageAction } from 'utilities/message';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';

const NoteDetail = ({
  pageType = PAGE_TYPE.OWN,
  canAddTask = true,
  actionGetNote = getNote,
  ...props
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalUpdateNote, setModalUpdateNote] = useState(false);
  const [note, setNote] = useState(null);

  const partnerInfo = useSelector(selectPartnerInfo());

  const option = useMemo(() => {
    if (pageType === PAGE_TYPE.OWN) {
      return {
        breadcrumb: [
          { name: 'Projects', link: PROJECTS },
          note?.project && {
            name: `Project: ${note.project.code}`,
            link: PROJECT_DETAIL.replace(':id', note.project.id),
          },
          note?.job && {
            name: `Job: ${note.job.code}`,
            link: JOB_DETAIL.replace(':id', note.job.id),
          },
          { name: 'Note' },
        ],
        isEditable: true,
      };
    }
    if (pageType === PAGE_TYPE.ASSIGNED)
      return {
        breadcrumb: [
          { name: routeName.JOB_ASSIGNED, link: routePath.JOB_ASSIGNED },
          note?.job && {
            name: `Job: ${note.job.code}`,
            link: JOB_ASSIGNED_DETAIL.replace(':id', note.job.id),
          },
          { name: 'Note' },
        ],
        isEditable: false,
      };
    return {
      breadcrumb: null,
      isEditable: false,
    };
  }, [pageType, note]);

  useEffect(() => {
    _loadPage();
  }, []);

  const _switchModalUpdate = useCallback(
    (value) => () => setModalUpdateNote(value),
    []
  );

  const _loadPage = useCallback(() => {
    const { id } = props.match.params;
    dispatch(
      actionGetNote(id, (note) => {
        setNote(note);
      })
    );
  }, []);

  const _removeNote = useCallback(() => {
    const { MESSAGE, TITLE } = NOTE_CONFIRM_REMOVE;
    showModalConfirm({
      title: TITLE,
      content: MESSAGE,
      cancelText: 'Cancel',
      okText: 'Archive',
      onOk: () => {
        dispatch(
          removeNote(note.id, () => {
            messageAction.removeNoteSuccess(note);
            history.goBack();
          })
        );
      },
    });
  }, [note]);

  if (note) {
    return (
      <div id="detail-page">
        {option.breadcrumb && (
          <div className="breadcrumb">
            <Breadcrumb path={option.breadcrumb} />
          </div>
        )}

        <h4 className="header-text">{note.title}</h4>
        <Row className="mx-n8">
          <Col xs={24} md={10} className="px-8">
            <div className="info-header">
              <h4 className="title">Note</h4>
            </div>
            <CardItem
              id={note.id}
              logo={note.partner?.logo}
              time={note.lastUpdatedTime}
              isEdit={note.lastUpdatedTime !== note.createdTime}
              name={note.partner?.name}
              isVisibleAddBtn={false}
              isVisibleRemoveBtn={isNotEmployee(partnerInfo)}
              more={!option.isEditable && <></>}
              content={note.description}
              onEdit={_switchModalUpdate(true)}
              onRemove={_removeNote}
              onClick={_switchModalUpdate(true)}
            />
            <Comment
              inputCommentClass="my-input-white mb-16"
              comments={note.comments}
              entityRecordId={note.id}
              type={COMMENT_TYPE.NOTE}
              isEditable={pageType !== PAGE_TYPE.SHARED}
              jobId={note.job?.id}
              onRefreshPage={_loadPage}
            />
          </Col>
          <Col xs={24} md={14} className="px-8">
            <Task
              entityRecordId={note?.id}
              tasks={note?.tasks || []}
              jobId={note?.job?.id}
              onRefreshPage={_loadPage}
              pageType={pageType}
              principle={note?.partner}
            />
          </Col>
        </Row>
        <MyModal visible={modalUpdateNote} onClose={_switchModalUpdate(false)}>
          <ModalUpsertNote
            onClose={_switchModalUpdate(false)}
            title="Update note"
            description="Enter the information to update this note"
            submitText="Update note"
            successText="You have updated this note. Back to your note"
            successButtonText="Back to your note"
            note={note}
            onSubmit={_loadPage}
          />
        </MyModal>
      </div>
    );
  }
  return null;
};

export default withRouter(NoteDetail);
