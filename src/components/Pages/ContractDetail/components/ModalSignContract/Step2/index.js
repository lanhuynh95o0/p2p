import { MyButton, MyUploadSingle } from 'components/Atoms';
import React, { useCallback, useEffect, useState } from 'react';
import { APP_INFO, FILE_ACCEPT } from 'constants/common';
import { getContractPath } from 'states/contract/actions';
import { useDispatch } from 'react-redux';

const Step2 = ({ fileUploaded, setFileUploaded, jobId, onSubmit, onBack }) => {
  const dispatch = useDispatch();
  const _onRemove = useCallback(() => setFileUploaded(null), []);
  const [folder, setFolder] = useState('');

  useEffect(() => {
    dispatch(getContractPath(jobId, setFolder));
  }, []);

  return (
    <>
      <h4 className="title">Manually sign contract</h4>
      <p className="description">
        Please download your contract to sign and upload back to {APP_INFO.NAME}
      </p>

      <div className="mx-n25">
        <MyUploadSingle
          onChange={setFileUploaded}
          onRemove={_onRemove}
          folder={folder}
          accept={`${FILE_ACCEPT.CONTRACT}`}
        />
      </div>

      <div className="py-20">
        <MyButton onClick={onBack} className="btn-secondary-custom">
          Back
        </MyButton>
        <MyButton
          disabled={!fileUploaded}
          onClick={onSubmit}
          className="btn-primary-custom"
        >
          Continue
        </MyButton>
      </div>
    </>
  );
};

export default Step2;
