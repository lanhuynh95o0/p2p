import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { autoPlayVideo } from 'utilities/common';

const VideoBanner = ({ id, src, ...rest }) => {
  useEffect(() => {
    autoPlayVideo(id);
  }, [src]);

  return (
    <video
      id={id}
      width="100%"
      // height="100%"
      autoPlay
      loop
      src={src}
      {...rest}
    />
  );
};

VideoBanner.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
};

VideoBanner.defaultProps = {
  id: 'vid',
  src: '',
};

export default VideoBanner;
