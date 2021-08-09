export const geocodeAddress = (address, cbSuccess) => {
  const google = window.google;
  if (!google) {
    return;
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    cbSuccess(status === 'OK', results);
  });
};

export const geocodeLatLng = (latLng, cbSuccess) => {
  const google = window.google;
  if (!google) {
    return;
  }
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === 'OK') {
      cbSuccess(results);
    }
  });
};

export const getDetailFromAddressComponent = (addressComponent, position) => {
  let street = '',
    route = '',
    country = '',
    city = '',
    postalCode = '';

  (addressComponent || []).forEach((component) => {
    if (component.types.find((type) => type === 'street_number')) {
      street = component.long_name;
    }

    if (component.types.find((type) => type === 'route')) {
      route = component.long_name;
    }

    if (component.types.find((type) => type === 'country')) {
      country = component.short_name;
    }

    if (component.types.find((type) => type === 'locality')) {
      city = component.short_name;
    }

    if (component.types.find((type) => type === 'postal_code')) {
      postalCode = component.short_name;
    }
  });
  return { street, route, country, city, position, postalCode };
};
