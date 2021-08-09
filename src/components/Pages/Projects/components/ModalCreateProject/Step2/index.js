import React, { useCallback, useState } from 'react';
import { MyButton, MyUploadSingle } from 'components/Atoms';
import PropTypes from 'prop-types';
import { DOCUMENT_PRIVACY } from 'constants/common';

const Step2 = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);

  const _changeUploadStatus = useCallback(
    (status) => () => {
      setIsUploading(status);
    },
    []
  );

  const _onUpload = useCallback((data) => {
    setFileUploaded((value) => {
      data.privacy = DOCUMENT_PRIVACY.EXCEPT_ALL.value;
      value.push(data);
      return value;
    });
  }, []);

  const _onRemove = useCallback((data) => {
    setFileUploaded((value) => {
      const index = value.findIndex((_) => _.id === data.id);
      if (index >= 0) {
        value.splice(index, 1);
      }
      return value;
    });
  }, []);

  const _onContinue = () => props.onNext(fileUploaded);

  return (
    <div className={`${!props.visible && 'd-none'}`}>
      <div className="text-center">
        <h4 className="title">Upload attachments</h4>
        <p className="description">
          Upload attachments of this project or you can skip for later.
        </p>
        <div className="pb-20">
          <MyUploadSingle
            onChange={_onUpload}
            onRemove={_onRemove}
            multiple={true}
            willDeleteWhenUnmount={props.willDeleteWhenUnmount}
            onUploading={_changeUploadStatus(true)}
            onUploadDone={_changeUploadStatus(false)}
          />
        </div>
      </div>

      <br />

      <div className="text-center">
        <MyButton
          disabled={isUploading}
          onClick={props.onBack}
          className="btn-secondary-custom mx-10"
        >
          Back
        </MyButton>
        <MyButton
          disabled={isUploading}
          onClick={_onContinue}
          className="btn-primary-custom mx-10"
        >
          Continue
        </MyButton>
      </div>
    </div>
  );
};

export default Step2;

Step2.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  project: PropTypes.object,
  handleBulkDelete: PropTypes.func,
  willDeleteWhenUnmount: PropTypes.bool,
};

Step2.defaultProps = {
  visible: false,
  onNext: () => { },
  onBack: () => { },
};
