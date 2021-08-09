import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MyUploadAvatar } from 'components/Atoms';
import { isEmpty } from 'lodash';
import { get } from 'lodash';
const SignupStep5 = ({ onContinue, onGoBack, readOnlyStep, values }) => {
  const [dataLogo, setDataLogo] = useState(null);

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }
    setDataLogo({
      organizationLogoUrl: values.organizationLogoUrl,
    });
  }, [values]);

  const handleFileChange = (file) => {
    setDataLogo({
      organizationLogo: file.slug,
      organizationLogoUrl: file.preview,
    });
  };

  const onFinish = () => {
    onContinue(dataLogo);
  };

  return (
    <div className="wrapper-step-4">
      <div className="header-step">Business logo</div>
      <div className="sub-header">
        Upload your company logo to let partners recognise you easier
      </div>

      <div className="upload-logo">
        <div className="upload-control">
          <MyUploadAvatar
            imageSelected={get(dataLogo, 'organizationLogoUrl')}
            disabled={readOnlyStep}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="t-center mt-20">
        <Button
          onClick={onGoBack}
          size="large"
          className="btn-outline-custom mr-10"
        >
          Back
        </Button>
        {!readOnlyStep && (
          <Button
            disabled={!dataLogo}
            onClick={onFinish}
            size="large"
            className="btn-primary-custom"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupStep5;
