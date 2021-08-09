import React, { useState } from 'react';
import { MyUploadAvatar, MyButton } from 'components/Atoms';
import { get } from 'lodash';
import './styles.scss';

const Step4 = ({ readOnlyStep, onGoBack, onContinue, isEdit, dataSubmit }) => {
  const [dataLogo, setDataLogo] = useState(null);

  const handleFileChange = (file) => {
    setDataLogo({
      logoSlug: file.slug,
      logoUrl: file.preview,
    });
  };

  const onFinish = () => {
    onContinue(dataLogo);
  };

  return (
    <>
      <div className="text-center">
        <div className="title">Client logo</div>
        <div className="descripiton">Upload client’s company logo</div>
      </div>

      <div className="upload-logo-client">
        <div className="upload-control">
          <MyUploadAvatar
            imageSelected={
              get(dataLogo, 'logoUrl') || get(dataSubmit, 'logoUrl')
            }
            disabled={readOnlyStep}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="t-center mt-20">
        <MyButton
          onClick={onGoBack}
          size="large"
          className="btn-outline-custom mr-10"
        >
          Back
        </MyButton>
        {!readOnlyStep && (
          <MyButton
            // disabled={!dataLogo && !dataSubmit?.logoUrl}
            onClick={onFinish}
            size="large"
            className="btn-primary-custom"
          >
            Complete
          </MyButton>
        )}
      </div>
    </>
  );
};

export default Step4;
