import React, { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';
import MySelect from '../Select';
import { selectCurrencies } from 'states/common/selectors';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { getCurrencies } from 'states/common/actions';
import PropTypes from 'prop-types';
import './styles.scss';

const MyInputCost = ({
  listCurrency,
  listPhoneCode,
  disabled,
  disableCurrency,
  ...props
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (listCurrency.length) {
      return;
    }
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    if (listCurrency?.length && props.form) {
      if (props.currencyValue)
        return props.form.setFieldsValue({
          [props.currencyName]: props.currencyValue,
        });
      if (!props.form.getFieldValue(props.currencyName))
        props.form.setFieldsValue({
          [props.currencyName]: listCurrency[0].id,
        });
    }
  }, [listCurrency]);

  return (
    <Input.Group compact>
      <div className="cost-input-custom">
        <div className="col-left">
          <Form.Item
            name={props.currencyName}
            noStyle
            // rules={[{ required: true, message: 'Please enter currency' }]}
          >
            <MySelect
              placeholder="Currency"
              disabled={disabled || disableCurrency}
              allowClear={false}
              showSearch
              className="select-custom-gray"
              options={listCurrency}
            />
          </Form.Item>
        </div>
        <div className="col-right">
          <Form.Item
            name={props.costName}
            noStyle
            // rules={[{ required: true, message: 'Please input estimate cost!' }]}
          >
            <InputNumber
              disabled={disabled}
              className="my-input-number"
              placeholder="Not Applicable"
              formatter={(value) =>
                `${value}`
                  // .replace(/^0(?!0)/, '')
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Form.Item>
        </div>
      </div>
    </Input.Group>
  );
};

MyInputCost.propTypes = {
  disabled: PropTypes.bool,
  disableCurrency: PropTypes.bool,
  costName: PropTypes.string,
  currencyName: PropTypes.string,
  currencyValue: PropTypes.string,
  form: PropTypes.object,
};

MyInputCost.defaultProps = {
  disabled: false,
  costName: null,
  currencyName: null,
};

const mapStateToProps = createStructuredSelector({
  listCurrency: selectCurrencies(),
});

export default connect(mapStateToProps, null)(MyInputCost);
