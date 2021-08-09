import React, { useState, useCallback, useEffect } from 'react';

import { Row, Col, Popover, Tooltip, Form } from 'antd';
import { MyButton, MyGoogleMap, MyInput, MySelect } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';
import MarkerImage from 'assets/images/map/marker.png';

const radius = [
  {
    id: 5,
    name: '5 km',
  },
  {
    id: 10,
    name: '10 km',
  },
  {
    id: 15,
    name: '15 km',
  },
];

const SearchByLocation = ({ locations,
  infoWindowRef,
  handleSearch,
  onMapClick,
  onInfoWindowShow,
  shouldRerenderIw,
  defaultMarkerSrc,
  lastSearchPosition }) => {
  const [radiusSelected, setRadius] = useState(5);
  const [position, setPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [data, setData] = useState(null);
  const [shouldSearch, setShouldSearch] = useState(false);

  const _onChangeRadius = useCallback((value) => setRadius(value), []);

  if (locations && lastSearchPosition && lastSearchPosition.lat && lastSearchPosition.lng) {
    locations.push({
      isSearchPosition: true,
      width: 27, height: 43,
      lat: lastSearchPosition.lat,
      lon: lastSearchPosition.lng,
      infoContent: null,
      iconUrl: MarkerImage
    });
  }

  const _handleClickSearch = () => {
    handleSearch({
      longitude: position.lng,
      latitude: position.lat,
      radiusKilometer: radiusSelected,
      address: data?.address || '',
    });
  };

  const handleChangeCenter = useCallback((data, cb) => {
    setData(data);
    setSearchAddress(data.address);
    cb();
  }, []);

  const _setAddress = debounce((ad) => {
    setShouldSearch(true);
    setSearchAddress(ad);
  }, 500);

  const _onChangeAddress = (e) => {
    _setAddress(e.target.value);
  };

  const content = (
    <Col>
      <Row style={{ width: '50vw' }}>
        <MyGoogleMap
          infoWindowRef={infoWindowRef}
          onMapClick={onMapClick}
          onInfoWindowShow={onInfoWindowShow}
          shouldRerenderIw={shouldRerenderIw}
          centerPinVisible={false}
          defaultMarkerSrc={defaultMarkerSrc}
          shouldSearch={shouldSearch}
          address={searchAddress}
          onCenterChange={handleChangeCenter}
          position={position}
          locations={locations}
          setPosition={(p) => {
            setShouldSearch(false);
            setPosition(p);
            setSearchAddress('');
          }}
        />
      </Row>
    </Col>
  );

  const title = useMemo(() => {
    return (
      <Row align="middle">
        <Col span={4}>
          Search by location
        </Col>
        <Col span={10}>
          <MyInput
            placeholder="Enter number of unit, street"
            type="text"
            onChange={_onChangeAddress}
          />
        </Col>
        <Col span={10} flex="auto">
          <Row justify="end" gutter={[16]} align="middle">
            <Col>Radius:</Col>
            <Col>
              <MySelect
                value={radiusSelected}
                className="select-custom-white w-100p"
                options={radius}
                onChange={_onChangeRadius}
                allowClear={false}
              />
            </Col>
            <Col>
              <MyButton
                className="btn-primary-custom"
                onClick={_handleClickSearch}
                disabled={!position}
              >
                Search
              </MyButton>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }, [radiusSelected, position]);

  return (
    <Popover content={content} title={title} trigger="click">
      <MyButton
        id="search-by-location"
        className="my-btn-no-style my-popover-item"
      >
        <Tooltip title="Search contractors by location ">
          <Icon component={IconCustom.Location} className="my-icon-md" />
        </Tooltip>
      </MyButton>
    </Popover>
  );
};

export default SearchByLocation;
