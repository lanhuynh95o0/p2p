import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Row, Col, Tag } from 'antd';
import { MultiSelect, MySelect, PartnerMarkerInfo, SearchByLocation } from 'components/Atoms';
import DefaultContractorLogo from 'assets/images/profile/defaultContractorLogo.png';

import { SORT_BY_RATING } from 'constants/common';

const SearchHeaderContract = ({ _updateQuery, query, categories, skills, partners }) => {
  const [locations, setLocations] = useState([]);
  const lastShowPartner = useRef();
  const infoWindowRef = useRef();

  let lastSearchPosition;
  if (query) {
    const { latitude, longitude } = query;
    lastSearchPosition = {
      lat: latitude,
      lng: longitude
    };
  }

  const handleSearchByLocation = (query) => {
    _updateQuery({
      ...query
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

  const onPartnerMarkerClick = useCallback((partner) => () => {
    const { protocol, host } = window.location;
    window.open(`${protocol}//${partner.subDomain}.${process.env.REACT_APP_HOST_NAME}`, '_blank');
  }, []);

  const resultText = useMemo(() => {
    if (!query.longitude) {
      return null;
    }

    return (
      <div className="my-20">
        {`Results are limited to ${query.radiusKilometer} km around `}
        {query.longitude && (
          <Tag
            closable
            onClose={(e) => {
              _updateQuery({
                longitude: null,
                latitude: null,
                radiusKilometer: null,
                address: '',
              });
            }}
            color="geekblue"
            className="ml-8"
          >
            {query.address || 'location'}
          </Tag>
        )}
      </div>
    );
  }, [query.longitude, query.radiusKilometer]);

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
    <Row justify="space-between" gutter={[10, 10]}>
      <Col xs={12} sm={8}>
        <MultiSelect
          options={categories}
          placeholder="Industries"
          onChange={(value) => {
            _updateQuery({ industryId: value });
          }}
          labelKey="name"
          valueKey="id"
          value={query.industryId}
          showSearch
          className="select-custom-gray"
        />
      </Col>
      <Col xs={12} sm={8}>
        <MultiSelect
          className="select-custom-gray"
          showSearch
          value={query.skillId}
          placeholder="All skill"
          options={skills}
          onChange={(value) => _updateQuery({ skillId: value })}
          labelKey="name"
          valueKey="id"
        />
      </Col>
      <Col xs={16} sm={4}>
        <MySelect
          className="select-custom-gray"
          placeholder="Rating"
          value={query.fromRate}
          onChange={(value) => {
            _updateQuery({ fromRating: value });
          }}
          labelKey="label"
          valueKey="id"
          allowClear={false}
          options={SORT_BY_RATING}
          renderItem={(it) => renderRatingOptions(it)}
        />
      </Col>
      <Col xs={8} sm={2}>
        <Row justify="end">
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
        </Row>
      </Col>
      <Col span={24}>
        {resultText}
      </Col>
    </Row>
  );
};

export default SearchHeaderContract;
