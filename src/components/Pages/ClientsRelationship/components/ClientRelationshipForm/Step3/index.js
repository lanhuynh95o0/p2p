import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { MyInput, MyButton, MyPhoneInput } from 'components/Atoms';
import { Col, Form, Row } from 'antd';
import { checkFormAntInvalid, debounced } from 'utilities/common';
import { isEmpty } from 'lodash';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { get } from 'immutable';

const Step3 = ({
  onGoBack,
  onContinue,
  dataSubmit,
  isEdit,
  originalForm,
}) => {
  dataSubmit.contacts = dataSubmit.contacts ?? [];
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [validatingName, setValidatingName] = useState(false);
  let [editingContact, setEditingContact] = useReducer((contact, updatedContact) => updatedContact, null);
  const [form] = Form.useForm();
  let action = null;

  const setEditingContactValues = (updatedContact) => {
    setEditingContact(updatedContact);
    if (updatedContact)
      form.setFieldsValue(updatedContact);
    else form.resetFields();
  }

  const onCheckValidateName = useCallback(
    (value) => {
      debounced(() => {
        if (!value.trim()) {
          setValidatingName(false);
          return;
        }
        setValidatingName(true);
      });
    },
    [dataSubmit]
  );

  const onAddContact = (values) => {
    setValidatingName(false);
    setEditingContactValues(null);
    const newContact = values;
    newContact.contactName = newContact.contactName.trim();
    newContact.phoneNumber = newContact.phone;
    dataSubmit.contacts.push(newContact);
    forceUpdate();
  };

  const onRemoveContact = (contact) => {
    if (!dataSubmit.contacts) return;
    if (contact == editingContact) setEditingContactValues(null);
    const idx = dataSubmit.contacts.indexOf(contact);
    dataSubmit.contacts.splice(idx, 1);
    forceUpdate();
  };

  const onEditContact = (contact) => {
    setEditingContactValues(contact);
    onCheckValidateName(contact.contactName);
  };

  const onEditContactSave = (values) => {
    if (!dataSubmit.contacts) return;
    const idx = dataSubmit.contacts.indexOf(editingContact);
    editingContact = { ...editingContact, ...values };
    editingContact.phoneNumber = editingContact.phone;
    dataSubmit.contacts[idx] = editingContact;
    setEditingContactValues(null);
  }

  const onFinish = (values) => {
    const { contactName } = values;
    if (action === 'update') {
      if (contactName !== editingContact.contactName && dataSubmit.contacts.some(c => c.contactName == contactName)) {
        setValidatingName(false);
        form.setFields([
          {
            name: 'contactName',
            errors: ['The contact name already exists'],
          },
        ]);
        return;
      }
      onEditContactSave(values);
    } else {
      if (dataSubmit.contacts.some(c => c.contactName == contactName)) {
        setValidatingName(false);
        form.setFields([
          {
            name: 'contactName',
            errors: ['The contact name already exists'],
          },
        ]);
        return;
      }
      onAddContact(values);
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="title">Site contact</div>
        <div className="description">
          Add key contact person information to contact later
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="form-step-1"
        onFinish={onFinish}
        initialValues={{
          email: '',
        }}
      >
        <Form.Item
          className="form-item-custom"
        >
          <MyButton
            onClick={() => {
              action = 'add';
              form.submit();
            }}
            disabled={
              !validatingName ||
              checkFormAntInvalid(
                form,
                requiredFields
              )
            }
            size="medium"
            className="btn-outline-custom"
            style={{ float: 'right' }}
          >
            Add contact
          </MyButton>

          {editingContact && <MyButton
            onClick={() => {
              action = 'update';
              form.submit();
            }}
            disabled={
              !validatingName ||
              checkFormAntInvalid(
                form,
                requiredFields
              )
            }
            size="medium"
            className="btn-outline-custom mr-10"
            style={{ float: 'right' }}
          >
            Update contact
          </MyButton>}
        </Form.Item>
        <Form.Item
          label="Full name"
          name="contactName"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <MyInput
            placeholder="Enter full name"
            onChange={(e) => onCheckValidateName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Phone number"
          className="form-item-custom phone-validate"
          name="phone"
          rules={[{
            pattern: "^[+0789][0-9]{8,15}$", message: "Invalid phone format"
          }]}
        >
          <MyInput
            name="phone"
            onChange={async (event) => {
              const value = event.target.value.replace(/[^+0-9]/g, "");
              await form.setFieldsValue({
                phone: value
              });
            }}
            value={editingContact?.phoneNumber}
          />
        </Form.Item>

        <Form.Item
          label="Phone data"
          className="form-item-custom phone-validate"
          name="phoneCode"
          hidden={true}
        />

        <Form.Item
          label="Email"
          name="email"
          className="form-item-custom"
          rules={[
            { type: 'email', message: 'Please enter the correct format' },
          ]}
        >
          <MyInput placeholder="Enter email" />
        </Form.Item>

        <hr className="my-25" />

        <div className="container" id="my-grid-list">
          {dataSubmit.contacts?.map((contact, idx) =>
            <ContactRow
              onEdit={onEditContact}
              onRemove={onRemoveContact}
              key={idx + ''} model={contact}>
            </ContactRow>)}
        </div>

        <Form.Item className="t-center mt-20" shouldUpdate={true}>
          {() => (
            <>
              <MyButton
                onClick={onGoBack}
                size="large"
                className="btn-outline-custom mr-10"
              >
                Back
              </MyButton>
              <MyButton
                onClick={() => onContinue(originalForm.getFieldValue())}
                size="large"
                className="btn-primary-custom"
              >
                Continue
              </MyButton>
            </>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default Step3;

const requiredFields = ['contactName'];

const ContactRow = ({ model, onRemove, onEdit }) => {
  return (
    <Row className="my-25">
      <Col span={20}>
        <span className="text-md break-word font-weight-bold">{model.contactName}</span>
        <br />
        <span className="text-md break-word text-link">
          {model.phone ?? ''}
        </span>
        <br />
        <span className="text-md break-word text-link">
          {model.email}
        </span>
      </Col>
      <Col span={4} className="text-right">
        <MyButton
          size="medium"
          className="btn-outline-custom my-1"
          style={{ width: '100%' }}
          onClick={() => onEdit(model)}
        >
          Edit
        </MyButton>
        <MyButton
          size="medium"
          className="btn-outline-custom my-1 text-danger"
          style={{ width: '100%' }}
          onClick={() => onRemove(model)}
        >
          Remove
        </MyButton>
      </Col>
    </Row>
  );
};