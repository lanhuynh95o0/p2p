import React, { useEffect, useMemo, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Popover, Badge } from 'antd';
import { SEARCH_NOTIFY } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotificationPaging,
  countUnreadNotifications,
  markNotificationRead,
  markAllNotificationRead,
  deleteNotification,
  deleteAllNotification,
} from 'states/common/actions';
import {
  selectNotification,
  selectUnreadNotification,
} from 'states/common/selectors';
import InfiniteScroll from 'react-infinite-scroll-component';
import { get } from 'lodash';
import { TYPE_NOTIFY } from './constants';
import * as routePath from 'routers/route-path';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SORT_BY_JOB_ASSIGN } from 'constants/common';
import './styles.scss';

const Notification = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [searchParam, setSearchParam] = useState(SEARCH_NOTIFY);
  const notification = useSelector(selectNotification());
  const unreadNotification = useSelector(selectUnreadNotification());
  const history = useHistory();

  useEffect(() => {
    dispatch(countUnreadNotifications());
  }, []);

  useEffect(() => {
    dispatch(getNotificationPaging(searchParam));
  }, [searchParam]);

  const toggleNotification = () => {
    setVisible((prevState) => !prevState);
  };

  const handleLoadMore = () => {
    if (notification.result.length === notification.total) {
      return;
    }
    setSearchParam((prevState) => {
      prevState.skip += prevState.take;
      return { ...prevState };
    });
  };

  const handleReadNotification = (item) => {
    if (item.unread) {
      dispatch(markNotificationRead(item.id));
    }

    if (item.data) {
      handleRedirectDetail(item);
    }
  };

  const handleReadAllNotification = () => {
    if (!unreadNotification) {
      return;
    }
    dispatch(markAllNotificationRead());
  };

  const handleDeleteAllNotification = () => {
    dispatch(deleteAllNotification());
  };

  const handleRedirectDetail = (item) => {
    setVisible(false);

    let url = '';

    switch (item?.type) {
      case TYPE_NOTIFY.SUBSCRIPTION_LIST: {
        url = routePath.SUBSCRIPTIONS;
        break;
      }
      case TYPE_NOTIFY.INQUIRY_DETAIL: {
        url = routePath.INQUIRY;
        break;
      }
      case TYPE_NOTIFY.JOB_DETAIL: {
        url = routePath.JOB_DETAIL.replace(':id', item?.data.jobId);
        break;
      }
      case TYPE_NOTIFY.JOB_ASSIGNED: {
        url = routePath.JOB_ASSIGNED_DETAIL.replace(':id', item?.data.jobId);

        if ((item?.subject || '').toLowerCase().indexOf('invitation') !== -1) {
          // url =
          //   routePath.JOB_ASSIGNED + '?assignedBy=' + SORT_BY_JOB_ASSIGN[1].id;
          url = routePath.JOB_ASSIGNED;

          // window.location.href = url;

          // return;
        }

        break;
      }
      case TYPE_NOTIFY.CONTRACT_DETAIL: {
        url = routePath.CONTRACT_DETAIL.replace(':id', item?.data.contractId);
        break;
      }
      case TYPE_NOTIFY.PROJECT_DETAIL: {
        url = routePath.PROJECT_DETAIL.replace(':id', item?.data.projectId);
        break;
      }
      case TYPE_NOTIFY.NOTE_DETAIL:
      case TYPE_NOTIFY.NOTE_ASSIGNED: {
        url = routePath.NOTE_DETAIL.replace(':id', item?.data.noteId);
        break;
      }
      case TYPE_NOTIFY.PARTNER_PROFILE: {
        url = routePath.PARTNERS_SETTING;
        break;
      }
      case TYPE_NOTIFY.ADMIN_PARTNER_PROFILE: {
        url = process.env.REACT_APP_NOTIFY_PROFILE_REDIRECT.replace(
          ':id',
          item?.data.partnerId
        );
        break;
      }
      case TYPE_NOTIFY.TASK_DETAIL: {
        url =
          item?.data.type === 'Note'
            ? routePath.NOTE_DETAIL
            : routePath.DOCUMENT_DETAIL;
        url = `${url.replace(':id', item?.data.EntityRecordId)}?taskId=${
          item?.data.taskId
        }`;
        break;
      }
    }
    // console.log('item', item, url);
    url && history.push(url);
  };

  const confirmDeleteNotify = (e, item) => {
    e.stopPropagation();
    dispatch(deleteNotification(item.id));
  };

  const renderNotify = useMemo(() => {
    if (!notification || !notification.result.length) {
      return <div>No data</div>;
    }

    return (
      <InfiniteScroll
        dataLength={(get(notification, 'result') || []).length}
        next={handleLoadMore}
        hasMore={true}
        height={400}
        className="infinite-scroll-notify"
      >
        <div className="header-action">
          <div onClick={handleReadAllNotification} className="read-all">
            {unreadNotification ? 'Read all' : ''}
          </div>
          {/* <div 
            className='delete-all'
            onClick={handleDeleteAllNotification}
          >Delete all</div> */}
        </div>

        {notification?.result.map((item) => (
          <div
            key={item.id}
            className={`notify-item ${item.unread && 'unread'}`}
            onClick={() => handleReadNotification(item)}
          >
            <div className="title">
              <span className="subject">{item.subject}</span>
              {/* <Icon
                component={IconCustom.Trash}
                className="icon-delete"
                onClick={(e) => confirmDeleteNotify(e, item)}
              /> */}
            </div>
            <div className="content">{item.content}</div>
            <div className="date">
              {moment(moment.utc(item.createdTime).toString())
                .format('MM/DD/YYYY hh:mm:ss A')
                .toString()}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    );
  }, [notification, unreadNotification]);

  return (
    <span className="notification-custom">
      <Popover
        content={renderNotify}
        title=""
        trigger="click"
        visible={visible}
        onVisibleChange={toggleNotification}
      >
        {unreadNotification ? (
          <Badge count={unreadNotification}>
            <BellOutlined className="icon-notification" />
          </Badge>
        ) : (
          <BellOutlined className="icon-notification" />
        )}
      </Popover>
    </span>
  );
};

export default React.memo(Notification);
