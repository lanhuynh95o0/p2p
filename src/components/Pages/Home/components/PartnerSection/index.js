import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PARTNERS, PARTNERS_RELATIONSHIP } from 'routers/route-path';
import ListDashboard, {
  LIST_DASHBOARD_TYPE,
} from 'components/Pages/Home/components/ListDashboard';
import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME } from 'states/dashboard/constants';
import ModalSendInvitation from 'components/Pages/PublicProfilePartner/components/ModalSendInvitation';
import { MyModal } from 'components/Atoms';
import useActions from 'hooks/useActions';
import { fetchAll } from 'states/dashboard/actions';

const PartnerSection = ({ isShowAds }) => {
  const partners = useSelector(commonSelector(STATE_NAME, 'partners'));
  const [partnerSelected, setPartnerSelected] = useState(null);
  const [onfetchDashboardAction] = useActions([fetchAll]);

  const _handleChangePartnerSelected = useCallback(
    (value) => () => setPartnerSelected(value),
    []
  );

  return (
    <Col lg={isShowAds ? 24 : 12} xs={24}>
      <Row justify="space-between">
        <h3 className="dash-board-title mb-16">My Contractors</h3>

        <Link to={PARTNERS_RELATIONSHIP}>
          <Button type="link" className="view-all-btn">
            View all
          </Button>
        </Link>
      </Row>

      <ListDashboard
        dataSource={partners}
        onAddPartner={setPartnerSelected}
        type={LIST_DASHBOARD_TYPE.PARTNER}
      />

      <MyModal
        visible={!!partnerSelected}
        onClose={_handleChangePartnerSelected(null)}
      >
        <ModalSendInvitation
          onClose={_handleChangePartnerSelected(null)}
          onSubmit={onfetchDashboardAction}
          partnerName={partnerSelected?.name}
          email={partnerSelected?.email}
        />
      </MyModal>
    </Col>
  );
};

PartnerSection.propTypes = {
  isShowAds: PropTypes.bool,
  partners: PropTypes.array,
};

export default memo(PartnerSection);
