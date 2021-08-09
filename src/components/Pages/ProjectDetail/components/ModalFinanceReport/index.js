import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MyButton, MyModal, MyStep } from 'components/Atoms';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME as STATE_NAME_PROJECT } from 'states/project/constants';
import { STATE_NAME as STATE_NAME_APP } from 'states/app/constants';
import useActions from 'hooks/useActions';
import { toggleFinanceReportModal } from 'states/project/actions';
import {
  BUTTON,
  FINANCE_REPORT_STEP,
  FINANCE_REPORT_STEP_VALUE,
  INTRO,
} from 'components/Pages/ProjectDetail/constants/finance-report';
import { setCurrentStep } from 'states/app/actions';
import './style.scss';
import { sleep } from 'utilities/common';
import FinanceReportStep1 from 'components/Pages/ProjectDetail/components/Step1';
import FinanceReportStep2 from 'components/Pages/ProjectDetail/components/Step2';
import FinanceReportStep3 from 'components/Pages/ProjectDetail/components/Step3';

const ModalFinanceReport = () => {
  const currentStep = useSelector(
    commonSelector(STATE_NAME_APP, 'currentStep')
  );

  const projectsFinanceReport = useSelector(
    commonSelector(STATE_NAME_PROJECT, 'projectsFinanceReport')
  );

  const visibleFinanceReportModal = useSelector(
    commonSelector(STATE_NAME_PROJECT, 'visibleFinanceReportModal')
  );

  const [toggleFinanceReportModalAction, setCurrentStepAction] = useActions([
    toggleFinanceReportModal,
    setCurrentStep,
  ]);

  const [textModal, setTextModal] = useState({ title: '', rightButton: '' });

  useEffect(() => {
    const scrollTopEl = document.getElementById('scroll-top');
    let title = INTRO.DESCRIPTION_LAST,
      rightButton = BUTTON.CONTINUE_LAST;

    if (currentStep === FINANCE_REPORT_STEP_VALUE.FIRST) {
      title = INTRO.DESCRIPTION_COST;
      rightButton = BUTTON.CONTINUE;
    }
    if (currentStep === FINANCE_REPORT_STEP_VALUE.SECOND) {
      title = INTRO.DESCRIPTION_SELL;
      rightButton = BUTTON.COMPLETE;
    }
    setTextModal({ title, rightButton });

    if (!scrollTopEl) return;

    scrollTopEl.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep]);

  const onClose = async () => {
    toggleFinanceReportModalAction(false);
    await sleep(200);
    setCurrentStepAction(FINANCE_REPORT_STEP_VALUE.FIRST);
  };

  const onBackStep = useCallback(async () => {
    if (
      currentStep !== FINANCE_REPORT_STEP_VALUE.LAST &&
      currentStep !== FINANCE_REPORT_STEP_VALUE.FIRST
    )
      setCurrentStepAction(currentStep - 1);
    else await onClose();
  }, [currentStep]);

  const onContinueStep = useCallback(() => {
    setCurrentStepAction(
      currentStep !== FINANCE_REPORT_STEP_VALUE.LAST
        ? currentStep + 1
        : FINANCE_REPORT_STEP_VALUE.FIRST
    );
  }, [currentStep]);

  return (
    <MyModal
      destroyOnClose
      classNameModal="finance-report-modal"
      visible={visibleFinanceReportModal}
      onClose={onClose}
    >
      <div id="scroll-top" className="text-center h-100p">
        <MyStep
          headers={FINANCE_REPORT_STEP}
          currentStep={currentStep}
          finishedStep={currentStep}
          className="mb-70"
        />

        <h4 className="title">{INTRO.TITLE}</h4>
        <p className="description">{textModal.title}</p>

        <FinanceReportStep1 />
        <FinanceReportStep2 />
        <FinanceReportStep3 />

        <div className="d-flex justify-content-center w-100p mb-24 mt-24">
          <MyButton className="btn-secondary-custom mx-0 mx-sm-10" onClick={onBackStep}>
            {currentStep !== FINANCE_REPORT_STEP_VALUE.LAST
              ? BUTTON.BACK
              : BUTTON.BACK_LAST}
          </MyButton>
          <MyButton
            className="btn-primary-custom ml-10 ml-sm-20"
            disabled={!projectsFinanceReport || !projectsFinanceReport.length}
            onClick={onContinueStep}
          >
            {textModal.rightButton}
          </MyButton>
        </div>
      </div>
    </MyModal>
  );
};

export default React.memo(ModalFinanceReport);
