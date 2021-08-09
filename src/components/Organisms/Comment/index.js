import React, { useCallback, useState } from 'react';
import 'assets/css/detailPage.scss';
import { CardItem, MyButton, MyInput, MyModal, NoData } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { useDispatch } from 'react-redux';
import { createComment, removeComment } from 'states/comment/actions';
import { Popover } from 'antd';
import ModalUpdateComment from './components/ModalUpdateComment';
import { showModalConfirm } from 'utilities/modal';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import { messageAction } from 'utilities/message';
import PropTypes from 'prop-types';
import ModalUpsertTask from 'components/Pages/Task/components/ModalUpsertTask';
import { TASK_TYPE } from 'constants/task';

const Comment = ({
  onRefreshPage,
  entityRecordId,
  jobId,
  type,
  comments,
  inputCommentClass,
  className,
  isEditable = true,
  disableTask = false,
  isShowHeader,
  isPublic = false,
  disabledAddTask = false,
}) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [commentEdit, setCommentEdit] = useState(null);
  const [commentAddTask, setCommentAddTask] = useState(null);

  const _updateNewComment = useCallback((e) => {
    setNewComment(e.target.value);
  }, []);

  const _updateCommentEdit = useCallback(
    (value) => () => setCommentEdit(value),
    []
  );

  const _updateCommentAddTask = useCallback(
    (value) => () => setCommentAddTask(value),
    []
  );

  const _removeComment = useCallback(
    (item) => () => {
      showModalConfirm({
        title: 'Archive comment',
        content: 'Are you sure to archive this comment?',
        cancelText: 'Cancel',
        okText: 'Archive',
        onOk: () => {
          dispatch(
            removeComment(item.id, () => {
              messageAction.removeCommentSuccess(item);
              onRefreshPage();
            })
          );
        },
      });
    },
    []
  );

  const _postComment = useCallback(() => {
    const content = newComment.trim();
    if (entityRecordId && content && type)
      dispatch(
        createComment(
          {
            type,
            entityRecordId,
            content,
            isPublic,
          },
          () => {
            setNewComment('');
            onRefreshPage();
            messageAction.createCommentSuccess({ content, type });
          }
        )
      );
  }, [newComment, entityRecordId, type, isPublic]);

  return (
    <div className={`comment-page ${className || ''}`}>
      {isShowHeader && (
        <div className="info-header">
          <h4 className="title">Comment ({comments?.length || 0})</h4>
        </div>
      )}
      {isEditable && (
        <MyInput
          placeholder="Post a comment"
          className={inputCommentClass || 'input-custom'}
          value={newComment}
          onChange={_updateNewComment}
          suffix={
            <Icon
              onClick={_postComment}
              component={IconCustom.Send}
              className="my-input-suffix-icon"
            />
          }
        />
      )}
      <div className="max-h-400 scroll-y">
        {(comments?.length &&
          comments.map((item) => (
            <CardItem
              key={item.id}
              className="mb-8"
              id={item.id}
              logo={item.partner?.logo || ''}
              name={item.partner?.name || 'Assignee'}
              // name={item.partner?.name || item.assigneeEmail}
              time={item.lastUpdatedTime}
              isEdit={item.createdTime !== item.lastUpdatedTime}
              content={item.content}
              more={
                isEditable &&
                  (item.isOwn || (!disableTask && !disabledAddTask)) ? (
                  <Popover
                    placement="bottomRight"
                    content={
                      <div className="my-popover-container">
                        {!disableTask && !disabledAddTask && (
                          <MyButton
                            className="my-btn-no-style my-popover-item"
                            onClick={_updateCommentAddTask(item)}
                          >
                            <Icon
                              component={IconCustom.Plus}
                              className="my-icon-md"
                            />
                            Add task
                          </MyButton>
                        )}
                        {item.isOwn && (
                          <>
                            <MyButton
                              className="my-btn-no-style my-popover-item"
                              onClick={_updateCommentEdit(item)}
                            >
                              <Icon
                                component={IconCustom.Edit}
                                className="my-icon-md"
                              />
                              Edit comment
                            </MyButton>
                            <MyButton
                              className="my-btn-no-style my-popover-item"
                              onClick={_removeComment(item)}
                            >
                              <Icon
                                component={IconCustom.Trash}
                                className="my-icon-md"
                              />
                              Archive comment
                            </MyButton>
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
                ) : (
                  <></>
                )
              }
            />
          ))) || <NoData description={COMMON_NODATA_TEXT.COMMENT} />}
      </div>

      <MyModal visible={!!commentEdit} onClose={_updateCommentEdit(null)}>
        <ModalUpdateComment
          comment={commentEdit}
          onClose={_updateCommentEdit(null)}
          onSubmit={onRefreshPage}
        />
      </MyModal>
      <MyModal visible={!!commentAddTask} onClose={_updateCommentAddTask(null)}>
        <ModalUpsertTask
          onClose={_updateCommentAddTask(null)}
          entityRecordId={entityRecordId}
          successButtonText="Close"
          jobId={jobId}
          type={type}
          onSubmit={onRefreshPage}
        />
      </MyModal>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  entityRecordId: PropTypes.number,
  jobId: PropTypes.number,
  type: PropTypes.string,
  comments: PropTypes.array,
  onRefreshPage: PropTypes.func,
  isShowHeader: PropTypes.bool,
};

Comment.defaultProps = {
  isShowHeader: true,
};
