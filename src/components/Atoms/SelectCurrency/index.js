import React, { useEffect } from 'react';
import { Form } from 'antd';
import MySelect from '../Select';
import { selectCurrencies } from 'states/common/selectors';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { getCurrencies } from 'states/common/actions';
import PropTypes from 'prop-types';

const MyInputCost = ({ listCurrency, disabled, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (listCurrency.length) {
      return;
    }
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    if (
      listCurrency?.length &&
      props.form &&
      !props.form.getFieldValue(props.name)
    ) {
      props.form.setFieldsValue({
        [props.name]: listCurrency[0].id,
      });
    }
  }, [listCurrency]);

  return (
    <Form.Item
      name={props.name}
      noStyle
      rules={[{ required: true, message: 'Please enter currency' }]}
    >
      <MySelect
        placeholder="Currency"
        disabled={disabled}

        allowClear={false}
        showSearch
        className="select-custom-gray"
        options={listCurrency}
      />
    </Form.Item>
  );
};

MyInputCost.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  form: PropTypes.object,
};

MyInputCost.defaultProps = {
  disabled: false,
};

const mapStateToProps = createStructuredSelector({
  listCurrency: selectCurrencies(),
});

export default connect(mapStateToProps, null)(MyInputCost);
