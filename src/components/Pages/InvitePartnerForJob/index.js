import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MyButton, PageNotFound, TimeLeft } from 'components/Atoms';
import 'assets/css/detailPage.scss';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Statistic from './components/Statistic';
import Information from './components/Information';
import Documents from './components/Documents';
import Notes from './components/Notes';
import Register from './components/SignUp';
import { Col, Layout, Row } from 'antd';
import {
  deleteJobInvitation,
  getJobInvitation,
  updateJobInvitation,
} from 'states/job/actions';
import { partnerValidateEmail } from 'states/partner/actions';
import { createStructuredSelector } from 'reselect';
import { selectToken } from 'states/auth/selectors';
import { Header, SideBar } from 'components/Organisms';
import SiteHeaderPublic from 'components/Organisms/PublicHeader';
import ModalFinishInvitation from './components/ModalFinishInvitation';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { showModalConfirm } from 'utilities/modal';
import { getCurrentUser } from 'states/auth/actions';
import { LOGIN } from 'routers/route-path';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

const InvitePartner = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [job, setJob] = useState(null);
  const [emailInvited, setEmailInvited] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const inviteCode = useMemo(() => props.match.params.id, []);
  const isLogin = useMemo(() => !!props.token, [props.token]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    if (isLogin) {
      dispatch(getCurrentUser((data) => { }));
    }
    _loadPage();
  }, []);

  const _reject = () => {
    showModalConfirm({
      title: 'Notice',
      content:
        "Are you sure to reject this job? You can't view it after rejecting it unless owner re-invite you.",
      cancelText: 'Cancel',
      okText: 'Reject',
      onOk: () =>
        dispatch(deleteJobInvitation(inviteCode, () => setIsReject(true))),
    });
  };

  const _accept = () => {
    dispatch(
      partnerValidateEmail(
        emailInvited,
        // Email not existed, signup.
        () => {
          showModalConfirm({
            title: 'Notice',
            content: `You don't have an account yet. Click "Sign up" create one and accept this job.`,
            cancelText: 'Cancel',
            okText: 'Sign up',
            onOk: () => setIsSignup(true),
          });
        },
        // Email existed, update job invitation.
        () => {
          if (isLogin) {
            _updateInvitation();
          } else {
            showModalConfirm({
              title: 'Notice',
              content:
                'You are not logged in. Please log in to accept the job invitation',
              cancelText: 'Cancel',
              okText: 'Log in',
              onOk: () => history.push(LOGIN),
            });
          }
        }
      )
    );
  };

  const _loadPage = useCallback(() => {
    dispatch(
      getJobInvitation(
        inviteCode,
        (data) => {
          setJob({ ...data.job, partnerName: data.partnerName });
          setEmailInvited(data.invitedParticipantEmail);
        },
        () => setJob(undefined)
      )
    );
  }, []);

  const _updateInvitation = () => {
    dispatch(
      updateJobInvitation(inviteCode, (data) => {
        setIsRedirect(data);
        setIsSignup(false);
        setIsAccepted(true);
      })
    );
  };

  const _renderBody = useMemo(() => {
    if (job) {
      return (
        <div id="detail-page">
          <TimeLeft time={job.endDate} isComplete={job.isCompleted} />
          <div className="info-header invite-info-header mb-10">
            <h4 className="header-text">{job.name}</h4>
            <MyButton className="btn-primary-custom mx-8" onClick={_accept}>
              <Icon component={IconCustom.Checked} />
              Accept
            </MyButton>
            <MyButton
              className="btn-secondary-custom mx-8 btn-reject"
              onClick={_reject}
            >
              <Icon component={IconCustom.Close} />
              Reject
            </MyButton>
          </div>
          <Statistic job={job} />
          <Row className="px-n8">
            <Col xs={24} md={8} className="px-8">
              <Information
                job={job}
                projectId={job.projectId || null}
                onRefreshPage={_loadPage}
              />
            </Col>
            <Col xs={24} md={16} className="px-8">
              <Notes job={job} onRefreshPage={_loadPage} />
              <Documents job={job} onRefreshPage={_loadPage} />
            </Col>
          </Row>
        </div>
      );
    }
    if (job === undefined) return <PageNotFound />;
  }, [job, isAccepted, isReject, isLogin, emailInvited]);

  if (isSignup) {
    return <Register email={emailInvited} onSubmit={_updateInvitation} />;
  }

  return (
    <Layout id="invite-partner-job" className="site-layout">
      {(isLogin && <SideBar />) || null}
      <Layout className="page-layout">
        {(isLogin && <Header className="site-layout-background" />) || (
          <SiteHeaderPublic className="site-layout-background" />
        )}
        <Content className="page-content">
          <div className="content">{_renderBody}</div>
          <ModalFinishInvitation
            isAccepted={isAccepted}
            isRejected={isReject}
            job={job}
            isLogin={isLogin}
            isRedirect={isRedirect}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
});

export default withRouter(connect(mapStateToProps)(InvitePartner));
