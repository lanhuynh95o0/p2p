import React, { useState } from 'react';
import { Button } from 'antd';
import Spin from '../Spin';
import './styles.scss';

const MyButton = ({ children, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (rest.onClick) {
      setIsLoading(true);
      await rest.onClick();
      setIsLoading(false);
    }
  };

  return (
    <Button className="site-button" {...rest} onClick={onClick}>
      {isLoading ? <Spin /> : children}
    </Button>
  );
};

MyButton.propTypes = {};

export default MyButton;
