import React, { useState, useEffect } from 'react';
import { MyStep } from 'components/Atoms';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { getPhoneNumber } from 'utilities/common';
import { Form } from 'antd';

const ClientRelationshipForm = ({ onSave, onEdit, initClient, isEdit, step }) => {
  const [currentStep, setCurrentStep] = useState(step ?? 1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [form] = Form.useForm();

  const [dataSubmit, setDataSubmit] = useState({});

  useEffect(() => {
    if (initClient) {
      const initData = { ...dataSubmit, ...initClient };
      initData.contacts = initData.contacts?.map(contact => {
        return { ...contact };
      });
      setDataSubmit(initData);
    }
  }, [initClient]);

  const onGoBackStep = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  const onGoNextStep = (nextStep) => {
    setFinishedStep(nextStep);
    setCurrentStep(nextStep);
  };

  const onSwitchStep = (tab) => {
    tab !== currentStep && setCurrentStep(tab);
  };

  const updateDataSubmit = (values) => {
    setDataSubmit({ ...dataSubmit, ...values });
  };

  const handleSubmitClient = (data) => {
    if (!isEdit) {
      const body = {
        ...dataSubmit,
        logoUrl: data?.logoSlug || '',
        phone: dataSubmit.phone,
        phoneCode: dataSubmit.phoneCode,
        phoneNumber: dataSubmit.phone,
      };
      onSave(body);
    } else {
      const body = {
        ...dataSubmit,
        logoUrl: data?.logoSlug || '',
        phone: dataSubmit.phone,
        phoneCode: dataSubmit.phoneCode,
        phoneNumber: dataSubmit.phone,
      };
      delete body.email;
      delete body.invitationCode;
      onEdit(body);
    }
  };

  return (
    <>
      <MyStep
        currentStep={currentStep}
        finishedStep={finishedStep}
        headers={STEP_ADD_CLIENT}
        onSwitchTab={onSwitchStep}
      />
      <div className="mt-30 view-center">
        <div className="form">
          {currentStep === 1 && (
            <Step1
              dataSubmit={dataSubmit}
              onContinue={(values) => {
                updateDataSubmit(values);
                onGoNextStep(2);
              }}
              isEdit={isEdit}
              form={form}
            />
          )}
          {currentStep === 2 && (
            <Step2
              dataSubmit={dataSubmit}
              onGoBack={onGoBackStep}
              onContinue={(values) => {
                updateDataSubmit(values);
                onGoNextStep(3);
              }}
              isEdit={isEdit}
              form={form}
            />
          )}
          {currentStep === 3 && (
            <Step3
              dataSubmit={dataSubmit}
              onGoBack={onGoBackStep}
              onContinue={(values) => {
                updateDataSubmit(values);
                onGoNextStep(4);
              }}
              isEdit={isEdit}
              originalForm={form}
            />
          )}
          {currentStep === 4 && (
            <Step4
              onGoBack={onGoBackStep}
              onContinue={handleSubmitClient}
              isEdit={isEdit}
              dataSubmit={dataSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ClientRelationshipForm;

const STEP_ADD_CLIENT = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
  { name: 'Tab 3', step: 3 },
  { name: 'Tab 4', step: 4 },
];
