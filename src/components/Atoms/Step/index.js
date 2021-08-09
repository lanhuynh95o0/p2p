import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const MyStep = ({
  headers,
  currentStep,
  finishedStep,
  onSwitchTab,
  className,
}) => {
  const handleSwitchTab = (step) => {
    if (step > finishedStep) {
      return;
    }
    onSwitchTab(step);
  };

  return (
    <div className={`my-tabs-container ${className}`}>
      <div className="header-tab">
        {headers.map((header) => (
          <div
            className={
              `tab ${currentStep >= header.step && 'tab-finished'}`
              // `tab ${(finishedStep >= header.step) && 'tab-finished'} ${(currentStep === header.step && finishedStep !== 1) && 'tab-current'}`
            }
            key={header.step}
            onClick={() => handleSwitchTab(header.step)}
          />
        ))}
      </div>
    </div>
  );
};

MyStep.propTypes = {
  headers: PropTypes.array,
  currentStep: PropTypes.number,
  finishedStep: PropTypes.number,
  onSwitchTab: PropTypes.func,
};

MyStep.defaultProps = {
  finishedStep: 1,
  currentStep: 1,
  headers: [
    { name: 'Tab 1', step: 1 },
    { name: 'Tab 2', step: 2 },
    { name: 'Tab 3', step: 3 },
    { name: 'Tab 4', step: 4 },
  ],
  onSwitchTab: () => null,
};
export default MyStep;
