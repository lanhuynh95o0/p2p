import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { checkFormAntInvalid } from 'utilities/common';
import { MyRadio, MyButton } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { getEmailHide } from 'utilities/common';

const ForgotStep2 = ({
  onContinue,
  onGoBack,
  values,
  readOnlyStep
}) => {
  const [form] = Form.useForm();
  const [optionsVerify, setOptionVerify] = useState([]);

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue({
        type: 'Email'
      });
      return;
    }
    form.setFieldsValue({
      type: values.type ? values.type : 'Email'
    });

    setOptionVerify([
      {
        title: 'Via email',
        subTitle: `We will send verification code to your email address ${getEmailHide(values.email)}`,
        value: 'Email'
      },
      {
        title: 'Via phone',
        subTitle: `We will send verification code to your phone number •••••${values.phone}`,
        value: 'Phone'
      }
    ])
  }, []);


  const onFinish = values => {
    onContinue(values);
  };

  return (
    <>
      <div className='header-step'>
        How you want to verify your account?
      </div>
      <div className='sub-header'>
        Select one of verification method below
      </div>
      <Form
        form={form}
        className='mt-20'
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="type">
          <MyRadio
            disabled={readOnlyStep}
            options={optionsVerify}
            name='type'
          />
        </Form.Item>
        <Form.Item
          shouldUpdate
          className='t-center mt-10'
        >{() => (
          <>
            <MyButton
              size="large"
              className='btn-outline-custom mr-10'
              onClick={onGoBack}
            >
              Back
            </MyButton>
            {!readOnlyStep && (
              <MyButton
                htmlType='submit'
                size="large"
                className='btn-primary-custom'
                disabled={checkFormAntInvalid(form)}
              >
                Continue
              </MyButton>
            )}
          </>
        )}

        </Form.Item>
      </Form>
    </>
  )
};

export default ForgotStep2;
