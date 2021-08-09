import React, { useEffect } from 'react';
import { DatePicker, Input } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import moment from 'moment';
import { useRef } from 'react';

moment.locale('en-us', {
  week: {
    dow: 1,
  },
});

const MyInput = (props) => {
  const onChange = props.onChange;
  const inputRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const onClearValue = () => {
    onChange('');
  };

  const suffix =
    props.value && !props.disabled ? (
      <Icon
        className="my-input-suffix-icon"
        component={IconCustom.Close}
        onClick={onClearValue}
      />
    ) : (
      <span />
    );

  return (
    <div id="my-input">
      {props.type === 'number' && (
        <Input
          disabled={props.disabled}
          onChange={handleChange}
          value={props.value}
          className="input-custom"
          size={props.size}
          placeholder={props.placeholder}
          suffix={props.suffix || suffix}
          onKeyDown={(evt) => {
            if (
              ['e', ...props.preventNumberKeyCode].indexOf(
                evt.key.toLowerCase()
              ) > -1
            ) {
              evt.preventDefault();
            }
          }}
          {...props}
        />
      )}
      {props.type === 'text' && (
        <Input
          disabled={props.disabled}
          onChange={handleChange}
          value={props.value}
          className="input-custom"
          size={props.size}
          placeholder={props.placeholder}
          suffix={suffix}
          {...props}
        />
      )}
      {props.type === 'password' && (
        <Input.Password
          size="large"
          disabled={props.disabled}
          onChange={handleChange}
          value={props.value}
          className="input-custom"
          placeholder={props.placeholder}
          {...props}
        />
      )}
      {props.type === 'date' && (
        <DatePicker
          onChange={handleChange}
          value={props.value}
          className="input-custom"
          format={props.formatdate}
          picker={props.pickerdate}
          dropdownClassName="my-input-date"
          showToday={false}
          allowClear={false}
          suffixIcon={
            <Icon
              component={IconCustom.Calendar}
              className="my-input-suffix-icon"
            />
          }
          {...props}
        />
      )}
      {props.type === 'textarea' && (
        <Input.TextArea
          rows={4}
          onChange={handleChange}
          value={props.value}
          className="input-custom"
          placeholder={props.placeholder}
          {...props}
        />
      )}
    </div>
  );
};

MyInput.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  formatdate: PropTypes.string,
  pickerdate: PropTypes.string,
  suffix: PropTypes.node,
};

MyInput.defaultProps = {
  size: 'large',
  name: 'email',
  type: 'text',
  placeholder: 'Enter',
  disabled: false,
  formatdate: 'DD/MM/YYYY',
  pickerdate: undefined,
  suffix: undefined,
  preventNumberKeyCode: [],
};

export default MyInput;

const localeDate = {
  lang: {
    locale: 'en_US',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'Select time',
    dateSelect: 'Select date',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'dd',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};
