import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Row, Col, Rate } from 'antd';
import { SearchInput, MySelect, MySelectGroup, SearchByLocation, PartnerMarkerInfo } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { debounced } from 'utilities/common';
import {
  SORT_BY_CONTRACTOR_RELATIONSHIP,
  SORT_BY_TIME,
  VIEW_MODE,
  SORT_BY_RATING,
} from 'constants/common';
import DefaultContractorLogo from 'assets/images/profile/defaultContractorLogo.png';

const SearchPartner = ({
  view,
  onSwitchView,
  searchPartner,
  setSearchPartner,
  listSkill,
  partners
}) => {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const lastShowPartner = useRef();
  const infoWindowRef = useRef();

  let lastSearchPosition;
  if (searchPartner) {
    const { latitude, longitude } = searchPartner;
    lastSearchPosition = {
      lat: latitude,
      lng: longitude
    };
  }

  useEffect(() => {
    setSearch(searchPartner.terms);
  }, [searchPartner.terms]);

  const onPartnerMarkerClick = useCallback((partner) => () => {
    const { protocol, host } = window.location;
    window.open(`${protocol}//${partner.subDomain}.${process.env.REACT_APP_HOST_NAME}`, '_blank');
  }, []);

  useEffect(() => {
    if (!partners) return;
    const newLocations = partners.map(partner => ({
      partner,
      width: 40, height: 40,
      lat: partner.latitude,
      lon: partner.longitude,
      infoContent: <PartnerMarkerInfo partner={partner}
        onClick={partner.subDomain ? onPartnerMarkerClick(partner) : null} />,
      iconUrl: partner.logo || DefaultContractorLogo
    }));
    setLocations(newLocations);
  }, [partners]);

  const handleSearchText = (e) => {
    const value = e.target.value;

    setSearch(value);

    debounced(() => {
      setSearchPartner({
        ...searchPartner,
        terms: value,
        current: 1,
        skip: 0,
        take: 5,
        fromRating: 0,
      });
    });
  };

  const handleSearchByLocation = (query) => {
    setSearchPartner({
      ...searchPartner,
      ...query,
      current: 1,
      skip: 0,
      take: 5,
    });
  };

  const onSearchPartner = (key, value) => {
    setSearchPartner({
      ...searchPartner,
      [key]: value,
    });
  };

  const renderRatingOptions = (item) => {
    switch (item.value) {
      case 0:
        return 'Select all';
      case 5:
        return '5 Only';
      default:
        return `${item.label} and up`;
    }
  };

  const onInfoWindowShow = (location) => {
    if (lastShowPartner.current && lastShowPartner.current.partner !== location?.partner) {
      lastShowPartner.current.element.classList.remove('custom-gm-iw');
    }

    if (location?.partner) {
      const partnerMarker = document.querySelector(`#partner-marker-info-${location.partner.id}`);
      let parent = partnerMarker.parentElement;
      while (parent && !parent.classList.contains('gm-style-iw-a')) {
        parent = parent.parentElement;
      }
      if (parent) {
        parent.classList.add('custom-gm-iw');
        partnerMarker.classList.remove('d-none');
        lastShowPartner.current = { partner: location.partner, element: parent };
      }
    } else {
      lastShowPartner.current = null;
    }
  }

  const onMapClick = () => {
    if (infoWindowRef.current) {
      infoWindowRef.current.setMap(null);
    }
    if (lastShowPartner.current) {
      lastShowPartner.current.element.classList.remove('custom-gm-iw');
      lastShowPartner.current = null;
    }
  };

  const shouldRerenderIw = (location) => {
    return !lastShowPartner.current || lastShowPartner.current.partner !== location?.partner;
  }

  return (
    <Row gutter={[6, 16]}>
      <Col xs={24} md={6}>
        <Row gutter={[8]}>
          <Col xs={20} md={18}>
            <SearchInput
              placeholder="Search contractors"
              onChange={handleSearchText}
              id="search-partner"
              value={search}
            />
          </Col>
          <Col>
            <SearchByLocation
              infoWindowRef={infoWindowRef}
              onInfoWindowShow={onInfoWindowShow}
              onMapClick={onMapClick}
              shouldRerenderIw={shouldRerenderIw}
              lastSearchPosition={lastSearchPosition}
              defaultMarkerSrc={DefaultContractorLogo}
              locations={locations}
              handleSearch={handleSearchByLocation}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={18}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={2}>
            <div className="d-table w-100p h-100p text-md-right px-5 px-md-0">
              <span className="text-md d-table-cell va-m">Filter by</span>
            </div>
          </Col>
          <Col xs={24} md={5}>
            <MySelectGroup
              dropdownClassName="dropdown-group-skill"
              showSearch
              allowClear
              value={searchPartner.skillId || null}
              className="select-group-white-custom"
              placeholder="All skill"
              options={listSkill}
              onChange={(value) => onSearchPartner('skillId', value)}
            />
          </Col>
          <Col xs={12} md={5}>
            <MySelect
              value={searchPartner.isRelationship}
              className="select-custom-white w-100p"
              options={SORT_BY_CONTRACTOR_RELATIONSHIP}
              onChange={(value) => onSearchPartner('isRelationship', value)}
              allowClear={false}
            />
          </Col>
          <Col xs={12} md={6}>
            <MySelect
              placeholder="Rating"
              value={searchPartner.fromRate}
              className="select-custom-white w-100p"
              onChange={(value) => {
                onSearchPartner('fromRating', value);
              }}
              allowClear={false}
              options={SORT_BY_RATING}
              renderItem={(it) => renderRatingOptions(it)}
            />
          </Col>
          <Col xs={24} md={2}>
            <div className="d-table w-100p h-100p text-md-right px-5 px-md-0">
              <span className="text-md d-table-cell va-m">Sort by</span>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <MySelect
              value={searchPartner.sortBy || null}
              className="select-custom-white w-100p"
              options={SORT_BY_TIME}
              onChange={(value) => onSearchPartner('sortBy', value)}
              allowClear={false}
            />
          </Col>
          <Col flex="auto" className="mt-10 grid-action text-right">
            <span className="mr-10">View as:</span>
            <Icon
              className={`
              icon-grid
              ${view === VIEW_MODE.GRID ? 'icon-grid-selected' : ''}`}
              onClick={onSwitchView(VIEW_MODE.GRID)}
              component={IconCustom.ViewModule}
            />
            <Icon
              onClick={onSwitchView(VIEW_MODE.LIST)}
              className={`
              icon-grid
              ${view === VIEW_MODE.LIST ? 'icon-grid-selected' : ''}`}
              component={IconCustom.ViewList}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SearchPartner;
