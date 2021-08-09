import React, { useEffect } from 'react';

import './styles.scss';
import useActions from 'hooks/useActions';
import { fetchAll } from 'states/dashboard/actions';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME } from 'states/dashboard/constants';
import { Button, Row } from 'antd';
import ProjectCard from 'components/Organisms/ProjectCard';
import { PROJECTS } from 'routers/route-path';
import { Link } from 'react-router-dom';
import NormalAccount from './layouts/NormalAccount';
import { ACCOUNT_TYPE, PARTNER_SHOW_AD } from 'constants/account';
import { selectPartnerInfo } from 'states/partner/selectors';
import PartnerSection from 'components/Pages/Home/components/PartnerSection';
import ClientsSection from 'components/Pages/Home/components/ClientsSection';

const breakPointWithoutNormalAccount = {
  // xl: 12,
  // lg: 12,
  // md: 24,
  xs: 24,
  md: 12,
};

const breakPointPremium = {
  xl: 6,
  lg: 8,
  xs: 24,
  md: 12,
};

const Home = ({ }) => {
  const partnerInfo = useSelector(selectPartnerInfo());
  const [onfetchDashboardAction] = useActions([fetchAll]);
  const loading = useSelector(commonSelector(STATE_NAME, 'loading'));
  const projects = useSelector(commonSelector(STATE_NAME, 'projects'));

  useEffect(() => {
    onfetchDashboardAction();
  }, []);

  const isShowAds = PARTNER_SHOW_AD.includes(partnerInfo?.accountType);

  const ProjectSection = () => (
    <>
      <Row justify="space-between">
        <h3 className="dash-board-title mb-16">You recently opened</h3>

        <Link to={PROJECTS}>
          <Button type="link" className="view-all-btn mb-0">
            View all projects
          </Button>
        </Link>
      </Row>

      <Row className="mb-15 mb-sm-30" gutter={[16, 16]}>
        {projects.map((item, key) => (
          <ProjectCard
            {...{
              item,
              key,
              loading,
              isEnableLink: true,
              breakPoint: isShowAds
                ? breakPointWithoutNormalAccount
                : breakPointPremium,
            }}
          />
        ))}
      </Row>
    </>
  );

  const isNotPartnerLite = partnerInfo?.accountType != ACCOUNT_TYPE.PARTNER_LITE;

  if (isShowAds)
    return (
      <NormalAccount>
        {
          isNotPartnerLite &&
          <ProjectSection />
        }
        {
          isNotPartnerLite &&
          <PartnerSection isShowAds={isShowAds} />
        }

        <ClientsSection isShowAds={isShowAds} />
      </NormalAccount>
    );

  return (
    <div className="home-page">
      <ProjectSection />

      <Row gutter={[16, 16]}>
        <PartnerSection isShowAds={isShowAds} />

        <ClientsSection isShowAds={isShowAds} />
      </Row>
    </div>
  );
};

Home.propTypes = {};

export default Home;
