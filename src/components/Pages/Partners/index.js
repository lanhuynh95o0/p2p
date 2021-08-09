import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, MyModal, PageNotFound } from 'components/Atoms';
import { PartnerGrid, PartnerList, SearchPartner } from './components';
import { selectPartnerData } from 'states/partner-admin/selectors';
import { selectCategoriesSkills } from 'states/common/selectors';
import { getPartnersAll } from 'states/partner-admin/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesSkills } from 'states/common/actions';
import 'assets/css/listGrid.scss';
import ModalSendInvitation from '../PublicProfilePartner/components/ModalSendInvitation';
import { Card, Row, Tag } from 'antd';
import Spin from 'components/Atoms/Spin';
import { showModalError } from 'utilities/modal';
import {
  SORT_BY_CONTRACTOR_RELATIONSHIP,
  SORT_BY_TIME,
  VIEW_MODE,
} from 'constants/common';
import PropTypes from 'prop-types';

const Partners = ({ breadcrumb, actionFetchData, partnerSelector }) => {
  const partnerData = useSelector(partnerSelector());
  const listCategorySkill = useSelector(selectCategoriesSkills());
  const dispatch = useDispatch();
  const [view, setView] = useState(VIEW_MODE.GRID);
  const [searchPartner, _setSearchPartner] = useState({
    sortBy: SORT_BY_TIME[0].id,
    skip: 0,
    take: 5,
    terms: '',
    skillId: '',
    longitude: null,
    latitude: null,
    radiusKilometer: null,
    isRelationship: SORT_BY_CONTRACTOR_RELATIONSHIP[0].id,
  });
  const onPagingChange = _setSearchPartner;
  const setSearchPartner = (value) => {
    if (typeof value === 'function') {
      const valueFunc = (oldValue) => {
        oldValue = value(oldValue);
        oldValue.skip = 0;
        oldValue.current = 1;
        return oldValue;
      };
      return _setSearchPartner(valueFunc);
    } else {
      value.skip = 0;
      value.current = 1;
    }
    _setSearchPartner(value);
  }
  const [partnerSelected, setPartnerSelected] = useState(null);

  useEffect(() => {
    _fetchPartners();
  }, [searchPartner]);

  const _fetchPartners = () => {
    dispatch(actionFetchData(searchPartner));
  };

  useEffect(() => {
    dispatch(getCategoriesSkills());
  }, []);

  const onSwitchView = (typeView) => () => {
    setView(typeView);
  };

  const _handleChangePartnerSelected = useCallback(
    (value) => () => setPartnerSelected(value),
    []
  );

  const _invitePartner = useCallback(
    (partner) => () => setPartnerSelected(partner),
    []
  );

  const _visitSite = useCallback(
    (partner) => () => {
      if (!partner.subDomain) {
        return showModalError({
          title: 'Warning',
          content: 'This contractor does not create public url yet!',
        });
      }
      const { protocol, host } = window.location;
      window.open(`${protocol}//${partner.subDomain}.${process.env.REACT_APP_HOST_NAME}`, '_blank');
    },
    []
  );

  const updateSearch = (v) => () => {
    setSearchPartner({
      ...searchPartner,
      ...v,
    });
  };

  const resultText = useMemo(() => {
    if (!searchPartner.longitude && !searchPartner.terms) {
      return null;
    }

    return (
      <>
        Results base on{' '}
        {searchPartner.terms && (
          <Tag
            closable
            onClose={updateSearch({
              terms: '',
            })}
            color="geekblue"
            className="ml-8"
          >
            {searchPartner.terms}
          </Tag>
        )}
        {searchPartner.longitude && searchPartner.terms && <>and</>}
        {searchPartner.longitude && (
          <Tag
            closable
            onClose={updateSearch({
              longitude: null,
              latitude: null,
              radiusKilometer: null,
              address: '',
            })}
            color="geekblue"
            className="ml-8"
          >
            {searchPartner.address || 'location'}
          </Tag>
        )}
      </>
    );
  }, [searchPartner.longitude, searchPartner.terms]);

  const renderList = useMemo(() => {
    if (!partnerData?.result) {
      return (
        <Card className="my-8 text-center p-20">
          <Spin />
        </Card>
      );
    }

    if (!partnerData?.result.length) {
      return <PageNotFound extra="Whoops! Partner not found." />;
    }

    return view === VIEW_MODE.GRID ? (
      <PartnerGrid
        searchPartner={searchPartner}
        onPagingChange={onPagingChange}
        partnerData={partnerData}
        onInvite={_invitePartner}
        onVisitSite={_visitSite}
      />
    ) : (
      <PartnerList
        searchPartner={searchPartner}
        onPagingChange={onPagingChange}
        partnerData={partnerData}
        onInvite={_invitePartner}
        onVisitSite={_visitSite}
      />
    );
  }, [view, partnerData]);

  return (
    <div id="my-grid-list">
      <div className="breadcrumb">
        <Breadcrumb path={breadcrumb} />
      </div>

      <SearchPartner
        partners={partnerData?.result}
        view={view}
        listSkill={listCategorySkill}
        searchPartner={searchPartner}
        setSearchPartner={setSearchPartner}
        onSwitchView={onSwitchView}
      />
      <Row className="my-10">{resultText}</Row>
      {renderList}

      <MyModal
        visible={!!partnerSelected}
        onClose={_handleChangePartnerSelected(null)}
      >
        <ModalSendInvitation
          onClose={_handleChangePartnerSelected(null)}
          onSubmit={_fetchPartners}
          partnerName={partnerSelected?.name}
          email={partnerSelected?.email}
        />
      </MyModal>
    </div>
  );
};

export default Partners;

Partners.propTypes = {
  breadcrumb: PropTypes.array,
  actionFetchData: PropTypes.func,
  partnerSelector: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};

Partners.defaultProps = {
  breadcrumb: [{ name: 'Contractors' }],
  actionFetchData: getPartnersAll,
  partnerSelector: selectPartnerData,
};
