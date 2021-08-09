import React, { useCallback, useEffect, useState } from 'react';
import { Input, MyButton, MySelect } from 'components/Atoms';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Row, Col, notification } from 'antd';
import { getPartnerParticipant, getPartnerAll } from 'states/partner/actions';
import { selectPartnerParticipants } from 'states/partner/selectors';
import { ContractSearchHeader } from 'components/Organisms';
import { selectCategories, selectSkills } from 'states/common/selectors';
import { getSkills, getCategories } from 'states/common/actions';

const Step5 = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories());
  const skills = useSelector(selectSkills());
  const [partners, setPartners] = useState([]);
  const [partnersAll, setPartnersAll] = useState([]);
  const [form] = Form.useForm();
  const [partnerSelected, setPartnerSelected] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  // const [openDropDown, setOpenDropDown] = useState(false);
  const [queryContractor, setQueryContractor] = useState({
    longitude: null,
    latitude: null,
    radiusKilometer: null,
    fromRating: 0,
    industryId: [],
    skillId: [],
    sortBy: 'Newest',
    skip: -1,
    take: -1,
    isRelationship: false,
    option: 1,
  });

  const fetchDataSkills = (categoryIds) => {
    const params = { skip: -1, take: -1 };
    if (categoryIds?.length > 0) {
      params.categoryIds = categoryIds;
    }
    dispatch(getSkills(params));
  };

  useEffect(() => {
    categories.length === 0 && dispatch(getCategories());
    skills.length === 0 && fetchDataSkills();
  }, []);

  useEffect(() => {
    fetchDataSkills(
      queryContractor.industryId.length === categories.length
        ? []
        : queryContractor.industryId
    );
  }, [queryContractor.industryId]);

  useEffect(() => {
    const params = { ...queryContractor };
    params.industryId =
      queryContractor.industryId.length === categories.length
        ? []
        : queryContractor.industryId.map((it) => +it);
    params.skillId =
      queryContractor.skillId === skills.length
        ? []
        : queryContractor.skillId.map((it) => +it);
    dispatch(
      getPartnerAll(params, (data) => {
        setPartnersAll(data.result);
      })
    );
  }, [
    queryContractor.industryId,
    queryContractor.skillId,
    queryContractor.fromRating,
    queryContractor.latitude, queryContractor.longitude, queryContractor.radiusKilometer
  ]);

  useEffect(() => {
    form.setFieldsValue({
      email: '',
    });
    dispatch(getPartnerParticipant());
    setIsDisable(!props.isCreate);
  }, []);

  useEffect(() => {
    if (props.partnerParticipants?.length) {
      setPartners(
        (props.partnerParticipants || []).map((_) => ({
          id: _.id,
          name: _.companyName,
          icon: _.logo,
          email: _.email,
          subDomain: _.subDomain
        }))
      );
    }
  }, [props.partnerParticipants]);

  useEffect(() => {
    switch (queryContractor.option) {
      case 1:
        setPartnerSelected(null);
      case 2:
      case 3:
        setQueryContractor((prevState) => ({ ...prevState, email: '' }));
      default:
        return;
    }
  }, [queryContractor.option]);

  const _onSubmit = (values) => {
    let participantPartner = { id: partnerSelected };
    if (queryContractor.option === 2) {
      participantPartner.email = partners.find(
        (_) => _.id === partnerSelected
      )?.email;
    } else if (queryContractor.option === 3) {
      participantPartner.email = partnersAll.find(
        (_) => _.id === partnerSelected
      )?.email;
    }

    props.onNext({
      participantPartner,
      partnerInvited: values?.email,
    });
  };

  const _changePartnerText = useCallback((e) => {
    setQueryContractor((prevState) => ({ ...prevState, option: 1 }));
    form
      .validateFields()
      .then((values) => {
        setIsDisable(!values.email || false);
      })
      .catch(() => {
        setIsDisable(true);
      });
  }, []);

  const _selectPartner = useCallback((value, option) => {
    // setOpenDropDown(false);
    form.setFieldsValue({
      email: '',
    });
    setQueryContractor((prevState) => ({ ...prevState, option }));
    setPartnerSelected(value);
    setIsDisable(!value);
  }, []);

  const _updateQuery = (obj) => {
    setQueryContractor((prevState) => ({ ...prevState, ...obj }));
  };

  const getFullUrl = () => {
    let optionsFilter = [];
    if (queryContractor.option === 2) {
      optionsFilter = optionsFilter.concat(partners);
    } else if (queryContractor.option === 3) {
      optionsFilter = optionsFilter.concat(partnersAll);
    }
    const partner = optionsFilter.find((item) => item.id === partnerSelected);

    if (!partner?.subDomain) {
      return notification.info({
        message: 'This contractor does not create public url yet!',
      });
    }
    const { protocol, host } = window.location;
    window.open(`${protocol}//${partner.subDomain}.${process.env.REACT_APP_HOST_NAME}`, '_blank');
  };

  return (
    <div className={`${!props.visible && 'd-none'}`}>
      <div className="text-center">
        <h4 className="title">Find contractor</h4>
        <p className="description">
          Select contractor in your list or send invitation to the new one, or
          you can skip to explore later
        </p>
      </div>
      <Form layout="vertical" form={form} onFinish={_onSubmit}>
        <Form.Item
          label="Send invitation to"
          name="email"
          className="form-item-custom"
          rules={[{ type: 'email', message: 'Email is not valid!' }]}
        >
          <Input
            placeholder="Enter contractor email"
            onChange={_changePartnerText}
          />
        </Form.Item>
        <div className="py-20 line-text text-center">
          <div className="line" />
          <span className="label">or</span>
        </div>
        <Row justify="space-between">
          <Col xs={24} sm={18}>
            <MySelect
              value={queryContractor.option === 2 ? partnerSelected : ''}
              onChange={(value) => _selectPartner(value, 2)}
              placeholder="Select contractor"
              className="select-custom-gray"
              allowClear
              showSearch
              options={partners}
              renderItem={(item) => {
                return <span className="my-select-text">{item.name}</span>;
              }}
            />
          </Col>
          <Col xs={24} sm={2}>
            <Row justify="end">
              <Button
                type="link"
                style={{ height: 48 }}
                disabled={!partnerSelected || queryContractor.option !== 2}
                onClick={getFullUrl}
              >
                View profile
              </Button>
            </Row>
          </Col>
        </Row>

        <div className="py-20 line-text text-center">
          <div className="line" />
          <span className="label">or</span>
        </div>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Advanced search</div>
        <ContractSearchHeader
          partners={partnersAll}
          query={queryContractor}
          _updateQuery={_updateQuery}
          categories={categories}
          skills={skills}
        />
        <Row justify="space-between">
          <Col xs={24} sm={18}>
            <MySelect
              value={queryContractor.option === 3 ? partnerSelected : ''}
              placeholder="Select contractor"
              className="select-custom-gray"
              allowClear
              showSearch
              options={partnersAll}
              onChange={(value) => _selectPartner(value, 3)}
              renderItem={(item) => {
                return <span className="my-select-text">{item.name}</span>;
              }}
            // renderItem={(item) => (
            //   <div
            //     style={{
            //       display: 'flex',
            //       justifyContent: 'space-between',
            //     }}
            //   >
            //     <span className="my-select-text">{item.name}</span>
            //     <Button
            //       type="link"
            //       onClick={() => getFullUrl(item.subDomain)}
            //     >
            //       View profile
            //     </Button>

            //   </div>
            // )}
            />
          </Col>
          <Col xs={24} sm={2}>
            <Row justify="end">
              <Button
                type="link"
                style={{ height: 48 }}
                disabled={!partnerSelected || queryContractor.option !== 3}
                onClick={getFullUrl}
              >
                View profile
              </Button>
            </Row>
          </Col>
          <Col span={24}>{partnersAll?.length || 0} result{partnersAll?.length > 1 ? 's' : ''} found</Col>
        </Row>

        <div className="text-center mt-20">
          <MyButton
            onClick={props.onBack}
            className="btn-secondary-custom mx-10"
          >
            Back
          </MyButton>
          <Form.Item noStyle>
            <MyButton
              type="primary"
              htmlType="submit"
              className="btn-primary-custom mx-10"
              disabled={isDisable}
            >
              Complete
            </MyButton>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  partnerParticipants: selectPartnerParticipants(),
});

export default connect(mapStateToProps)(Step5);

Step5.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  isCreate: PropTypes.bool,
};

Step5.defaultProps = {
  visible: false,
  onNext: () => { },
  isCreate: false,
};
