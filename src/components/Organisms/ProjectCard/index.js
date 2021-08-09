import React from 'react';
import { Card, Col } from 'antd';
import { Image, MyProgress, TimeLeft } from 'components/Atoms';
import Action from 'components/Pages/Projects/components/Action';
import ProjectSkeleton from 'components/Organisms/ProjectCard/Skeleton';
import PropTypes from 'prop-types';
import 'assets/css/listGrid.scss';
import { Link } from 'react-router-dom';
import { PROJECT_DETAIL } from 'routers/route-path';
import { useHistory } from 'react-router-dom';

const ProjectCard = ({
  item,
  isDelete = false,
  loading = false,
  isEnableLink = false,
  onDeleteProject = () => null,
  breakPoint,
}) => {
  const history = useHistory();
  const { xl, lg, xs, md } = breakPoint;
  if (loading) return <ProjectSkeleton {...breakPoint} />;

  const _renderPartnerParticipant = (participantPartners) => {
    if (participantPartners?.length) {
      const additionPartner = Math.max(participantPartners.length - 4, 0);
      return (
        <>
          {participantPartners.slice(0, 4).map((item) => (
            <div key={item} className="partner-participant-item">
              <Image src={item} alt="business logo" />
            </div>
          ))}
          {(additionPartner && (
            <div className="partner-participant-item">
              <div>+{additionPartner}</div>
            </div>
          )) ||
            null}
        </>
      );
    }
    return null;
  };

  const CardContent = () => (
    <>
      <div className="header">
        <div
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => history.push(PROJECT_DETAIL.replace(':id', item.id))}
        >
          <Image className="avatar" src={item.partnerLogo} />
          <div className="info">
            <div className="text-md">{item.name}</div>
            <div className="code">{item.code}</div>
          </div>
        </div>

        {isDelete && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <Action item={item} onDeleteProject={onDeleteProject} />
          </div>
        )}
      </div>
      <TimeLeft time={item.endDate} isComplete={item.process === 100}/>
      <div className="py-8 py-sm-16">
        <span className="text-md">{item.description}</span>
      </div>

      <MyProgress percent={item.process} className="pb-8 pb-sm-16" />
      {item?.participantPartnerLogo?.length > 0 && (
        <>
          <h4 className="title pt-16">Contractor</h4>
          <div className="partner-participant-list pl-16">
            {_renderPartnerParticipant(item.participantPartnerLogo)}
          </div>
        </>
      )}
    </>
  );

  return (
    <Col
      {...{ xl, lg, xs, md }}
      key={item.id}
      id="my-grid-list"
      style={{ position: 'relative' }}
    >
      <div className="grid-item">
        <Card>
          {isEnableLink ? (
            <Link to={PROJECT_DETAIL.replace(':id', item.id)}>
              <CardContent />
            </Link>
          ) : (
            <CardContent />
          )}
        </Card>
      </div>
    </Col>
  );
};

ProjectCard.propTypes = {
  isDelete: PropTypes.bool,
  loading: PropTypes.bool,
  onDeleteProject: PropTypes.func,
  breakPoint: PropTypes.shape({
    xl: PropTypes.number,
    lg: PropTypes.number,
    xs: PropTypes.number,
    md: PropTypes.number,
  }),
};

ProjectCard.defaultProps = {
  breakPoint: {
    xl: 6,
    lg: 8,
    xs: 24,
    md: 12,
  },
};

export default React.memo(ProjectCard);
