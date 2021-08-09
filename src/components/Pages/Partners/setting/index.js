import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { CameraOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Image,
  Input,
  MyButton,
  VideoBanner,
  ImgCrop
} from 'components/Atoms';
import { Col, Form, Row, Upload, notification } from 'antd';
import { createStructuredSelector } from 'reselect';
import JobManagement from './JobManagement';
import DefaultAvatar from 'assets/images/profile/defaultAvatar.png';
import DefaultBanner from 'assets/images/profile/defaultBanner.jpg';
import AboutUs from './AboutUs';
import FindUsAt from './FindUsAt';
import PersonalInfo from './PersonalInfo';
import APIManagement from './APIManagement';
import Review from 'components/Pages/PublicProfilePartner/components/Review';
import { useSelector } from 'react-redux';

import { selectUserInfo } from 'states/auth/selectors';
import {
  partnerValidateSubdomain,
  updatePartner,
} from 'states/partner/actions';
import { getCurrentUser } from 'states/auth/actions';
import { getCities, uploadFile } from 'states/common/actions';
import Skill from './Skill';
import { SUBDOMAIN_PATTERN } from 'constants/common';
import { messageAction } from 'utilities/message';
import { has } from 'lodash';
import './styles.scss';
import copy from 'copy-to-clipboard';
import { selectPartnerInfo } from 'states/partner/selectors';
import { ACCOUNT_TYPE } from 'constants/account';
import { isVideo } from 'utilities/common';
import { showModalError } from 'utilities/modal';
import { SUBSCRIPTIONS } from 'routers/route-path';
import { COLORS } from 'constants/config';

const PartnersProfile = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [banner, setBanner] = useState(null);
  const [isBannerVideo, setIsBannerVideo] = useState(false);
  const [logo, setLogo] = useState(null);
  const [checkUrl, setCheckUrl] = useState(false);
  const [position, setPosition] = useState(null);
  const [isCopy, setCopy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const partnerInfo = useSelector(selectPartnerInfo());

  useEffect(() => {
    _fetchProfile();
  }, []);

  useEffect(() => {
    setBanner(null);
    setLogo(null);
    if (props.profile) {
      form.setFieldsValue(props.profile);
      props.profile?.subDomain && setPreviewUrl(props.profile?.subDomain);
      if (props.profile?.banner) {
        setIsBannerVideo(isVideo(props.profile.banner));
      }
    }

    if (props.profile?.country) dispatch(getCities(props.profile.country));
  }, [props.profile]);

  useEffect(() => {
    const { longitude, latitude } = props.profile;

    if (longitude && latitude) {
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [props.profile.longitude, props.profile.latitude]);

  const _cancel = useCallback(() => {
    form.setFieldsValue(props.profile);
    if (props.profile?.banner) {
      setIsBannerVideo(isVideo(props.profile.banner));
    }
    setLogo(null);
    setBanner(null);
  }, [props.profile]);

  const _changeImage = useCallback(
    (action) => async (file) => {
      setIsBannerVideo(isVideo(file.name));
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
      }
      action(
        Object.assign(file, {
          preview: src,
        })
      );
    },
    []
  );

  const _fetchProfile = useCallback(() => {
    dispatch(getCurrentUser(() => { }));
  }, []);

  const _handleInputUrl = () => {
    dispatch(
      partnerValidateSubdomain(
        form.getFieldValue('subDomain'),
        () => {
          const subDomain = form.getFieldValue('subDomain');
          const { protocol, host } = window.location;
          const url = subDomain ? `${protocol}//${subDomain}.${process.env.REACT_APP_HOST_NAME}` : '';
          setCheckUrl(false);
          form.validateFields(['subDomain']);
          setPreviewUrl(url);
        },
        (message) => {
          setCheckUrl(message);
          form.validateFields(['subDomain']);
        }
      )
    );
  };

  const _handleUploadFile = useCallback(async (file) => {
    return new Promise((resolve, reject) => {
      dispatch(uploadFile(file, {}, resolve));
    });
  }, []);

  const onFinish = async (values) => {
    if (banner) {
      const data = await _handleUploadFile(banner);
      values.bannerUrl = data.slug;
    }
    if (logo) {
      const data = await _handleUploadFile(logo);
      values.organizationLogoUrl = data.slug;
    }

    let payload = {
      ...values,
      skills: (values?.skills || []).map((skill) => ({
        ...skill,
        id: skill.id || 0,
        documents: (skill.documents || []).map((document) => ({
          id: has(document, 'attachment')
            ? document.attachment.id
            : document.id,
          slug: has(document, 'attachment')
            ? document.attachment.slug
            : document.slug,
        })),
      })),
    };

    if (position) {
      payload.latitude = position.lat;
      payload.longitude = position.lng;
    }

    dispatch(
      updatePartner(payload, () => {
        messageAction.updateProfileSuccess(form);
        _fetchProfile();
      })
    );
  };

  const fullUrl = (function () {
    const subDomain = form.getFieldValue('subDomain');
    const { protocol, host } = window.location;
    return `${protocol}//${subDomain}.${process.env.REACT_APP_HOST_NAME}`;
  })();

  const clickCopy = () => {
    copy(fullUrl);

    setCopy(true);
    setTimeout(() => setCopy(false), 1000);
  };

  const showURLInput = useMemo(() => {
    if (
      !partnerInfo?.accountType ||
      partnerInfo?.accountType === ACCOUNT_TYPE.PARTNER_LITE
    ) {
      return false;
    } else {
      return true;
    }
  }, [partnerInfo]);

  const _renderBanner = useMemo(() => {
    return !isBannerVideo ? (
      <Image
        alt="cover"
        className="cover-photo"
        src={banner?.preview || props.profile?.banner}
        defaultSrc={DefaultBanner}
      />
    ) : (
      <VideoBanner src={banner?.preview || props.profile?.banner} />
    );
  }, [isBannerVideo, banner, props.profile]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
      onFinishFailed={() => {
        notification.error({ message: 'Please input all fields required' });
      }}
    >
      <div className="partners-setting">
        <Breadcrumb path={[{ name: 'Profile Setting' }]} className="mb-0" />
        <div className="mb-20">
          If you are paying for a subscription, this is your mini website – what you create here will be seen on the web – this is your chance to shine!
          <br />
          If you are using the free version this is your business profile. <a target="_blank" href={SUBSCRIPTIONS}>Click here to upgrade to a website.</a>
        </div>
        <div className="partners-setting-top">
          <div className="cover">
            {/* Image Cover */}
            {_renderBanner}
            {/* Update Cover */}

            <label className="button-edit-photo p-5 p-sm-10 radius-5">
              <ImgCrop fillColor={COLORS.WHITE}
                cropperProps={{ restrictPosition: false }}
                minZoom={0.1}
                maxZoom={5}
                aspect={3.5}
                beforeCrop={(file, fileList) => {
                  if (isVideo(file.name)) {
                    const isLt15M = file.size / 1024 / 1024 < 15;
                    if (!isLt15M) {
                      showModalError({
                        content: 'Video must be less than 15 MB',
                      });
                    } else {
                      file.status = 'uploading';
                      _changeImage(setBanner)(file);
                    }
                    return false;
                  }
                  return true;
                }}
              >
                <Upload
                  showUploadList={false}
                  customRequest={() => { }}
                  beforeUpload={_changeImage(setBanner)}
                  accept="image/*,video/*"
                >
                  <MyButton type="link">
                    <CameraOutlined /> 
                    <span>
                      Edit
                      <span className="d-sm-none"> cover</span>
                    </span>
                  </MyButton>
                </Upload>
              </ImgCrop>
            </label>
          </div>
          <Row>
            <Col xs={24} md={12} className="top-info-left">
              {/* Image Logo*/}
              <Image
                alt="avatar"
                className="avatar ml-30"
                src={logo?.preview || props.profile?.logo}
                defaultSrc={DefaultAvatar}
              />
              {/* Partner name */}
              <div className="partner-name">
                <Form.Item
                  name="companyName"
                  className="mb-0 ml-10"
                  rules={validateForm.partnerName}
                >
                  <Input className="input-partner-name p-0" suffix={<></>} />
                </Form.Item>
              </div>
              <div className="edit-avatar ml-30">
                {/* Update Logo */}
                  <ImgCrop fillColor={COLORS.WHITE}
                    cropperProps={{ restrictPosition: false }}
                    minZoom={0.1} maxZoom={5} grid>
                    <Upload
                      showUploadList={false}
                      customRequest={() => { }}
                      beforeUpload={_changeImage(setLogo)}
                    >
                      <MyButton type="link">
                        <CameraOutlined /> Change picture
                      </MyButton>
                    </Upload>
                  </ImgCrop>
              </div>
            </Col>
            <Col xs={24} md={12}>
              {showURLInput && (
                <div className="top-info-right">
                  {/* Sub Domain */}
                  <Row justify="end">
                    <Col className="mr-10">
                      <a onClick={clickCopy}>
                        Copy URL {isCopy ? '(copied)' : null}
                      </a>
                    </Col>
                    {previewUrl && (
                      <Col>
                        <a href={fullUrl} target="_blank">
                          Preview website
                        </a>
                      </Col>
                    )}
                  </Row>
                  <Row className="wrapper">
                    <span className="mr-10">Update URL</span>
                    <div className="d-inline-block">
                      <Form.Item
                        name="subDomain"
                        className="mb-0"
                        validateStatus="error"
                        rules={[
                          ...validateForm.url,
                          () => ({
                            validator: () =>
                              checkUrl
                                ? Promise.reject(checkUrl)
                                : Promise.resolve(),
                          }),
                        ]}
                      >
                        <Input
                          className="input-url"
                          suffix={<></>}
                          onBlur={_handleInputUrl}
                        />
                      </Form.Item>
                    </div>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </div>
        {/* <Row justify="end" align="middle">
          <Col className="mr-10">
            Do not show my avatar and company name on all reviews
          </Col>
          <Col>
            <Form.Item
              name="reviewAsAnonymous"
              className="mb-0"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row> */}
        <Row className="content mx-n8">
          {/*Left side*/}
          <Col xs={24} md={12} className="p-8">
            {/*About us*/}
            <AboutUs form={form} />
            {/* Find us */}
            <FindUsAt
              form={form}
              validateForm={validateForm}
              profile={props.profile}
              position={position}
              setPosition={setPosition}
            />
            {/* Personal Information */}
            <PersonalInfo form={form} validateForm={validateForm} />
            {/* API Management */}
            <APIManagement
              form={form}
              partnerInfo={partnerInfo}
              profile={props.profile}
            />
            {/* Skill */}
            <Skill skills={props.profile?.skills} form={form} />
          </Col>
          {/*Right side*/}
          <Col xs={24} md={12} className="p-8">
            {/* Jobs */}
            <JobManagement
              profile={props.profile}
              jobs={props.profile?.jobs}
              onRefreshPage={_fetchProfile}
            />

            <Review profile={props?.profile} />
          </Col>
        </Row>
        <div className="footer">
          <MyButton
            className="btn-secondary-custom btn-add-job mx-10"
            size={'large'}
            onClick={_cancel}
          >
            Cancel
          </MyButton>
          <Form.Item noStyle>
            <MyButton
              type="primary"
              htmlType="submit"
              className="btn-primary-custom btn-add-job mx-10"
              size={'large'}
            >
              Save changes
            </MyButton>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: selectUserInfo(),
});

export default connect(mapStateToProps, null)(PartnersProfile);

const validateForm = {
  partnerName: [{ required: true, message: 'Please input your company name!' }],
  url: [
    { required: true, message: 'Please input your url!' },
    { pattern: SUBDOMAIN_PATTERN, message: 'Url is invalid' },
  ],
  email: [
    { required: true, message: 'Please input your email!' },
    { type: 'email', message: 'Email is not valid!' },
  ],
  phoneNumber: [{ required: true, message: 'Please input your phone number!' }],
  country: [{ required: true, message: 'Please select your country!' }],
  city: [{ required: true, message: 'Please select your city!' }],
  address: [{ required: true, message: 'Please input your address!' }],
  firstname: [{ required: true, message: 'Please input your first name!' }],
  lastname: [{ required: true, message: 'Please input your last name!' }],
  title: [{ required: true, message: 'Please input your title!' }],
};
