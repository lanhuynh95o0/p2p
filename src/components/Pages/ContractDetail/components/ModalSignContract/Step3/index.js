import { MyButton, MyInput } from 'components/Atoms';
import React from 'react';

const Step3 = ({ onSubmit, onBack, partnerName, partnerText }) => {
  return (
    <>
      <h4 className="title">Manually sign contract</h4>
      <p className="description">
        Please confirm the {partnerText} you want to send to sign
      </p>

      <div className="mx-n25 text-center">
        <MyInput
          type="text"
          className="w-50p input-custom"
          value={partnerName}
          disabled={true}
        />
      </div>

      <div className="py-20">
        <MyButton onClick={onBack} className="btn-secondary-custom">
          Back
        </MyButton>
        <MyButton onClick={onSubmit} className="btn-primary-custom">
          Sign
        </MyButton>
      </div>
    </>
  );
};

export default Step3;
