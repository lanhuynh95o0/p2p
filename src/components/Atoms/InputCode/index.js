import React from 'react';
import PropTypes from 'prop-types';
import ReactCodeInput from 'react-verification-code-input';
import './styles.scss';

const splitNumberToIndividualDigits = number => {
  if (!number) {
    return [];
  }
  const output = [],
    sNumber = number.toString();

  for (var i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(sNumber.charAt(i));
  }
  return output;
}

const InputCode = ({
  onComplete,
  onChange,
  value,
  disabled
}) => {
  return (
    <>
      {value && (
        <ReactCodeInput
          disabled={disabled}
          values={splitNumberToIndividualDigits(value)}
          className='input-code-custom'
          onComplete={onComplete}
          onChange={onChange}
        />
      )}
      {!value && (
        <ReactCodeInput
          disabled={disabled}
          values={splitNumberToIndividualDigits(value)}
          className='input-code-custom'
          onComplete={onComplete}
          onChange={onChange}
        />
      )}
    </>

  )
}

InputCode.propTypes = {
  onComplete: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool
};

InputCode.defaultProps = {
  onComplete: values => console.log('onComplete', values),
  onChange: value => console.log('onChange', value),
  disabled: false
};


export default InputCode;