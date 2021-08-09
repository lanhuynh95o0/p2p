import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, CardItem, MyModal } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import { getNote, removeNote } from 'states/note/actions';
import Comment from 'components/Organisms/Comment';
import ModalUpsertNote from 'components/Pages/Notes/components/ModalUpsertNote';
import { NOTE_CONFIRM_REMOVE } from 'components/Pages/Notes/constant';
import { showModalConfirm } from 'utilities/modal';
import Task from '../../Task';
import { COMMENT_TYPE, PAGE_TYPE } from 'constants/common';

import axios from 'utilities/axios';

const NoteDetail = ({ actionGetNote = getNote, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalUpdateNote, setModalUpdateNote] = useState(false);
  const [note, setNote] = useState(null);

  useEffect(() => {
    _loadPage();
  }, []);

  const _switchModalUpdate = useCallback(
    (value) => () => setModalUpdateNote(value),
    []
  );

  const _loadPage = useCallback(() => {
    const { token } = props.match.params;

    axios.get(`notes/assigned/${token}`).then((res) => {
      setNote(res.data);
    });
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
            history.goBack();
          })
        );
      },
    });
  }, [note]);

  if (note) {
    return (
      <div id="detail-page">
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
              more={<></>}
              content={note.description}
              onEdit={_switchModalUpdate(true)}
              onRemove={_removeNote}
            />
            <Comment
              inputCommentClass="my-input-white mb-16"
              comments={note.comments}
              entityRecordId={note.id}
              type={COMMENT_TYPE.NOTE}
              isEditable={false}
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
              pageType={PAGE_TYPE.SHARED}
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
