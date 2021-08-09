import React, { useCallback, useEffect, useState } from 'react';
import { Input, MyButton, SuccessfulScreen,MyModal } from 'components/Atoms';
import { useDispatch } from 'react-redux';
import { updateJobDuration } from 'states/job/actions';
import { Col, Form, Row } from 'antd';
import moment from 'moment';
import ModalSendInvitation from 'components/Pages/JobDetail/components/ModalSendInvitation';
import { setHoursForDate } from 'utilities/time';

const ModalUpdateJobDuration = ({
  job,
  onSubmit,
  onClose,
  minDate,
  maxDate,
  projectId,
  principal,
  onRefreshPage
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [startDate, setStateDate] = useState(moment());
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showInviteContractor, setShowInviteContractor] = useState(false);

  useEffect(() => {
    const startDate = setHoursForDate(job.startDate);
    const endDate = setHoursForDate(job.endDate, '23:59:59');
    form.setFieldsValue({
      ...job,
      startDate,
      endDate,
    });
    setStateDate(startDate);
  }, []);

  const _updateJob = useCallback(
    (values) => {
      dispatch(
        updateJobDuration(
          {
            id: job.id,
            projectId,
            ...values,
          },
          () => {
            setIsSuccessful(true);
            onSubmit && onSubmit(values);
          }
        )
      );
    },
    [job, projectId]
  );
  const _handleDisableStartTime = (date) =>
    date.isBefore(minDate, 'date') || date.isAfter(maxDate, 'date');

  const _handleDisableEndTime = (date) =>
    date.isBefore(startDate, 'date') || date.isAfter(maxDate, 'date');

  const _onChangeStartDate = useCallback((value) => {
    const endDate = form.getFieldValue('endDate');
    if (value > endDate) {
      form.setFieldsValue({
        endDate: value,
      });
    }
    setStateDate(value);
  }, []);

  if (isSuccessful) {
    return (
      <div className="view-center">
        <SuccessfulScreen
          description="You have updated this job. Back to job"
          buttonPrimaryText="Back to job"
          onClickButtonPrimary={onClose}
        />
      </div>
    );
  }

  const toggleInviteContractor = () => {
    setShowInviteContractor(!showInviteContractor);
  };

  return (
    <div className="view-content">
      <Form form={form} onFinish={_updateJob} layout="vertical">
        <div className="text-center">
          <h4 className="title">Update job</h4>
          <p className="description">
            Enter the start date and end date of this job
          </p>
        </div>

        <Form.Item
          name="name"
          label="Name of job"
          className="mb-0 form-item-custom p-8 ant-form-item-required"
          required={false}
        >
          <Input placeholder="Enter name of job" disabled />
        </Form.Item>

        <Row>
          <Col span={12} className="p-8">
            <Form.Item
              name="startDate"
              label="Start date"
              className="mb-0 form-item-custom ant-form-item-required"
              required={false}
            >
              <Input
                className="input-custom input-text"
                type="date"
                onChange={_onChangeStartDate}
                disabledDate={_handleDisableStartTime}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="p-8">
            <Form.Item
              name="endDate"
              label="End date"
              className="mb-0 form-item-custom ant-form-item-required"
              required={false}
            >
              <Input
                className="input-custom input-text"
                type="date"
                disabledDate={_handleDisableEndTime}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12} className='p-8'>
            <div className='mb-10'><b>Contractor details</b></div>
            <MyModal
              visible={showInviteContractor}
              onClose={toggleInviteContractor}
            >
              <ModalSendInvitation
                onClose={toggleInviteContractor}
                onSubmit={onRefreshPage}
                jobId={job?.id}
              />
            </MyModal>

            {!job?.participantPartner && (
              <MyButton
                onClick={toggleInviteContractor}
                className="btn-primary-custom"
              >
                Invite contractor
              </MyButton>
            )}
            {job?.participantPartner && (
              <>
                <Form.Item
                  label="Name"
                >
                  <Input value={job?.participantPartner?.name} disabled />
                </Form.Item>

                <Form.Item
                  label="Email"
                >
                  <Input value={job?.participantPartner?.email} disabled />
                </Form.Item>

                <Form.Item
                  label="Address"
                >
                  <Input value={job?.participantPartner?.address} disabled />
                </Form.Item>
              </>
            )}
          </Col>

          <Col span={12} className='p-8'>
            <div className='mb-10'><b>Principals details</b></div>

            <Form.Item
              label="Name"
            >
              <Input value={principal?.name} disabled />
            </Form.Item>

            <Form.Item
              label="Email"
            >
              <Input value={principal?.email} disabled />
            </Form.Item>

            <Form.Item
              label="Address"
            >
              <Input value={principal?.address} disabled />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-center">
          <Form.Item noStyle>
            <MyButton
              type="primary"
              htmlType="submit"
              className="btn-primary-custom my-16"
            >
              Update
            </MyButton>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ModalUpdateJobDuration;
