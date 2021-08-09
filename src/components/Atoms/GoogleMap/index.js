import React, { useEffect, useState } from 'react';
import { debounced } from 'utilities/common';
import {
  geocodeAddress,
  geocodeLatLng,
  getDetailFromAddressComponent,
} from 'utilities/google-map';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';

import './styles.scss';
import { INFO_WINDOW_MAX_WIDTH } from 'constants/google';

const MyGoogleMap = ({
  infoWindowRef,
  locations,
  address,
  onCenterChange,
  mapId,
  position,
  setPosition,
  defaultMarkerSrc,
  onMapClick,
  onInfoWindowShow,
  shouldRerenderIw,
  centerPinVisible = true,
  shouldSearch = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [lastMarkers, setLastMarkers] = useState([]);
  const [lock, setLock] = useState(false);

  const google = window.google;
  let resultsMap = null;

  const _showCenterPin = () => {
    setLock(false);
    const dynamicMarkerStyle = document.getElementById('dynamic-marker-style');
    if (!dynamicMarkerStyle) return;
    dynamicMarkerStyle.innerHTML = '';
  };

  const _hideCenterPin = () => {
    setLock(true);
    let dynamicMarkerStyle = document.getElementById('dynamic-marker-style');
    if (!dynamicMarkerStyle) {
      dynamicMarkerStyle = document.createElement("style");
      dynamicMarkerStyle.id = 'dynamic-marker-style';
      document.head.appendChild(dynamicMarkerStyle);
    }
    dynamicMarkerStyle.innerHTML = ".map-wrapper .map-cls:after { background:unset }";
  };

  useEffect(() => {
    if (!map) return;
    map.setOptions({ draggable: !lock, zoomControl: !lock, scrollwheel: !lock, disableDoubleClickZoom: lock });
  }, [map, lock]);

  useEffect(() => {
    if (!navigator.geolocation || position) {
      return;
    }

    setLoading(true);

    // Init map with current position
    navigator.geolocation.getCurrentPosition((cposition) => {
      const p = {
        lat: cposition.coords.latitude,
        lng: cposition.coords.longitude,
      };

      setLoading(false);

      makeMap(p);
      handleGetDetailAddress(p);
    });
  }, []);

  useEffect(() => {
    debounced(() => {
      if (!address) {
        return;
      }

      if (!shouldSearch) {
        makeMap();
        return;
      }

      setLoading(true);

      geocodeAddress(address, (isSuccess, results) => {
        setLoading(false);

        if (isSuccess) {
          const location = results[0].geometry.location;

          const p = { lat: location.lat(), lng: location.lng() };

          setPosition(p);

          makeMap(p);
        }
      });
    }, 500);
  }, [address]);

  useEffect(() => {
    if (!locations || !map) return;
    lastMarkers.forEach(marker => marker.setMap(null));
    const newMarkers = [];
    const infoWindow = new google.maps.InfoWindow({
      maxWidth: INFO_WINDOW_MAX_WIDTH,
    });
    if (infoWindowRef) infoWindowRef.current = infoWindow;
    let showingLocation;
    google.maps.event.addListener(infoWindow, 'domready', function () {
      if (showingLocation) {
        const tempLocation = showingLocation;
        showingLocation = null;
        if (onInfoWindowShow) onInfoWindowShow(tempLocation);
      }
    });
    // google.maps.event.addListener(infoWindow, 'closeclick', _showCenterPin);

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      const addMarker = (iconUrl) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lon),
          map: map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(location.width, location.height)
          }
        });
        newMarkers.push(marker);

        if (location.infoContent) {
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              // _hideCenterPin();
              showingLocation = location;
              if (shouldRerenderIw && !shouldRerenderIw(location)) {
                return;
              }
              const infoContainer = document.createElement('div');
              ReactDOM.render(location.infoContent, infoContainer);
              infoWindow.setContent(infoContainer.innerHTML);
              infoWindow.open(map, marker);
            }
          })(marker, i));
        }
      };
      const tempImg = document.createElement('img');
      tempImg.src = location.iconUrl;
      tempImg.onload = () => {
        addMarker(location.iconUrl);
      };
      tempImg.onerror = () => {
        addMarker(defaultMarkerSrc);
      };
    }

    setLastMarkers(newMarkers);
    // _showCenterPin();
  }, [locations, map]);

  const makeMap = (initP) => {
    const mapEl = document.getElementById(mapId);

    if (!google || !mapEl) {
      return;
    }

    if (!position && !initP) {
      return;
    }

    // Init Map
    resultsMap = new google.maps.Map(mapEl, {
      zoom: (initP && 15) || 12,
      center: initP || position,
      fullscreenControl: false,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180
        },
        strictBounds: true,
      },
    });

    resultsMap.addListener('click', onMapClick);

    // Init maker
    // new google.maps.Marker({
    //   position,
    //   map: resultsMap,
    //   title: '',
    // });

    if (onCenterChange) {
      const handleCenterChanged = () => {
        const p = resultsMap.getCenter();
        if (!p) return;
        const pos = {
          lat: p.lat(),
          lng: p.lng(),
        };
        handleGetDetailAddress(pos);

        try {
          const bounds = resultsMap.getBounds();
          if (bounds) {
            lastMarkers.forEach(marker => {
              if (bounds.contains(marker.getPosition())) {
                marker.show();
              }
            });
          }
        } catch (e) {
        }
      };
      resultsMap.addListener('center_changed', () => {
        debounced(handleCenterChanged, 500);
      });
      handleCenterChanged();
      setMap(resultsMap);
      if (centerPinVisible) {
        const pin = document.createElement('div');
        pin.className = 'map-cls__center-pin';
        mapEl.appendChild(pin);
      }
    }
  };

  const handleGetDetailAddress = (pos) => {
    geocodeLatLng(pos, (results) => {
      const detailAddress = getDetailFromAddressComponent(
        results[0].address_components,
        pos
      );

      let address = results[0].formatted_address.split(',');
      address.pop();
      address = address.join(',');

      if (detailAddress.postalCode) {
        address = address.replace(detailAddress.postalCode, '');
      }

      onCenterChange({ ...detailAddress, address }, () => {
        setPosition(pos);
      });
    });
  };

  useEffect(() => {
    makeMap();
  }, [google]);

  return (
    <div className="map-wrapper">
      <div
        className="map-cls"
        id={mapId}
      ></div>

      {loading && (
        <div className="map-overlay">
          <Spin />
        </div>
      )}
    </div>
  );
};

MyGoogleMap.propTypes = {
  mapId: PropTypes.string,
};
MyGoogleMap.defaultProps = {
  mapId: 'map-id',
};
export default React.memo(MyGoogleMap);
