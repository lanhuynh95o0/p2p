import React, { useEffect } from 'react';
import { MyInput, MySelect, MyButton, InfiniteSelect } from 'components/Atoms';
import { Form, Row, Col } from 'antd';
import { checkFormAntInvalid } from 'utilities/common';
import { createStructuredSelector } from 'reselect';
import { selectCountries, selectCities } from 'states/common/selectors';
import { getCities, getCountries } from 'states/common/actions';
import { connect, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const Step2 = ({
  onGoBack,
  onContinue,
  listCountry,
  listCity,
  dataSubmit,
  isEdit,
  form,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (listCountry && listCountry.length > 0) {
      return;
    }
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (isEmpty(dataSubmit)) {
      return;
    }
    dispatch(getCities(dataSubmit.country));
    form.setFieldsValue({
      address: dataSubmit.address,
      country: dataSubmit.country,
      city: dataSubmit.city,
      postcode: dataSubmit.postcode,
    });
  }, [dataSubmit]);

  const onFinish = (values) => {
    onContinue(values);
  };

  const handleSelectCountry = (value) => {
    dispatch(getCities(value));
    form.setFieldsValue({
      city: null,
    });
  };

  return (
    <>
      <div className="text-center">
        <div className="title">Client address</div>
        <div className="description">
          Enter address of your client’s company
        </div>
      </div>

      <Row justify="center">
        <Col span={23}>
          <Form
            form={form}
            layout="vertical"
            className="form-step-1"
            onFinish={onFinish}
          >
            <Form.Item
              label="Address"
              name="address"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <MyInput
                name="address"
                placeholder="Enter number of unit, street"
              />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <InfiniteSelect
                onSelect={handleSelectCountry}
                options={listCountry}
                valueKey="code"
                className="select-custom-gray"
                placeholder="Select country"
                allowClear={false}
                showSearch
              />
            </Form.Item>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="city"
                  className="form-item-custom"
                  rules={[{ required: true, message: 'Please select city' }]}
                >
                  <InfiniteSelect
                    options={listCity}
                    className="select-custom-gray"
                    placeholder="Select city"
                    allowClear={false}
                    showSearch
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Postcode"
                  name="postcode"
                  className="form-item-custom"
                  required={false}
                >
                  <MyInput name="postcode" placeholder="Enter postcode" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="t-center mt-20" shouldUpdate={true}>
              {() => (
                <>
                  <MyButton
                    onClick={onGoBack}
                    size="large"
                    className="btn-outline-custom mr-10"
                  >
                    Back
                  </MyButton>
                  <MyButton
                    htmlType="submit"
                    size="large"
                    className="btn-primary-custom"
                    disabled={checkFormAntInvalid(form, requiredFiled)}
                  >
                    Continue
                  </MyButton>
                </>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  listCountry: selectCountries(),
  listCity: selectCities(),
});

export default connect(mapStateToProps, null)(Step2);

const requiredFiled = ['address', 'country', 'city'];
