import React, { useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { CategoryItem, Image, MyButton, MyModal } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import ModalUpdateJob from '../ModalUpdateJob';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import ModalSendInvitation from '../ModalSendInvitation';
import { removeParticipantJob } from 'states/job/actions';
import { useDispatch, useSelector } from 'react-redux';
import { showModalConfirm } from 'utilities/modal';
import { messageAction } from 'utilities/message';
import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import { separateCost } from 'utilities/stringHelper';
import { selectPartnerInfo } from 'states/partner/selectors';
import { isNotEmployee } from 'utilities/common';

const Information = ({ job, onRefreshPage, projectId, isEditable = true }) => {
  const dispatch = useDispatch();
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInvitation, setModalInvitation] = useState(false);

  const partnerInfo = useSelector(selectPartnerInfo());

  const _switchModalUpdate = useCallback(
    (value) => () => setModalUpdate(value),
    []
  );

  const _switchModalInvitation = useCallback(
    (value) => () => setModalInvitation(value),
    []
  );

  const _closeModalUpdate = useCallback((isSuccess) => {
    setModalUpdate(false);
    if (isSuccess === true) {
      onRefreshPage();
    }
  }, []);

  const _removeParticipant = useCallback(() => {
    showModalConfirm({
      title: 'Remove contractor',
      content: 'Are you sure you want to remove this contractor?',
      cancelText: 'Cancel',
      okText: 'Remove',
      onOk: () => {
        dispatch(
          removeParticipantJob(job.id, () => {
            messageAction.removeParticipant(job);
            onRefreshPage();
          })
        );
      },
    });
  }, []);

  const info = [
    {
      name: 'Created by',
      value: job.createdBy || '',
    },
    {
      name: 'Start date',
      value: getTimeFormatNormal(job.startDate),
    },
    {
      name: 'End date',
      value: getTimeFormatNormal(job.endDate),
    },
    {
      name: 'Cost',
      value: `${separateCost(job.estimateCost) || ''} ${job.currency || ''}`,
    },
  ];

  return (
    <>
      <div className="info-header">
        <h4 className="title">General Information</h4>
        {isEditable && (
          <MyButton
            className="my-btn-no-style btn-edit"
            onClick={_switchModalUpdate(true)}
          >
            Edit
          </MyButton>
        )}
      </div>
      <div className="info-body">
        <p className="info-content mb-16">{job.description}</p>
        {info.map((item) => (
          <Row className="py-8" key={item.name}>
            <Col span={12} className="info-name">
              {item.name}
            </Col>
            <Col span={12} className="info-content text-right">
              {item.value}
            </Col>
          </Row>
        ))}
        <p className="info-title">Skill requirements</p>
        {(job?.skills || []).map((skill) => (
          <CategoryItem
            key={skill.name}
            id={skill.name}
            name={skill.name}
            category={skill.categoryName}
            isCheck={true}
          />
        ))}

        <p className="info-title">Contractor</p>
        {(job.participantPartner && (
          <div className="user-item">
            <Image src={job.participantPartner.logo} className="avatar" />
            <div className="info">
              <p className="name m-0 text-1-line">
                {job.participantPartner.name}
              </p>
              {(job.participantPartner.status && (
                <span
                  className={`text-extra ${
                    CONTRACT_STATUS_CLASS[job.participantPartner.status].class
                  }`}
                >
                  {job.participantPartner.status}
                </span>
              )) ||
                null}
            </div>
            {job.contractFiles?.length === 0 && isNotEmployee(partnerInfo) && (
              <Icon
                onClick={_removeParticipant}
                component={IconCustom.Close}
                className="my-icon-md-dark-gray"
              />
            )}
          </div>
        )) ||
          (isEditable && (
            <MyButton
              onClick={_switchModalInvitation(true)}
              className="btn-primary-custom"
            >
              Invite contractor
            </MyButton>
          ))}
      </div>

      <MyModal visible={modalUpdate} onClose={_closeModalUpdate}>
        <ModalUpdateJob
          job={job}
          onClose={_closeModalUpdate}
          onSubmit={onRefreshPage}
        />
      </MyModal>

      <MyModal
        visible={modalInvitation}
        onClose={_switchModalInvitation(false)}
      >
        <ModalSendInvitation
          onClose={_switchModalInvitation(false)}
          onSubmit={onRefreshPage}
          jobId={job?.id}
        />
      </MyModal>
    </>
  );
};

export default Information;
