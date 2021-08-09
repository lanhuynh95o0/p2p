import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Row, Col } from 'antd';
import { MyGoogleMap, MyInput, MySelect } from 'components/Atoms';
import { useDispatch, connect } from 'react-redux';
import { getCountries, getCities } from 'states/common/actions';
import { checkFormAntInvalid, dedupe } from 'utilities/common';
import {
  selectCountries,
  selectCities,
  selectObjCountries,
} from 'states/common/selectors';
import { createStructuredSelector } from 'reselect';
import { isEmpty, debounce } from 'lodash';
import { showModalError } from 'utilities/modal';

const SignupStep3 = ({
  listCountry,
  objCountries,
  listCity,
  onContinue,
  onGoBack,
  readOnlyStep,
  values,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [searchAddress, setSearchAddress] = useState('');
  const [position, setPosition] = useState(
    values.lat
      ? {
          lat: values.lat,
          lng: values.lng,
        }
      : null
  );
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (isEmpty(values)) {
      return;
    }

    setPosition({
      lat: values.lat,
      lng: values.lng,
    });

    form.setFieldsValue({
      companyName: values.companyName,
      address: values.address,
      country: values.country,
      city: values.city,
      postcode: values.postcode,
    });

    setSearchAddress(values.address + ' ' + objCountries[values.country]);
  }, [values]);

  const handleSelectCountry = (country) => {
    setShouldSearch(true);
    setSearchAddress(objCountries[country] || country);

    form.setFieldsValue({
      address: '',
    });
  };

  const _onChangeAddress = ({ target }) => {
    let c = form.getFieldValue('country') || '';
    setAddress(target.value, objCountries[c] || c);
  };

  const setAddress = debounce((ad, c) => {
    setShouldSearch(true);
    setSearchAddress(ad + ' ' + c);
  }, 500);

  const handleChangeCenter = (data, cb) => {
    let findCountry = listCountry.filter((c) => c.code === data.country);

    if (findCountry.length > 0) {
      // form.setFieldsValue({
      //   address: data.address,
      //   country: data.country,
      //   city: data.city,
      // });

      cb();
      // setSearchAddress(ad + ' ' + objCountries[data.country]);
    } else {
      // showModalError({ content: `This country doesn't support in system` });
    }
  };

  const submitStep3 = (values) => {
    onContinue({ ...values, ...position });
  };

  return (
    <div className="wrapper-step-3">
      <div className="header-step">Business information</div>
      <div className="sub-header">
        Enter your company information to let us and partners know what your
        company is
      </div>

      <Form
        className="form mt-20"
        layout="vertical"
        form={form}
        onFinish={submitStep3}
      >
        <Form.Item
          label="Company name"
          name="companyName"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter company name' }]}
        >
          <MyInput disabled={readOnlyStep} placeholder="Enter company name" />
        </Form.Item>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter country' }]}
            >
              <MySelect
                showSearch
                disabled={readOnlyStep}
                onSelect={handleSelectCountry}
                options={dedupe(listCountry)}
                valueKey="code"
                className="select-custom-gray"
                placeholder="Select country"
              />
            </Form.Item>
            {/* <Form.Item
              label="City"
              name="city"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <MySelect
                showSearch
                disabled={readOnlyStep}
                options={listCity}
                placeholder="Select city"
                className="select-custom-gray"
              />
            </Form.Item> */}
          </Col>
          <Col span={12}>
            <Form.Item
              label="Postcode (opt)"
              name="postcode"
              className="form-item-custom"
            >
              <MyInput placeholder="Enter postcode" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Address"
          name="address"
          className="form-item-custom"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <MyInput
            disabled={readOnlyStep}
            placeholder="Enter number of unit, street"
            onChange={_onChangeAddress}
          />
        </Form.Item>

        {listCountry.length > 0 && (
          <MyGoogleMap
            address={searchAddress}
            onCenterChange={handleChangeCenter}
            position={position}
            shouldSearch={shouldSearch}
            setPosition={(p) => {
              setShouldSearch(false);
              setPosition(p);
            }}
          />
        )}

        <Form.Item className="t-center mt-20" shouldUpdate>
          {() => (
            <>
              <Button
                onClick={onGoBack}
                size="large"
                className="btn-outline-custom mr-10"
              >
                Back
              </Button>
              <Button
                htmlType="submit"
                size="large"
                className="btn-primary-custom"
                disabled={checkFormAntInvalid(form)}
              >
                Continue
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  listCountry: selectCountries(),
  objCountries: selectObjCountries(),
  listCity: selectCities(),
});
export default connect(mapStateToProps, null)(SignupStep3);
