import React, { useCallback, useState } from 'react';
import { Col, Form, Row, Tag } from 'antd';
import Icon from '@ant-design/icons';
import { MyButton, MyInput } from 'components/Atoms';
import { IconCustom } from 'components/Atoms/Icon';
import './styles.scss';

const InputMultipleEmails = ({
    containerClassName,
    onChange,
    form,
    emails,
    onAdd,
    onRemove,
    onEmailsChange,
    disabled = false,
    label = 'Assignee Email'
}) => {
    emails = emails || [];
    const [emailSingle, setEmailSingle] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const _onRemoveEmail = useCallback((removedEmail) => () => {
        const newEmails = emails.filter(email => email !== removedEmail);
        if (onRemove) onRemove(removedEmail);
        if (onEmailsChange) onEmailsChange(newEmails);
    }, [form, emails]);

    const _onAddEmail = () => {
        if (!emails.includes(emailSingle)) {
            if (onAdd) onAdd(emailSingle);
            if (onEmailsChange) onEmailsChange([...emails, emailSingle]);
        }
    };

    const _onEmailChanged = (event) => {
        console.log(event);
        const emailValue = event.target.value;
        setEmailSingle(emailValue);
        if (onChange) onChange(emailValue);
        setTimeout(() => {
            const validate = form.getFieldError('emailSingle');
            if (validate[0] || !emailValue) {
                setEmailValid(false);
            } else {
                setEmailValid(true);
            }
        }, 100);
    };

    return (
        <div className={`form-item-multiple-emails ${containerClassName || ''}`}>
            <Form.Item
                label={label}
                name="emailSingle"
                className="form-item-custom"
                rules={[
                    { type: 'email', message: 'Please enter the correct format' },
                ]}
            >
                <Row>
                    <Col span={20}>
                        <MyInput disabled={disabled} value={emailSingle} onChange={_onEmailChanged} placeholder="Enter email" />
                    </Col>
                    <Col span={2}>
                        <MyButton
                            disabled={!emailValid}
                            className="btn-secondary-custom mx-10"
                            onClick={_onAddEmail}
                        >
                            <Icon className="my-icon-md" component={IconCustom.Plus} />
                        </MyButton>
                    </Col>
                </Row>
            </Form.Item>
            <br />
            <div className="email-display">
                {emails.length ?
                    <>
                        <span className="email-display__label">Email will be sent to:</span>
                        {emails.map(email => <Tag
                            key={email}
                            closable={!disabled}
                            onClose={_onRemoveEmail(email)}
                            color="geekblue"
                            className="ml-8 my-5"
                        >
                            {email}
                        </Tag>)}
                    </> :
                    <i className="email-display__message">
                        No specified email to display, click <Icon className="icon-sm" component={IconCustom.Plus} /> to add an assignee
                    </i>
                }
            </div>
        </div>
    );
};

export default InputMultipleEmails;