import React from 'react';
import './styles.scss';
import { Modal } from 'antd';

const MyModal = (props) => {
  return (
    <Modal
      centered
      visible={props.visible}
      className={`my-modal ${props.classNameModal}`}
      width={'90%'}
      closable={true}
      footer={null}
      destroyOnClose
      onCancel={props.onClose}
      {...props}
    >
      <div className="my-modal-wrapper">
        <div className="my-modal-body">{props.children}</div>
      </div>
    </Modal>
  );
};

export default MyModal;
