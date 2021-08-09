import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import './styles.scss';
import { DOCUMENT_PRIVACY, PRIVACY, PRIVACY_LIST } from 'constants/common';

const CheckboxGroup = Checkbox.Group;
const CheckShare = ({ title, onChange, value }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!value) return;
    const getValue = () => {
      if (value === DOCUMENT_PRIVACY.All.value) return CHECK_OPTIONS;
      if (value === DOCUMENT_PRIVACY.EXCEPT_PARTNER.value)
        return [PRIVACY.INCLUDE_CLIENT.label];
      if (value === DOCUMENT_PRIVACY.EXCEPT_CLIENT.value)
        return [PRIVACY.INCLUDE_CONTRACTOR.label];
      return [];
    };
    setSelected(getValue());
  }, [value]);

  const _onChange = useCallback((e) => {
    setSelected(e);
    if (e.length === PRIVACY_LIST.length)
      return onChange(DOCUMENT_PRIVACY.All.value);
    if (e.includes(PRIVACY.INCLUDE_CLIENT.label))
      return onChange(DOCUMENT_PRIVACY.EXCEPT_PARTNER.value);
    if (e.includes(PRIVACY.INCLUDE_CONTRACTOR.label))
      return onChange(DOCUMENT_PRIVACY.EXCEPT_CLIENT.value);
    return onChange(DOCUMENT_PRIVACY.EXCEPT_ALL.value);
  }, []);

  return (
    <div id="my-check-share">
      <p className="title">{title}</p>
      <CheckboxGroup
        options={CHECK_OPTIONS}
        value={selected}
        onChange={_onChange}
      />
    </div>
  );
};

export default CheckShare;

const CHECK_OPTIONS = PRIVACY_LIST.map((_) => _.label);
