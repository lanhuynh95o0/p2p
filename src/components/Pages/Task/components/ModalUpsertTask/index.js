import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import { Input, InputMultipleEmails, MyButton, SuccessfulScreen } from 'components/Atoms';
import { useDispatch } from 'react-redux';
import { ValidateRequireField } from 'utilities/common';
import moment from 'moment';
import { createTask, updateTask } from 'states/task/actions';
import { TASK_DEFAULT, TASK_TYPE } from 'components/Pages/Task/constant';

const ModalUpsertTask = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [emails, setEmails] = useState([]);
  const [startDate, setStateDate] = useState(moment());
  const today = moment();
  const validateField = useRef(new ValidateRequireField(validateForm));
  const [isSuccess, setIsSuccess] = useState(false);

  const _closeModal = useCallback(() => {
    props.onClose(isSuccess);
  }, [isSuccess]);

  const resetForm = useCallback(() => {
    form.setFieldsValue(TASK_DEFAULT);
  }, []);

  const text = useMemo(() => {
    return props.task
      ? {
        title: 'Update task',
        description: 'Enter the information to update this task',
        button: 'Update task',
        successText: `You have updated this task successfully.`,
        successButtonText: props.successButtonText || 'Close',
        onClickButtonText: _closeModal,
      }
      : {
        title: 'New task',
        description: 'Enter the information to create new task',
        button: 'Create task',
        successText: `You have created new task successfully`,
        successButtonText: 'Add another task',
        onClickButtonText: () => {
          setIsSuccess(false);
          resetForm();
        },
        secondText: props.successButtonText || 'Back',
        onClickSecondText: _closeModal,
      };
  }, [props.type, isSuccess]);

  useEffect(() => {
    resetForm();
  }, []);

  const task = props.task;
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        endDate: moment(task.endDate),
        startDate: moment(task.startDate),
        assigneeEmail: task.assigneeEmail,
      });
      setEmails(task.assigneeEmails);
    }
  }, [task]);

  const onFinish = (values) => {
    const email = emails.join(';');
    form.setFieldsValue({
      assigneeEmail: email
    });
    values.assigneeEmail = email;
    const payload = {
      ...values,
      status: props.task?.status,
      type: props.type,
      jobId: Number(props.jobId || 0),
      entityRecordId: props.entityRecordId,
    };

    const callbackSuccess = () => {
      setIsSuccess(true);
      props.onSubmit();
    };

    if (props.task) {
      return dispatch(
        updateTask({ ...payload, id: props.task.id }, callbackSuccess)
      );
    }
    dispatch(createTask({ ...payload }, callbackSuccess));
  };

  const _onChangeStartDate = useCallback((value) => {
    const endDate = form.getFieldValue('endDate');
    if (value > endDate) {
      form.setFieldsValue({
        endDate: value,
      });
    }
    setStateDate(value);
  }, []);

  const _onEmailsChanged = (emails) => {
    setEmails(emails);
    const email = emails.join(';');
    form.setFieldsValue({
      assigneeEmail: email
    });
  };

  if (isSuccess)
    return (
      <SuccessfulScreen
        description={text.successText}
        buttonPrimaryText={text.successButtonText}
        onClickButtonPrimary={text.onClickButtonText}
        buttonSecondaryText={text.secondText}
        onClickButtonSecondary={text.onClickSecondText}
      />
    );

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="view-content"
    >
      <div className="text-center">
        <h4 className="title">{text.title}</h4>
        <p className="description">{text.description}</p>
      </div>
      <div className="px-8">
        <Form.Item
          name="title"
          label="Title"
          className="form-item-custom"
          rules={validateForm.title}
        >
          <Input
            className="input-custom"
            type="text"
            placeholder="Enter title"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className="form-item-custom"
          rules={validateForm.description}
        >
          <Input
            className="input-custom"
            type="textarea"
            placeholder="Enter description for this task"
          />
        </Form.Item>
        <Row className="m-n8">
          <Col span={12} className="p-8">
            <Form.Item
              name="startDate"
              label="Start date"
              className="form-item-custom"
              rules={validateForm.startDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                onChange={_onChangeStartDate}
                disabledDate={(date) => date.isBefore(today, 'date')}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="p-8">
            <Form.Item
              name="endDate"
              label="End date"
              className="form-item-custom"
              rules={validateForm.endDate}
            >
              <Input
                className="input-custom input-text"
                type="date"
                disabledDate={(date) => date.isBefore(startDate, 'date')}
              />
            </Form.Item>
          </Col>
        </Row>
        <InputMultipleEmails disabled={!!task} form={form} onEmailsChange={_onEmailsChanged} emails={emails} />
        <Form.Item
          label="Email"
          className="form-item-custom"
          name="assigneeEmail"
          hidden={true}
        />
      </div>
      <div className="text-center">
        <Form.Item noStyle shouldUpdate={true}>
          {() => (
            <MyButton
              disabled={validateField.current.check(form)}
              type="primary"
              htmlType="submit"
              className="btn-primary-custom my-16"
            >
              {text.button}
            </MyButton>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default ModalUpsertTask;

ModalUpsertTask.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  jobId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  entityRecordId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  successButtonText: PropTypes.string,
  task: PropTypes.object,
  type: PropTypes.oneOf(Object.values(TASK_TYPE)),
};

ModalUpsertTask.defaultProps = {
  type: TASK_TYPE.NOTE,
  successButtonText: 'Back to note',
  onSubmit: () => { },
};

const validateForm = {
  title: [{ required: true, message: 'Please input the title!' }],
  description: [{ required: true, message: 'Please input the description!' }],
  assigneeEmail: [
    { required: true, message: 'Please input the partner email!' },
  ],
  startDate: [{ required: true, message: 'Please input start date' }],
  endDate: [{ required: true, message: 'Please input end date' }],
};
