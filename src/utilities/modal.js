import React from 'react';
import { Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';

const { confirm, error } = Modal;

export const showModalConfirm = ({
  title,
  content,
  icon,
  okText,
  okType,
  cancelText,
  onOk,
  onCancel,
  closable = true,
}) => {
  confirm({
    title: title || '',
    icon: icon || <ExclamationCircleOutlined />,
    content: content || '',
    okText: okText || 'Yes',
    okType: okType || 'danger',
    cancelText: cancelText || 'No',
    closable,
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};

export const showModalError = ({
  title,
  content,
  icon,
  okText,
  okType,
  onOk,
  onCancel,
  centered = true,
}) => {
  error({
    title: title || '',
    icon: icon || <CloseCircleFilled style={{ color: '#FF5A5B' }} />,
    content: content || '',
    okText: okText || 'OK',
    okType: okType || 'primary',
    okButtonProps: {
      style: {
        width: '82px',
        height: '32px',
        borderRadius: '4px',
        borderColor: '#FFA39E',
        backgroundColor: '#FFF1F0',
        color: '#FF4D4F',
      },
    },
    centered,
    onOk(close) {
      onOk && onOk();
      close();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};

export const showModalNoticeInviteContractor = (data) => {
  if (typeof data?.contractorExistSystem !== 'undefined') {
    showModalError({
      icon: '',
      okText: 'Close',
      title: 'Notice',
      content: data?.contractorExistSystem ? (
        <div>
          The invitation has been sent to the Contractor’s email.
          In case the email has been captured by the recipients spam folder,
          we suggest calling the <a href='#'>{data.name}</a> on
          <a href={`tel:${data.phoneCode}${data.phone}`}>
            &nbsp;{data.phoneCode?.includes('+') ? data.phoneCode : `+${data.phoneCode}`}{data.phone}&nbsp;
          </a>
          to discuss the details of the Job.
        </div>
      ) : (
        `The invitation has been sent to the Contractor’s email.
        In case the email has been captured by the recipients spam folder,
        please try to contact Contractor via another channel to get phone to discuss the details of the Job.`
      ),
    });
  }
};
