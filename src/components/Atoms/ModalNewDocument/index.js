import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { MyModal, MyStep, SuccessfulScreen } from 'components/Atoms/index';
import Step1 from './Step1';
import Step2 from './Step2';
import { DOCUMENT_PRIVACY } from 'constants/common';

const ModalNewDocument = (props) => {
  const bulkDeleteFileUploaded = useRef(null);
  const [documents, setDocument] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setDocument(null);
    setFinishedStep(1);
    setCurrentStep(1);
    setIsSuccessful(false);
  }, [props.visible]);

  const _onNextStep = useCallback(() => {
    setCurrentStep((n) => {
      let nextStep = Math.min(n + 1, STEP.length);
      setFinishedStep((prevFinishedStep) =>
        Math.max(prevFinishedStep, nextStep)
      );
      return nextStep;
    });
  }, []);

  const _onBackStep = useCallback(() => {
    setCurrentStep((n) => {
      return Math.max(n - 1, 1);
    });
  }, []);

  const _updateDocument = useCallback((data, email) => {
    setEmail(email);

    setDocument(
      data.map((_) => ({ ..._, privacy: DOCUMENT_PRIVACY.EXCEPT_ALL.value }))
    );
    _onNextStep();
  }, []);

  const _uploadDocument = () => {
    props.onSubmit(
      documents.map((item) => ({
        id: item.id,
        slug: item.slug,
        privacy: item.privacy,
      })),
      email,
      () => {
        setIsSuccessful(true);
      }
    );
  };

  const _closeModal = useCallback(() => {
    if (!isSuccessful && bulkDeleteFileUploaded.current) {
      bulkDeleteFileUploaded.current();
    }
    props.onClose(isSuccessful);
  }, [isSuccessful]);

  const _renderStepBody = useMemo(() => {
    return (
      <>
        <div className={`${isSuccessful && 'd-none'} h-100p`}>
          <MyStep
            headers={STEP}
            currentStep={currentStep}
            finishedStep={finishedStep}
          />

          <div className="view-content">
            <Step1
              visible={currentStep === 1}
              onNext={_updateDocument}
              description={props.description}
              willDeleteWhenUnmount={!isSuccessful}
              hideAssigneeField={props.hideAssigneeField}
            />
            <Step2
              visible={currentStep === 2}
              onBack={_onBackStep}
              onNext={_uploadDocument}
              documents={documents}
              setDocument={setDocument}
            />
          </div>
        </div>
        <div className={`${!isSuccessful ? 'd-none' : 'view-center'}`}>
          <SuccessfulScreen
            description={props.successText}
            onClickButtonSecondary={_closeModal}
            buttonPrimaryText={props.buttonPrimaryText}
            onClickButtonPrimary={_closeModal}
          />
        </div>
      </>
    );
  }, [currentStep, isSuccessful, documents]);

  return (
    <MyModal visible={props.visible} onClose={_closeModal}>
      {_renderStepBody}
    </MyModal>
  );
};

export default ModalNewDocument;

ModalNewDocument.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  description: PropTypes.string,
  successText: PropTypes.string,
  buttonPrimaryText: PropTypes.string,
  hideAssigneeField: PropTypes.bool,
};

ModalNewDocument.defaultProps = {
  description:
    'Upload attachments of this project or you can skip for later. Only you and client can view these attachments',
  buttonPrimaryText: 'Back,',
  hideAssigneeField: false,
};

export const STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
];
