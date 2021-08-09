import React, { useCallback, useEffect, useState } from 'react';
import { MyButton, MyInput, MyPhoneInput } from 'components/Atoms';
import { Form } from 'antd';
import { checkFormAntInvalid, debounced } from 'utilities/common';
import { get, isEmpty } from 'lodash';
import useActions from 'hooks/useActions';
import { checkClientName } from 'states/client/actions';

const Step1 = ({ onContinue, dataSubmit, isEdit, form }) => {
  const [validatingName, setValidatingName] = useState(false);
  const [checkClientNameAction] = useActions([checkClientName]);

  useEffect(() => {
    if (isEmpty(dataSubmit)) {
      return;
    }
    form.setFieldsValue({
      name: dataSubmit.name,
      legalCompanyName: dataSubmit.legalCompanyName,
      abn: dataSubmit.abn,
      phone: dataSubmit.phone,
      phoneCode: dataSubmit.phoneCode,
      email: dataSubmit.email,
    });
  }, [dataSubmit]);

  const onFinish = (values) => {
    onContinue(values);
  };

  const onCheckValidateName = useCallback(
    (value) => {
      debounced(() => {
        if (!value.trim()) {
          setValidatingName(false);
          return;
        }
        setValidatingName(true);
        checkClientNameAction(
          {
            id: dataSubmit?.id || '',
            name: value.trim(),
          },
          () => {
            setValidatingName(false);
          },
          (e) => {
            setValidatingName(false);
            form.setFields([
              {
                name: 'name',
                errors: [e?.message || 'The company name has already existed'],
              },
            ]);
          }
        );
      });
    },
    [dataSubmit]
  );

  return (
    <>
      <div className="text-center">
        <div className="title">{isEdit ? 'Update' : 'New'} client</div>
        <div className="description">
          Enter information to {isEdit ? 'update the' : 'create new'} client
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="form-step-1"
        onFinish={onFinish}
        initialValues={{
          phone: `${get(dataSubmit, 'phone', '')}`,
          email: '',
        }}
      >
        <Form.Item
          label="Company name"
          name="name"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter company name' }]}
        >
          <MyInput
            placeholder="Enter company name"
            onChange={(e) => onCheckValidateName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Legal company name"
          name="legalCompanyName"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter a legal company name' }]}
        >
          <MyInput
            placeholder="Enter legal company name"
          />
        </Form.Item>

        <Form.Item
          label="ABN"
          name="abn"
          className="form-item-custom"
          rules={[{ pattern: "^[0-9]{11}$", message: 'ABN must be a valid 11 digits string' }]}
        >
          <MyInput
            maxLength="11"
            placeholder="Enter a valid ABN"
            type="text"
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
            value={dataSubmit.phone}
          />
        </Form.Item>
        <Form.Item
          label="Phone data"
          className="form-item-custom phone-validate"
          name="phoneCode"
          value=""
          hidden={true}
        />

        <Form.Item
          label="Email"
          name="email"
          className="form-item-custom"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter the correct format' },
          ]}
        >
          <MyInput placeholder="Enter email" disabled={isEdit} />
        </Form.Item>

        <Form.Item className="t-center mt-20" shouldUpdate={true}>
          {() => (
            <>
              <MyButton
                htmlType="submit"
                size="large"
                className="btn-primary-custom"
                disabled={
                  validatingName ||
                  checkFormAntInvalid(
                    form,
                    isEdit ? requiredFieldsEdit : requiredFields
                  )
                }
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

export default Step1;

const requiredFields = ['name', 'email'];

const requiredFieldsEdit = ['name', 'email'];
