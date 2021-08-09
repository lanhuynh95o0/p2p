import React from 'react';
import { MyButton } from 'components/Atoms';
import FileCollapse from 'components/Atoms/FileCollapse';
import PropTypes from 'prop-types';

const Step3 = (props) => {
  const _handleUpdatePrivacy = (option, index) => {
    props.documents[index].privacy = option;
  };

  if (props.visible)
    return (
      <>
        <div className="text-center">
          <h4 className="title">Who can see attachments</h4>
          <p className="description">Set privacy for your attachments</p>
          <div className="pb-20">
            <FileCollapse
              data={props.documents}
              onChange={_handleUpdatePrivacy}
            />
          </div>
        </div>
        <div className="text-center">
          <MyButton
            onClick={props.onBack}
            className="btn-secondary-custom mx-10"
          >
            Back
          </MyButton>
          <MyButton onClick={props.onNext} className="btn-primary-custom mx-10">
            Continue
          </MyButton>
        </div>
      </>
    );
  return null;
};

export default Step3;

Step3.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  documents: PropTypes.array,
};

Step3.defaultProps = {
  visible: false,
  onNext: () => {},
  onBack: () => {},
};
