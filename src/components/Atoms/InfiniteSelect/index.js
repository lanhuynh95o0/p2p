import React, { useState, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import './styles.scss';
import Image from '../Image';

const InfiniteSelect = (props) => {
  const maximumItem = props.maximumItem ?? 50;
  const defaultDelay = props.delay ?? 250;
  const [filterData, setFilterData] = useState([]);
  const [pageLoading, setPageLoading] = useState({
    min: 0,
  });
  const [scrollInfo, setScrollInfo] = useState({
    scrollEnd: false,
    delay: defaultDelay
  });
  const onChange = props.onChange;
  const [iconSuffix, setIconSuffix] = useState(
    <CaretDownOutlined className="icon-caret-custom" />
  );
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const resetDropdownPosition = () => {
    setTimeout(() => {
      if (dropdownRef.current) {
        let dropdown = dropdownRef.current;
        console.log(dropdown);
        const innerDropdown = dropdown.getElementsByClassName('rc-virtual-list-holder');
        if (innerDropdown.length)
          dropdown = innerDropdown[0];
        dropdown.scrollTop = 0;
      }
    }, 100);
  }

  useEffect(() => {
    if (Array.isArray(props.options)) {
      setFilterData(props.options);
      setPageLoading({ min: 0 });
    }
  }, [props.options]);

  useEffect(() => {
    if (props.value && props.allowClear) {
      setIconSuffix(
        <Icon
          className="icon-clear-custom"
          component={IconCustom.Close}
          onClick={onClearValue}
        />
      );
      return;
    }
    setIconSuffix(
      <CaretDownOutlined className="icon-caret-custom" onClick={_focus} />
    );
  }, [props.value]);

  const onClearValue = () => {
    onSearch();
    onChange('');
    props.onSelect('');
  };

  const handleChange = (value) => {
    onSearch();
    onChange(value);
    props.onSelect(value);
  };

  const _focus = () => {
    if (selectRef.current) selectRef.current.focus();
  };

  const _blur = () => {
    if (selectRef.current) selectRef.current.blur();
  };

  const onDropdownVisibleChange = (open) => {
    if (open) {
      setPageLoading((prevState) => ({
        ...prevState,
        min: 0,
      }));
      resetDropdownPosition();
      setIconSuffix(
        <CaretUpOutlined className="icon-caret-custom" onClick={_blur} />
      );
      return;
    }
    setIconSuffix(
      <CaretDownOutlined className="icon-caret-custom" onClick={_focus} />
    );
  };

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  const onSearch = (value) => {
    if (value) {
      value = value.toLowerCase();
      const newData = props.options.filter((it) => it.name && it.name.toLowerCase().includes(value));
      setFilterData(newData);
    }
    else {
      setFilterData(props.options);
    }
    setPageLoading((prevState) => ({
      ...prevState,
      min: 0,
    }));
    resetDropdownPosition();
  };

  const handleScroll = (event) => {
    event.stopPropagation();

    const dropdown = event.target;
    const endReached = (dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 1);
    const startReached = dropdown.scrollTop == 0;
    const oldMin = pageLoading.min;
    let newMin = oldMin;

    const step = Math.floor(maximumItem * (dropdown.clientHeight / dropdown.scrollHeight)) + 1;

    if (endReached) {
      if (newMin + step + maximumItem < filterData.length) {
        newMin += step;
      } else newMin = filterData.length - maximumItem;
    } else if (startReached) {
      if (newMin - step > 0) {
        newMin -= step;
      } else newMin = 0;
    }

    const directionChanged = scrollInfo.scrollEnd && startReached
      || !scrollInfo.scrollEnd && endReached;

    const delay = directionChanged ? defaultDelay : scrollInfo.delay;

    if (newMin !== oldMin && delay !== 0 && filterData.length > maximumItem) {
      const newTop = dropdown.scrollHeight * step / maximumItem;
      setTimeout(() => {
        setPageLoading((prevState) => ({
          ...prevState,
          min: newMin,
        }));
        setScrollInfo({
          delay: defaultDelay,
          scrollEnd: !startReached || directionChanged || endReached
        });
        dropdown.scrollTop += endReached ? (-newTop) : newTop;
      }, delay);
      setScrollInfo({
        delay: 0,
        scrollEnd: !startReached || directionChanged || endReached
      });
    }
  };

  return (
    <div id="my-select">
      <Select
        disabled={props.disabled}
        showSearch={props.showSearch}
        onChange={handleChange}
        ref={selectRef}
        id="select-focus"
        // onInput
        size="large"
        placeholder={props.placeholder}
        className={props.className || 'select-custom'}
        value={props.value || undefined}
        suffixIcon={props.disabled ? null : iconSuffix}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownMatchSelectWidth={false}
        allowClear={false}
        filterOption={filterOption}
        showAction={['focus', 'click']}
        // onPopupScroll={onPopupScroll}
        onSearch={onSearch}
        dropdownRender={(menu) => <div ref={dropdownRef} onScroll={handleScroll}>{menu}</div>}
      >
        {filterData
          .slice(pageLoading.min, pageLoading.min + maximumItem)
          .map((option) => (
            <Select.Option
              key={option[props.valueKey]}
              value={option[props.valueKey]}
              label={option[props.labelKey]}
              className="my-select-option my-select-custom-item"
              disabled={option[props.disabledKey]}
            >
              {props.renderItem ? (
                <div className="my-select-custom-item">
                  {props.renderItem(option)}
                </div>
              ) : (
                <>
                  {option.icon && (
                    <Image
                      src={option.icon}
                      className="my-select-option-icon"
                    />
                  )}
                  <span className="my-select-text">
                    {option[props.labelKey]}
                  </span>
                </>
              )}
              <Icon
                component={IconCustom.Checked}
                className="my-select-selected-icon"
              />
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

InfiniteSelect.propTypes = {
  size: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  disabledKey: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  showSearch: PropTypes.bool,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  suffixIcon: PropTypes.any,
  allowClear: PropTypes.bool,
  className: PropTypes.string,
  renderItem: PropTypes.func,
};

InfiniteSelect.defaultProps = {
  placeholder: 'Please select',
  labelKey: 'name',
  valueKey: 'id',
  disabledKey: 'disabled',
  size: 'large',
  options: [
    { name: 'Option 1', id: 1 },
    { name: 'Option 2', id: 2 },
    { name: 'Option 3', id: 3 },
  ],
  name: 'fieldName',
  showSearch: false,
  onSelect: () => null,
  disabled: false,
  allowClear: false,
};

export default InfiniteSelect;
