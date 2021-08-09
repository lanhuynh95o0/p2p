import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Input, MyPhoneInput, MySelect, MyGoogleMap } from 'components/Atoms';
import { createStructuredSelector } from 'reselect';
import { selectCountries, selectObjCountries } from 'states/common/selectors';
import { connect, useDispatch } from 'react-redux';
import { getCountries } from 'states/common/actions';
import { debounce } from 'lodash';
import { dedupe } from 'utilities/common';
import { showModalError } from 'utilities/modal';
import { isValidPhoneNumber } from 'react-phone-number-input';

const FindUsAt = ({
  form,
  validateForm,
  countries,
  objCountries,
  profile,
  position,
  setPosition,
}) => {
  const dispatch = useDispatch();
  const [, setTriggerRender] = useState(1);
  const [searchAddress, setSearchAddress] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    if (!profile.country || !countries.length) {
      return;
    }
    const { address, country } = profile;

    setSearchAddress(address + ' ' + objCountries[country]);
  }, [profile, countries]);

  const _fetchCity = useCallback(
    async (country) => {
      setShouldSearch(true);

      setSearchAddress(objCountries[country] || country);

      form.setFieldsValue({ address: '' });
    },
    [objCountries]
  );

  useEffect(() => {
    dispatch(getCountries(true));
  }, []);

  const _onChangeAddress = ({ target }) => {
    setShouldSearch(true);
    let c = form.getFieldValue('country') || '';
    setAddress(target.value, objCountries[c] || c);
  };

  const setAddress = debounce((ad, c) => {
    setSearchAddress(ad + ' ' + c);
  }, 500);

  const handleChangeCenter = (data, cb) => {
    let findCountry = countries.filter((c) => c.code === data.country);

    if (findCountry.length > 0) {
      cb();

      setTriggerRender((prev) => prev + 1);
    } else {
      // showModalError({ content: `This country doesn't support in system` });
    }
  };

  const onChangePhoneNumber = async ({ phone = '', phoneCode = '' }) => {
    form.setFieldsValue({
      phone,
      phoneCode,
    });
  };

  const checkPhoneNumberValid = () => {
    const phone = form.getFieldValue('phone');
    const phoneCode = form.getFieldValue('phoneCode');
    const fullPhoneNumber = `+${phoneCode}${phone}`;
    const isValid = isValidPhoneNumber(fullPhoneNumber);
    if (isValid) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("It's must be Mobile phone to receive verification code")
    );
  };

  const optionCountries = useMemo(() => {
    if (!countries || !countries.length) return [];
    const dedupeCountries = dedupe(countries);
    const { country } = profile;
    let activeCountries = dedupeCountries.filter((c) => c.isActive);
    const isExistInActiveCountries =
      activeCountries.findIndex((el) => el.code === country) > -1;
    if (country && !isExistInActiveCountries) {
      const findCountry = dedupeCountries.find((el) => el.code === country);
      if (findCountry) {
        activeCountries = [
          ...activeCountries,
          { ...findCountry, disabled: true },
        ];
      }
    }
    return activeCountries;
  }, [profile, countries]);

  return (
    <div className="block p-10">
      <h2 className="title">Find us at</h2>
      {/* Email */}
      <Form.Item
        label="Email"
        required={false}
        name="email"
        className="form-item-custom ant-form-item-required"
        rules={validateForm.email}
      >
        <Input name={'Email'} className="input-custom info-input" />
      </Form.Item>
      {/* Phone number*/}
      <Form.Item
        label="Phone number"
        required={false}
        className="form-item-custom phone-validate ant-form-item-required"
        name={'phone'}
        rules={[{ validator: checkPhoneNumberValid }]}
      >
        <MyPhoneInput
          defaultValue={`${profile?.phoneCode ? '+' + profile?.phoneCode : ''}${
            profile?.phone || ''
          }`}
          onChangePhoneNumber={onChangePhoneNumber}
        />
      </Form.Item>
      <Form.Item
        required={false}
        className="form-item-custom phone-validate ant-form-item-required"
        name="phoneCode"
        hidden={true}
      />

      <Row className="m-n8">
        <Col span={12} className="px-8">
          {/* Country */}
          <Form.Item
            name="country"
            label="Country"
            className="form-item-custom"
            rules={validateForm.country}
          >
            <MySelect
              showSearch
              className="select-custom-gray"
              options={optionCountries}
              onChange={_fetchCity}
              allowClear
              valueKey="code"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="px-8">
          {/* Postcode */}
          <Form.Item
            name="postcode"
            label="Postcode (opt)"
            className="form-item-custom "
            rules={validateForm.postcode}
          >
            <Input name={'Postcode'} className="input-custom info-input" />
          </Form.Item>
        </Col>
      </Row>
      {/* Address */}
      <Form.Item
        label="Address"
        name="address"
        className="form-item-custom"
        rules={validateForm.address}
      >
        <Input
          name={'Address'}
          className="input-custom info-input"
          onChange={_onChangeAddress}
        />
      </Form.Item>
      {countries.length > 0 && searchAddress && (
        <MyGoogleMap
          position={position}
          shouldSearch={shouldSearch}
          setPosition={(p) => {
            setShouldSearch(false);
            setPosition(p);
          }}
          address={searchAddress}
          onCenterChange={handleChangeCenter}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  countries: selectCountries(),
  objCountries: selectObjCountries(),
});

export default connect(mapStateToProps)(FindUsAt);
