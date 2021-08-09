import React, { useCallback, useEffect, useState } from 'react';
import DefaultAvatar from 'assets/images/logo/default.png';

const Image = ({ defaultSrc, ...props }) => {
  const [src, setSrc] = useState(props.src);
  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  const _onError = useCallback(() => {
    setSrc(defaultSrc || DefaultAvatar);
  }, []);

  return (
    <img
      {...props}
      src={src || defaultSrc || DefaultAvatar}
      onError={props.onError || _onError}
    />
  );
};
export default Image;
