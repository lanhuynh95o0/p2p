import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import {
  Image,
  MyButton,
  MyModal,
  PageNotFound,
  VideoBanner,
} from 'components/Atoms';
import { Button, Col, Row, Modal } from 'antd';
import Spin from 'components/Atoms/Spin';
import { connect, useDispatch } from 'react-redux';
import { getPartnerBySubdomain } from 'states/partner/actions';
import DefaultBanner from 'assets/images/profile/defaultBanner.jpg';
import Skill from './components/Skill';
import Review from './components/Review';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUserInfo } from 'states/auth/selectors';
import ModalSendInvitation from './components/ModalSendInvitation';
import ModalSendContact from './components/ModalSendContact';
import { getCurrentUser } from 'states/auth/actions';
import { isVideo } from 'utilities/common';

const PublicProfilePartner = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [profile, setProfile] = useState({});
  const [modalInvitation, setModalInvitation] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [isBannerVideo, setIsBannerVideo] = useState(false);

  const isShowAction = useMemo(
    () =>
      props.token &&
      props.profile?.email &&
      props.profile.email !== profile?.email,
    [props.token, props.profile?.email, profile?.email]
  );

  useEffect(() => {
    if (props.token) dispatch(getCurrentUser(() => {}));
  }, [props.token]);

  useEffect(() => {
    _fetchProfileData();
  }, []);

  const _fetchProfileData = useCallback(() => {
    dispatch(
      getPartnerBySubdomain(
        props.subdomain,
        (data) => {
          setProfile(data);
          if (data?.banner) {
            setIsBannerVideo(isVideo(data?.banner));
          }
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          setIsError(true);
        }
      )
    );
  }, []);

  const _switchModalInvitation = useCallback(
    (value) => () => setModalInvitation(value),
    []
  );

  const _switchModalContact = useCallback(
    (value) => () => setModalContact(value),
    []
  );

  const _backToHome = useCallback(() => {
    const { protocol, port, hostname } = window.location;
    window.location.replace(
      `${protocol}//${hostname.replace(/^[^.]+\./g, '')}${
        port ? `:${port}` : ''
      }`
    );
  }, []);

  if (isLoading) {
    return (
      <div className="my-loading-full-window">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <PageNotFound
        className="partner-profile-not-found"
        extra={
          <div className="text-center">
            <p>Whoops! Page not found.</p>
            <Button className="btn-primary-custom" onClick={_backToHome}>
              Back Home
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <div id="partners-profile">
      <div className="partners-profile">
        <div className="partners-profile-top">
          <div className="cover">
            {!isBannerVideo ? (
              <Image
                alt="cover"
                className="cover-photo"
                src={profile.banner}
                defaultSrc={DefaultBanner}
              />
            ) : (
              <VideoBanner src={profile.banner} />
            )}
          </div>
          <Row className="profile-top-info pb-10 px-15 px-sm-30">
            <Col xs={24} sm={12} className="top-info-left">
              <Image alt="avatar" className="avatar" src={profile.logo} />
              <span className="partner-name m-10">{profile.companyName}</span>
            </Col>

            <Col xs={24} sm={12}>
              <div className="top-info-right">
                <div className="btn-invitation ">
                  <MyButton
                    className="btn-primary-custom"
                    onClick={
                      isShowAction
                        ? _switchModalInvitation(true)
                        : _switchModalContact(true)
                    }
                  >
                    {isShowAction ? 'Send invitation' : 'Contact Us'}
                  </MyButton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row className="content mx-n8">
          {/*Left side*/}
          <Col xs={24} sm={12} className="p-8">
            {/*About us*/}
            <div className="block p-10">
              <h2 className="title">About us</h2>
              <div className=" param-wrapper mt-5 mb-5">{profile.aboutUs}</div>
            </div>

            <Skill skills={profile.skills || []} />
          </Col>
          {/*Right side*/}
          <Col xs={24} sm={12} className="p-8">
            {/*Statistic*/}
            <div className="block p-10">
              <Row>
                <Col span={12} className="statistic">
                  <p className="title m-0">Own Projects</p>
                  <p className="count-number m-0">{profile.ownProjects || 0}</p>
                </Col>
                <Col span={12} className="statistic">
                  <p className="title m-0">Assigned Jobs</p>
                  <p className="count-number m-0">
                    {profile.assignedJobs || 0}
                  </p>
                </Col>
              </Row>
            </div>
            {/* Jobs */}
            {/* <Job jobs={profile.jobs} /> */}
            {/* Reviews */}
            <Review profile={profile} />
          </Col>
        </Row>
        <MyModal
          visible={modalInvitation}
          onClose={_switchModalInvitation(false)}
        >
          <ModalSendInvitation
            onClose={_switchModalInvitation(false)}
            onSubmit={_fetchProfileData}
            partnerName={profile.companyName}
            email={profile.email}
          />
        </MyModal>
        <MyModal visible={modalContact} onClose={_switchModalContact(false)}>
          <ModalSendContact
            onClose={_switchModalContact(false)}
            partnerId={profile.id}
          />
        </MyModal>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  profile: selectUserInfo(),
});

export default connect(mapStateToProps)(PublicProfilePartner);
