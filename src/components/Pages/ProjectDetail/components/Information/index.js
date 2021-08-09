import React, { useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { MyButton, Image, MyModal } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import ModalUpdateProject from '../ModalUpdateProject';
import { updateProject } from 'states/project/actions';
import { useDispatch, useSelector } from 'react-redux';
import { messageAction } from 'utilities/message';
import { showModalConfirm } from 'utilities/modal';
import { selectPartnerInfo } from 'states/partner/selectors';
import { USER_ROLE } from 'constants/common';

const Information = ({ project, onRefreshPage, isEditable = true }) => {
  const dispatch = useDispatch();
  const [modalUpdate, setModalUpdate] = useState(false);

  const partnerInfo = useSelector(selectPartnerInfo());

  const _switchModalUpdate = useCallback(
    (value) => () => setModalUpdate(value),
    []
  );

  const _closeModalUpdate = useCallback(() => {
    setModalUpdate(false);
  }, []);

  const _removeClient = useCallback(() => {
    showModalConfirm({
      title: 'Remove client',
      content: 'Are you sure you want to remove this client?',
      cancelText: 'Cancel',
      okText: 'Remove',
      onOk: () => {
        dispatch(
          updateProject({ ...project, id: project.id, clientId: null }, () => {
            onRefreshPage();
            messageAction.removeClientSuccess();
          })
        );
      },
    });
  }, [project]);

  const info = [
    {
      name: 'Created by',
      value: project.createdBy || '',
    },
    {
      name: 'Start date',
      value: getTimeFormatNormal(project.startDate),
    },
    {
      name: 'End date',
      value: getTimeFormatNormal(project.endDate),
    },
  ];

  return (
    <>
      <div className="info-header">
        <h4 className="title">General Information</h4>
        {isEditable && (
          <MyButton
            id="update-project-btn"
            className="my-btn-no-style btn-edit"
            onClick={_switchModalUpdate(true)}
          >
            Edit
          </MyButton>
        )}
      </div>
      <div className="info-body">
        <p className="info-content mb-16">{project.description}</p>
        {info.map((item) => (
          <Row className="py-16" key={item.name}>
            <Col span={12} className="info-name">
              {item.name}
            </Col>
            <Col span={12} className="info-content text-right">
              {item.value}
            </Col>
          </Row>
        ))}
        {(project.client?.id && (
          <>
            <p className="info-title">Share with</p>
            <div className="user-item">
              <Image src={project.client.logo} className="avatar" />
              <div className="info">
                <span className="name">{project.client.name}</span>
              </div>

              {isEditable && partnerInfo.role !== USER_ROLE.EMPLOYEE && (
                <Icon
                  onClick={_removeClient}
                  component={IconCustom.Trash}
                  className="my-icon-md-dark-gray"
                />
              )}
            </div>
          </>
        )) ||
          null}
      </div>

      <MyModal visible={modalUpdate} onClose={_closeModalUpdate}>
        <ModalUpdateProject
          onClose={_closeModalUpdate}
          project={project}
          onSubmit={onRefreshPage}
        />
      </MyModal>
    </>
  );
};

export default Information;
