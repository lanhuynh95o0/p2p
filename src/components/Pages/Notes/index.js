import React, { useCallback, useState } from 'react';
import './styles.scss';
import { MyButton, MyModal, CardItem, NoData } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import ModalUpsertNote from './components/ModalUpsertNote';
import { showModalConfirm } from 'utilities/modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote } from 'states/note/actions';
import { useHistory } from 'react-router-dom';
import {
  CLIENT_NOTE_SHARED,
  NOTE_ASSIGN_DETAIL,
  NOTE_DETAIL,
} from 'routers/route-path';
import { NOTE_CONFIRM_REMOVE } from './constant';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { messageAction } from 'utilities/message';
import ModalUpsertTask from 'components/Pages/Task/components/ModalUpsertTask';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { PAGE_TYPE } from 'constants/common';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';

const Notes = ({
  job,
  onRefreshPage,
  pageType = PAGE_TYPE.OWN,
  isEditable = true,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: jobId } = useParams();
  const [noteDetail, setNoteDetail] = useState({ id: '' });
  const [newNoteVisible, setNewNoteVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);

  const partnerInfo = useSelector(selectPartnerInfo());

  const _switchModal = useCallback(
    (value) => () => setNewNoteVisible(value),
    []
  );

  const _viewDetail = useCallback(
    (item) => () => {
      const path =
        pageType === PAGE_TYPE.ASSIGNED
          ? NOTE_ASSIGN_DETAIL
          : CLIENT_NOTE_SHARED;
      history.push(path.replace(':id', item.id));
    },
    []
  );

  const _edit = useCallback(
    (item) => () => history.push(NOTE_DETAIL.replace(':id', item.id)),
    []
  );

  const _delete = useCallback(
    (item) => () => {
      const { MESSAGE, TITLE } = NOTE_CONFIRM_REMOVE;
      showModalConfirm({
        title: TITLE,
        content: MESSAGE,
        cancelText: 'Cancel',
        okText: 'Archive',
        onOk: () => {
          dispatch(
            removeNote(item.id, () => {
              messageAction.removeNoteSuccess(item);
              onRefreshPage();
            })
          );
        },
      });
    },
    []
  );

  const _switchModalCreate = useCallback(
    (value, note) => () => {
      setModalCreateVisible(value);
      setNoteDetail(note);
    },
    []
  );

  const _renderItem = useCallback((note) => {
    const extra = [
      {
        icon: IconCustom.Clipboard,
        value: note.taskCount || 0,
        text: 'task',
      },
      {
        icon: IconCustom.Message,
        value: note.commentCount || 0,
        text: 'comment',
      },
    ];

    return (
      <CardItem
        key={note.id}
        id={note.id}
        name={note.partner?.name || ''}
        title={note.title}
        content={note.description}
        logo={note.partner?.logo}
        time={note.lastUpdatedTime}
        isEdit={note.lastUpdatedTime !== note.createdTime}
        onClick={_edit(note)}
        more={
          <Popover
            placement="topRight"
            content={
              <div className="my-popover-container">
                {pageType === PAGE_TYPE.OWN && isEditable ? (
                  <>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={_edit(note)}
                    >
                      <Icon
                        component={IconCustom.Lock}
                        className="my-icon-md"
                      />
                      Edit
                    </MyButton>
                    {isNotEmployee(partnerInfo) && (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_delete(note)}
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
                      onClick={_switchModalCreate(true, note)}
                    >
                      <Icon
                        component={IconCustom.Clipboard}
                        className="my-icon-md"
                      />
                      Add new task
                    </MyButton>
                  </>
                ) : (
                  <>
                    <MyButton
                      className="my-btn-no-style my-popover-item"
                      onClick={_viewDetail(note)}
                    >
                      <Icon
                        component={IconCustom.EyeOpen}
                        className="my-icon-md"
                      />
                      View Detail
                    </MyButton>
                    {note.isCanDeleted && isNotEmployee(partnerInfo) && (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_delete(note)}
                      >
                        <Icon
                          component={IconCustom.Trash}
                          className="my-icon-md"
                        />
                        Archive
                      </MyButton>
                    )}
                    {pageType !== PAGE_TYPE.SHARED && (
                      <MyButton
                        className="my-btn-no-style my-popover-item"
                        onClick={_switchModalCreate(true, note)}
                      >
                        <Icon
                          component={IconCustom.Clipboard}
                          className="my-icon-md"
                        />
                        Add new task
                      </MyButton>
                    )}
                  </>
                )}
              </div>
            }
            trigger="focus"
          >
            <MyButton className="my-btn-no-style">
              <Icon
                component={IconCustom.MoreHorizontal}
                className="my-icon-md-dark-gray"
              />
            </MyButton>
          </Popover>
        }
        footer={
          <>
            {(note.taskCount > 0 || note.commentCount > 0) && (
              <div className="note-footer">
                {extra.map((item) => (
                  <span key={item.text} className="note-footer-block">
                    <Icon component={item.icon} className="icon" />
                    <span className="note-label">
                      {item.value}
                      {` ${item.text}${item.value === 1 ? '' : 's'}`}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </>
        }
      />
    );
  }, []);

  return (
    <>
      <div className="info-header pb-8 pt-8 pt-md-0">
        <h4 className="title">Notes</h4>
        {isEditable && (
          <MyButton className="btn-primary-custom" onClick={_switchModal(true)}>
            New note
          </MyButton>
        )}
      </div>
      {(job.notes?.length && <>{job.notes.map(_renderItem)}</>) || (
        <NoData description={COMMON_NODATA_TEXT.NOTE} />
      )}

      <MyModal
        className="modal-upsert-note my-modal"
        visible={newNoteVisible}
        onClose={_switchModal(false)}
      >
        <ModalUpsertNote
          onClose={_switchModal(false)}
          jobId={job.id}
          onSubmit={onRefreshPage}
        />
      </MyModal>

      <MyModal visible={modalCreateVisible} onClose={_switchModalCreate(false)}>
        <ModalUpsertTask
          onClose={_switchModalCreate(false)}
          jobId={jobId}
          entityRecordId={noteDetail?.id}
          successButtonText="Back"
          onSubmit={onRefreshPage}
        />
      </MyModal>
    </>
  );
};

export default Notes;

Notes.propTypes = {
  notePath: PropTypes.string,
};

Notes.defaultProps = {
  notePath: NOTE_DETAIL,
};
